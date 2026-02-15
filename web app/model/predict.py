"""
AI Medical Coding Assistant - Prediction Module (Updated for Ultra 80% Model)
Load trained models and predict ICD codes from clinical text and structured features
"""

import joblib
import numpy as np
import pandas as pd
import os
import scipy.sparse
from typing import Dict, List, Optional


class MedicalCodingPredictor:
    """
    Load trained models and predict medical codes from clinical text and structured features
    """
    
    def __init__(self, model_dir='model'):
        """Load all trained models and artifacts"""
        self.model_dir = model_dir
        
        print(f"Loading models from {model_dir}/...")
        
        # Check model type
        model_type_file = os.path.join(model_dir, 'model_type.txt')
        if os.path.exists(model_type_file):
            with open(model_type_file, 'r') as f:
                self.model_type = f.read().strip()
            print(f"Model type: {self.model_type}")
        else:
            self.model_type = "unknown"
        
        # Load text vectorizers
        self.vec_word = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer_word.joblib'))
        self.vec_char = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer_char.joblib'))
        
        # Load structured feature scaler
        self.scaler = joblib.load(os.path.join(model_dir, 'scaler.joblib'))
        
        # Load label encoder
        self.le_pdx = joblib.load(os.path.join(model_dir, 'le_pdx.joblib'))
        
        # Load model
        self.pdx_model = joblib.load(os.path.join(model_dir, 'pdx_model.joblib'))
        
        # Load frequent codes
        self.frequent_codes = joblib.load(os.path.join(model_dir, 'frequent_codes.joblib'))
        
        print(f"✓ Models loaded successfully")
        print(f"✓ Predicting {len(self.frequent_codes)} diagnosis codes: {', '.join(self.frequent_codes)}")
    
    def _create_clinical_notes(self, cc='', pi='', ph='', fh='', patient_examine='', 
                               pre_diagnosis='', reason_for_admit='', treatment_plan=''):
        """Create clinical notes matching training preprocessing"""
        parts = []
        
        # Text columns in same order as training
        text_data = {
            'cc': cc,
            'pi': pi,
            'ph': ph,
            'fh': fh,
            'patient_examine': patient_examine,
            'pre_diagnosis': pre_diagnosis,
            'reason_for_admit': reason_for_admit,
            'treatment_plan': treatment_plan
        }
        
        for col, text in text_data.items():
            if text and str(text).strip():
                text_clean = str(text).strip()
                # Double important fields (matching training)
                if col in ['cc', 'pre_diagnosis']:
                    parts.append(text_clean + ' ' + text_clean)
                else:
                    parts.append(text_clean)
        
        return ' '.join(parts) if parts else ''
    
    def _create_structured_features(self, sex='', age=0, ageday=0, bt=0, pr=0, rr=0, bp='', o2=0):
        """Create structured features matching training preprocessing"""
        feat = []
        
        # Sex encoding
        sex_map = {'ชาย': 1, 'หญิง': 0, 'M': 1, 'F': 0, 'male': 1, 'female': 0, 
                   1: 1, 0: 0, '1': 1, '0': 0, 'ชาย': 1, 'หญิง': 0}
        sex_val = sex_map.get(sex, sex_map.get(str(sex).lower(), 0))
        feat.append([sex_val])
        
        # Age
        age_val = float(age) if age else 0
        feat.append([age_val])
        feat.append([float(ageday) if ageday else 0])
        
        # Age squared
        feat.append([age_val ** 2])
        
        # Age categories
        if age_val <= 18:
            age_cat = 0
        elif age_val <= 45:
            age_cat = 1
        elif age_val <= 65:
            age_cat = 2
        else:
            age_cat = 3
        feat.append([age_cat])
        
        # Vitals (with default median values)
        bt_val = float(bt) if bt else 36.5
        pr_val = float(pr) if pr else 80.0
        rr_val = float(rr) if rr else 20.0
        o2_val = float(o2) if o2 else 98.0
        
        feat.extend([[bt_val], [pr_val], [rr_val], [o2_val]])
        
        # Abnormal flags
        feat.append([1 if bt_val > 38 else 0])
        feat.append([1 if pr_val > 100 else 0])
        feat.append([1 if rr_val > 20 else 0])
        feat.append([1 if o2_val < 95 else 0])
        
        # BP parsing
        if bp and '/' in str(bp):
            try:
                parts = str(bp).split('/')
                bp_sys = float(parts[0])
                bp_dia = float(parts[1])
            except:
                bp_sys, bp_dia = 120.0, 80.0
        else:
            bp_sys, bp_dia = 120.0, 80.0
        
        feat.append([bp_sys])
        feat.append([bp_dia])
        feat.append([1 if bp_sys > 140 else 0])
        feat.append([1 if bp_dia > 90 else 0])
        
        # Interaction term
        feat.append([1 if (bt_val > 38 and pr_val > 100) else 0])
        
        return np.hstack(feat)
    
    def predict_codes(self, 
                     # Clinical text fields
                     cc: str = '',
                     pi: str = '',
                     ph: str = '',
                     fh: str = '',
                     patient_examine: str = '',
                     pre_diagnosis: str = '',
                     reason_for_admit: str = '',
                     treatment_plan: str = '',
                     # Structured fields
                     sex: str = '',
                     age: float = 0,
                     ageday: float = 0,
                     bt: float = 0,
                     pr: float = 0,
                     rr: float = 0,
                     bp: str = '',
                     o2: float = 0,
                     # Output options
                     top_k: int = 3) -> Dict:
        """
        Predict medical codes from clinical text and structured features
        
        Args:
            cc: Chief complaint (Thai text)
            pi: Present illness (Thai text)
            ph: Past history (Thai text)
            fh: Family history (Thai text)
            patient_examine: Physical examination findings (Thai text)
            pre_diagnosis: Pre-diagnosis (Thai text)
            reason_for_admit: Reason for admission (Thai text)
            treatment_plan: Treatment plan (Thai text)
            sex: Patient sex
            age: Patient age
            ageday: Patient age in days
            bt: Body temperature (°C)
            pr: Pulse rate (bpm)
            rr: Respiratory rate (breaths/min)
            bp: Blood pressure (systolic/diastolic)
            o2: Oxygen saturation (%)
            top_k: Number of top predictions to return
            
        Returns:
            Dictionary with predictions and confidence scores
        """
        
        try:
            # Create clinical notes
            notes = self._create_clinical_notes(cc, pi, ph, fh, patient_examine, 
                                               pre_diagnosis, reason_for_admit, treatment_plan)
            
            if not notes.strip():
                return {
                    'error': 'No clinical text provided. Please provide at least one clinical field (cc, pi, ph, fh, patient_examine, pre_diagnosis, reason_for_admit, or treatment_plan).'
                }
            
            # Vectorize text
            X_word = self.vec_word.transform([notes])
            X_char = self.vec_char.transform([notes])
            X_text = scipy.sparse.hstack([X_word, X_char])
            
            # Create structured features
            X_struct = self._create_structured_features(sex, age, ageday, bt, pr, rr, bp, o2)
            X_struct = self.scaler.transform(X_struct.reshape(1, -1))
            
            # Combine features
            X_struct_sparse = scipy.sparse.csr_matrix(X_struct)
            X = scipy.sparse.hstack([X_text, X_struct_sparse])
            
            # Make prediction
            y_pred_proba = self.pdx_model.predict_proba(X)[0]
            y_pred = self.pdx_model.predict(X)[0]
            
            # Get top K predictions
            top_indices = np.argsort(y_pred_proba)[-top_k:][::-1]
            
            predictions = []
            for idx in top_indices:
                code = self.le_pdx.classes_[idx]
                confidence = y_pred_proba[idx] * 100
                predictions.append({
                    'code': code,
                    'confidence': round(confidence, 2),
                    'is_top_prediction': (idx == y_pred)
                })
            
            # Get predicted code
            predicted_code = self.le_pdx.inverse_transform([y_pred])[0]
            predicted_confidence = y_pred_proba[y_pred] * 100
            
            return {
                'success': True,
                'predicted_code': predicted_code,
                'confidence': round(predicted_confidence, 2),
                'top_predictions': predictions,
                'available_codes': list(self.frequent_codes),
                'model_type': self.model_type
            }
            
        except Exception as e:
            return {
                'error': f'Prediction failed: {str(e)}'
            }


# Standalone prediction function
def predict_from_dict(data: Dict, model_dir: str = 'model') -> Dict:
    """
    Convenience function to predict from a dictionary of patient data
    
    Args:
        data: Dictionary with patient information
        model_dir: Directory containing model files
        
    Returns:
        Prediction results dictionary
    """
    predictor = MedicalCodingPredictor(model_dir=model_dir)
    return predictor.predict_codes(**data)


if __name__ == "__main__":
    # Test prediction
    print("="*70)
    print("Testing Medical Coding Predictor")
    print("="*70)
    
    # Initialize predictor
    predictor = MedicalCodingPredictor(model_dir='model')
    
    # Example patient data (Thai text)
    test_data = {
        'cc': 'ไข้สูง ไอมีเสมหะ หายใจเหนื่อย',
        'pi': 'ผู้ป่วยมีไข้สูง 39 องศา ไอมีเสมหะสีเหลือง หายใจเหนื่อย เป็นมา 3 วัน',
        'pre_diagnosis': 'Pneumonia',
        'patient_examine': 'ตรวจร่างกาย: ปอดมีเสียงผิดปกติ',
        'sex': 'M',
        'age': 65,
        'bt': 39.0,
        'pr': 95,
        'rr': 24,
        'bp': '130/85',
        'o2': 94
    }
    
    print("\nTest patient data:")
    for key, val in test_data.items():
        print(f"  {key}: {val}")
    
    print("\nMaking prediction...")
    result = predictor.predict_codes(**test_data, top_k=3)
    
    if 'error' in result:
        print(f"\n❌ Error: {result['error']}")
    else:
        print(f"\n✓ Prediction successful!")
        print(f"\nPredicted Code: {result['predicted_code']}")
        print(f"Confidence: {result['confidence']:.2f}%")
        print(f"\nTop {len(result['top_predictions'])} Predictions:")
        for i, pred in enumerate(result['top_predictions'], 1):
            marker = '👉' if pred['is_top_prediction'] else '  '
            print(f"{marker} {i}. {pred['code']} - {pred['confidence']:.2f}%")
        print(f"\nAvailable codes: {', '.join(result['available_codes'])}")
        print(f"Model: {result['model_type']}")
    
    print("\n" + "="*70)
