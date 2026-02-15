"""
Test script to verify ML model package works correctly
"""

from model.predict import MedicalCodingPredictor

print("="*70)
print("Testing AI Medical Coding Model")
print("="*70)

# Initialize predictor
print("\n1. Loading model...")
try:
    predictor = MedicalCodingPredictor(model_dir='model')
    print("   ✅ Model loaded successfully!")
except Exception as e:
    print(f"   ❌ Failed to load model: {e}")
    exit(1)

# Test prediction
print("\n2. Making test prediction...")
test_data = {
    'cc': 'ไข้สูง ไอมีเสมหะ หายใจเหนื่อย',
    'pi': 'ผู้ป่วยมีไข้สูง 39 องศา ไอมีเสมหะสีเหลือง',
    'pre_diagnosis': 'Pneumonia',
    'patient_examine': 'ตรวจปอด: มีเสียงผิดปกติ',
    'sex': 'M',
    'age': 65,
    'bt': 39.0,
    'pr': 95,
    'rr': 24,
    'bp': '130/85',
    'o2': 94,
    'top_k': 3
}

print("   Test Patient:")
print(f"   - Age: {test_data['age']}, Sex: {test_data['sex']}")
print(f"   - Vitals: BT={test_data['bt']}°C, PR={test_data['pr']}, O2={test_data['o2']}%")
print(f"   - Chief Complaint: {test_data['cc']}")

try:
    result = predictor.predict_codes(**test_data)
    
    if 'error' in result:
        print(f"   ❌ Prediction error: {result['error']}")
        exit(1)
    
    print("\n   ✅ Prediction successful!")
    print(f"\n   Predicted Code: {result['predicted_code']}")
    print(f"   Confidence: {result['confidence']:.2f}%")
    print(f"\n   Top {len(result['top_predictions'])} Predictions:")
    for i, pred in enumerate(result['top_predictions'], 1):
        marker = "👉" if pred['is_top_prediction'] else "  "
        print(f"   {marker} {i}. {pred['code']} - {pred['confidence']:.2f}%")
    
    print(f"\n   Available Codes: {', '.join(result['available_codes'])}")
    print(f"   Model Type: {result['model_type']}")
    
except Exception as e:
    print(f"   ❌ Prediction failed: {e}")
    exit(1)

print("\n" + "="*70)
print("✅ ALL TESTS PASSED - Model is ready to use!")
print("="*70)
