"""
Flask Backend Server for AI Medical Coding Assistant
Integrates ML model predictions with medical records
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import json

# Add model directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'model'))

from predict import MedicalCodingPredictor

app = Flask(__name__)

# Enable CORS with proper configuration for all origins and methods
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize predictor globally
predictor = None

@app.before_request
def initialize_predictor():
    """Initialize predictor on first request"""
    global predictor
    if predictor is None:
        try:
            model_dir = os.path.join(os.path.dirname(__file__), 'model')
            predictor = MedicalCodingPredictor(model_dir)
            print("[OK] ML Model loaded successfully")
        except Exception as e:
            print(f"[ERROR] Error loading model: {str(e)}")
            return jsonify({'error': f'Failed to load model: {str(e)}'}), 500

@app.route('/predict', methods=['POST'])
def predict_icd_codes():
    """
    Predict ICD-10 codes from medical record data
    
    Expected JSON format:
    {
        "diagnosis": "Hypertension",
        "symptoms": ["High blood pressure", "Headaches"],
        "medications": ["Lisinopril 10mg"],
        "notes": "Patient shows signs of stage 2 hypertension...",
        "patient_age": 45,
        "patient_gender": "Male",
        "vitals": {
            "temperature": 36.5,
            "pulse_rate": 75,
            "respiratory_rate": 16,
            "blood_pressure": "120/80",
            "oxygen_saturation": 98
        }
    }
    """
    try:
        data = request.get_json()
        
        # Prepare clinical text from medical record
        cc = data.get('diagnosis', '')
        pre_diagnosis = data.get('notes', '')
        treatment_plan = ' '.join(data.get('medications', []))
        
        # Combine symptoms
        symptoms_text = ' '.join(data.get('symptoms', []))
        pi = symptoms_text
        
        # Extract demographics
        age = float(data.get('patient_age', 0))
        sex = data.get('patient_gender', '')
        
        # Extract vitals
        vitals = data.get('vitals', {})
        bt = float(vitals.get('temperature', 0))
        pr = float(vitals.get('pulse_rate', 0))
        rr = float(vitals.get('respiratory_rate', 0))
        bp = vitals.get('blood_pressure', '')
        o2 = float(vitals.get('oxygen_saturation', 0))
        
        # Get top_k parameter (default 5)
        top_k = int(data.get('top_k', 5))
        
        print(f"\nPredicting ICD codes for patient (age {age}, {sex})")
        print(f"Chief complaint: {cc}")
        
        # Make prediction
        predictions = predictor.predict_codes(
            cc=cc,
            pi=pi,
            ph='',
            fh='',
            patient_examine='',
            pre_diagnosis=pre_diagnosis,
            reason_for_admit='',
            treatment_plan=treatment_plan,
            sex=sex,
            age=age,
            ageday=0,
            bt=bt,
            pr=pr,
            rr=rr,
            bp=bp,
            o2=o2,
            top_k=top_k
        )
        
        return jsonify(predictions), 200
        
    except Exception as e:
        print(f"[ERROR] Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': predictor is not None}), 200

@app.route('/', methods=['GET'])
def index():
    """Welcome message"""
    return jsonify({
        'message': 'AI Medical Coding Assistant - Flask Backend',
        'version': '1.0.0',
        'endpoints': {
            '/predict': 'POST - Predict ICD-10 codes',
            '/health': 'GET - Health check'
        }
    }), 200

if __name__ == '__main__':
    print("[*] Starting AI Medical Coding Assistant Flask Server")
    print("[*] Running on http://localhost:5000")
    app.run(debug=True, port=5000)
