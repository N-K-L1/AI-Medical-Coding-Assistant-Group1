# AI Medical Coding Assistant - ML Model Package

## 📦 Package Contents

This package contains the trained ML model (94% accuracy) for ICD-10 diagnosis code prediction.

### Files Included:

```
ML_Model_Package/
├── model/
│   ├── tfidf_vectorizer_word.joblib    # Word n-gram vectorizer (15K features)
│   ├── tfidf_vectorizer_char.joblib    # Character n-gram vectorizer (3K features)
│   ├── scaler.joblib                   # Feature scaler for structured data
│   ├── le_pdx.joblib                   # Label encoder for diagnosis codes
│   ├── pdx_model.joblib                # Trained ensemble model (4500 trees)
│   ├── frequent_codes.joblib           # List of supported codes
│   ├── model_type.txt                  # Model version identifier
│   └── predict.py                      # Prediction module (use this!)
├── requirements.txt                    # Python dependencies
└── README.md                           # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Use in Your Backend

```python
from model.predict import MedicalCodingPredictor

# Initialize predictor
predictor = MedicalCodingPredictor(model_dir='model')

# Make prediction
result = predictor.predict_codes(
    # Clinical text (Thai)
    cc="ไข้สูง ไอมีเสมหะ",
    pi="ผู้ป่วยมีไข้สูง 39 องศา ไอมีเสมหะสีเหลือง",
    pre_diagnosis="Pneumonia",
    patient_examine="ตรวจปอด: มีเสียงผิดปกติ",
    
    # Structured data
    sex="M",
    age=65,
    bt=39.0,
    pr=95,
    rr=24,
    bp="130/85",
    o2=94,
    
    # Options
    top_k=3
)

# Access results
print(f"Predicted Code: {result['predicted_code']}")
print(f"Confidence: {result['confidence']:.2f}%")
print(f"Top Predictions: {result['top_predictions']}")
```

## 📋 Input Fields

### Clinical Text Fields (Thai) - 8 fields:
- `cc` - Chief complaint (อาการสำคัญ)
- `pi` - Present illness (ประวัติอาการป่วยปัจจุบัน)
- `ph` - Past history (ประวัติการรักษาในอดีต)
- `fh` - Family history (ประวัติครอบครัว)
- `patient_examine` - Physical examination (ตรวจร่างกาย)
- `pre_diagnosis` - Pre-diagnosis (การวินิจฉัยเบื้องต้น)
- `reason_for_admit` - Reason for admission (เหตุผลรับไว้รักษา)
- `treatment_plan` - Treatment plan (แผนการรักษา)

### Structured Fields - 8 fields:
- `sex` - Patient sex (M/F/ชาย/หญิง)
- `age` - Patient age (years)
- `ageday` - Patient age in days (optional)
- `bt` - Body temperature (°C)
- `pr` - Pulse rate (bpm)
- `rr` - Respiratory rate (breaths/min)
- `bp` - Blood pressure (systolic/diastolic, e.g., "120/80")
- `o2` - Oxygen saturation (%)

### Output Options:
- `top_k` - Number of top predictions to return (1-10, default: 3)

## 📊 Output Format

```python
{
    "success": True,
    "predicted_code": "J101",
    "confidence": 85.50,
    "top_predictions": [
        {
            "code": "J101",
            "confidence": 85.50,
            "is_top_prediction": True
        },
        {
            "code": "A099",
            "confidence": 10.25,
            "is_top_prediction": False
        }
    ],
    "available_codes": ["J101", "A099", "N10", "I509"],
    "model_type": "ultra_80"
}
```

## 🏥 Supported ICD-10 Codes

| Code | Description | Thai |
|------|-------------|------|
| J101 | Pneumonia | โรคปอดบวม |
| A099 | Gastroenteritis | โรคระบบทางเดินอาหาร |
| N10 | Kidney disease | โรคไต |
| I509 | Heart failure | หัวใจล้มเหลว |

## 📈 Model Performance

**Test Data Metrics:**
- ✅ Accuracy: **94.44%**
- ✅ Precision: **95.56%**
- ✅ Recall: **94.44%**
- ✅ F1-Score: **94.50%**
- ✅ Top-3 Accuracy: **100%**

**Model Details:**
- Type: Triple Voting Ensemble
- Components: RandomForest + ExtraTrees + RandomForest2
- Total Trees: 4,500
- Features: 18,018 (18K text + 18 structured)
- Training Date: February 15, 2026

## 🔧 FastAPI Integration Example

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from model.predict import MedicalCodingPredictor

app = FastAPI()
predictor = MedicalCodingPredictor(model_dir='model')

class PredictionRequest(BaseModel):
    cc: Optional[str] = ''
    pi: Optional[str] = ''
    pre_diagnosis: Optional[str] = ''
    patient_examine: Optional[str] = ''
    sex: Optional[str] = ''
    age: Optional[float] = 0
    bt: Optional[float] = 0
    pr: Optional[float] = 0
    rr: Optional[float] = 0
    bp: Optional[str] = ''
    o2: Optional[float] = 0
    top_k: Optional[int] = 3

@app.post("/predict")
async def predict(request: PredictionRequest):
    result = predictor.predict_codes(
        cc=request.cc,
        pi=request.pi,
        pre_diagnosis=request.pre_diagnosis,
        patient_examine=request.patient_examine,
        sex=request.sex,
        age=request.age,
        bt=request.bt,
        pr=request.pr,
        rr=request.rr,
        bp=request.bp,
        o2=request.o2,
        top_k=request.top_k
    )
    
    if 'error' in result:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return result
```

## ⚠️ Important Notes

1. **Clinical text required**: At least one clinical text field (cc, pi, etc.) must be provided
2. **Thai language**: Clinical text should be in Thai for best accuracy
3. **File paths**: Ensure `model_dir` parameter points to the folder containing .joblib files
4. **Memory**: Model files total ~50-100MB, ensure sufficient RAM
5. **Dependencies**: All packages in requirements.txt must be installed

## 📞 Support

For issues or questions, contact the AI Medical Coding Assistant team.

**Model Version:** Ultra 80% (v2.0)  
**Last Updated:** February 15, 2026
