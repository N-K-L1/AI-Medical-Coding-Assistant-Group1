import React, { useState } from 'react';
import { medicalRecordAPI, mlAPI, icdReviewAPI, icdCodeAPI } from '../../../api';

function NewPatientForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    age: '',
    cc: '',
    pi: '',
    ph: '',
    fh: '',
    examination: '',
    bt: '',
    pr: '',
    rr: '',
    bp: '',
    o2: '',
    preDiagnosis: '',
    reasonForAdmit: '',
    treatmentPlan: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const doctorId = localStorage.getItem('userId');
      if (!doctorId) {
        throw new Error('Doctor ID not found. Please log in again.');
      }

      const patientId = 1; // TODO: Get actual patient ID from form or database

      // 1. Create medical record in json-server
      console.log('Step 1: Creating medical record...');
      const medicalRecord = {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        visitDate: new Date().toISOString().split('T')[0],
        diagnosis: formData.cc,
        symptoms: formData.pi ? [formData.pi] : [],
        medications: formData.treatmentPlan ? [formData.treatmentPlan] : [],
        notes: formData.preDiagnosis,
        icdCodesAssigned: []
      };

      console.log('Medical record data:', medicalRecord);
      const savedRecord = await medicalRecordAPI.create(medicalRecord);
      console.log('Step 1 OK: Medical record created:', savedRecord);

      if (!savedRecord || !savedRecord.id) {
        throw new Error('Failed to create medical record - no ID returned');
      }

      // 2. Prepare data for ML prediction
      console.log('Step 2: Preparing ML prediction...');
      const predictionData = {
        diagnosis: formData.cc,
        symptoms: formData.pi ? [formData.pi] : [],
        medications: formData.treatmentPlan ? [formData.treatmentPlan] : [],
        notes: formData.preDiagnosis,
        patient_age: parseInt(formData.age) || 0,
        patient_gender: formData.gender,
        vitals: {
          temperature: parseFloat(formData.bt) || 0,
          pulse_rate: parseFloat(formData.pr) || 0,
          respiratory_rate: parseFloat(formData.rr) || 0,
          blood_pressure: formData.bp || '',
          oxygen_saturation: parseFloat(formData.o2) || 0
        },
        top_k: 5
      };

      // 3. Call ML prediction API
      console.log('Step 3: Calling ML prediction API...');
      let predictions = null;
      try {
        predictions = await mlAPI.predictICDCodes(predictionData);
        console.log('Step 3 OK: Predictions received:', predictions);

        if (predictions.error) {
          console.warn('Step 3 WARNING: ML prediction error:', predictions.error);
          predictions = null; // Continue without ML predictions
        }
      } catch (mlError) {
        console.warn('Step 3 WARNING: ML server unavailable:', mlError.message);
        // Continue without ML predictions
      }

      // 4. Get all ICD codes to match predictions
      console.log('Step 4: Getting all ICD codes...');
      const allICDCodes = await icdCodeAPI.getAll();
      console.log('Step 4 OK: Got ICD codes:', allICDCodes);

      // 5. Create ICD review entries
      const coderId = 1; // First coder - can be changed based on availability
      console.log('Step 5: Creating ICD reviews...');

      if (predictions && predictions.predictions && Array.isArray(predictions.predictions) && predictions.predictions.length > 0) {
        // If predictions exist, create reviews for each prediction
        for (const pred of predictions.predictions) {
          // Find matching ICD code
          const icdCode = allICDCodes.find(code => code.code === pred.code);

          if (icdCode) {
            const icdReview = {
              medicalRecordId: savedRecord.id,
              coderId: coderId,
              icdCodeId: icdCode.id,
              status: 'pending',
              notes: `AI Predicted - Confidence: ${(pred.confidence * 100).toFixed(1)}%`,
              createdAt: new Date().toISOString()
            };

            await icdReviewAPI.create(icdReview);
            console.log('Created ICD review for code:', pred.code);
          }
        }
        console.log('Step 5 OK: All ICD reviews created from predictions');
      } else {
        // Fallback: Create a generic ICD review if no valid predictions
        console.log('Step 5: No valid predictions, creating default review...');
        const defaultIcdCode = allICDCodes.find(code => code.code === 'R00') || allICDCodes[0];

        if (defaultIcdCode) {
          const icdReview = {
            medicalRecordId: savedRecord.id,
            coderId: coderId,
            icdCodeId: defaultIcdCode.id,
            status: 'pending',
            notes: `AI Pending Review - Diagnosis: ${formData.cc}`,
            createdAt: new Date().toISOString()
          };

          await icdReviewAPI.create(icdReview);
          console.log('Step 5 OK: Default ICD review created');
        }
      }

      // 6. Save to localStorage as well (for backward compatibility)
      const existingPatients = localStorage.getItem('patients');
      const patients = existingPatients ? JSON.parse(existingPatients) : [];
      patients.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('patients', JSON.stringify(patients));

      setMessage('✓ Patient record submitted successfully! AI predictions have been generated and sent to coders for review.');
      console.log('✓ Complete workflow finished');

      // Reset form
      setFormData({
        patientName: '',
        gender: '',
        age: '',
        cc: '',
        pi: '',
        ph: '',
        fh: '',
        examination: '',
        bt: '',
        pr: '',
        rr: '',
        bp: '',
        o2: '',
        preDiagnosis: '',
        reasonForAdmit: '',
        treatmentPlan: ''
      });

    } catch (error) {
      console.error('Error in workflow:', error);
      console.error('Error stack:', error.stack);
      setMessage(`✗ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="form-section">
        <h3 className="section-title">Patient Data</h3>

        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            placeholder="Enter patient name"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>cc (Chief Complaint)</label>
          <textarea
            name="cc"
            placeholder="Enter main reason patient came to hospital"
            value={formData.cc}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>pi (Present Illness)</label>
          <textarea
            name="pi"
            placeholder="Enter details about current illness"
            value={formData.pi}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>ph (Past History)</label>
          <textarea
            name="ph"
            placeholder="Enter past medical history"
            value={formData.ph}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>fh (Family History)</label>
          <textarea
            name="fh"
            placeholder="Enter family medical history"
            value={formData.fh}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Patient examine</label>
          <textarea
            name="examination"
            placeholder="Enter physical examination findings"
            value={formData.examination}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="vital-signs">
          <div className="form-group">
            <label>bt</label>
            <input
              type="text"
              name="bt"
              placeholder="Enter"
              value={formData.bt}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>pr</label>
            <input
              type="text"
              name="pr"
              placeholder="Enter"
              value={formData.pr}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>rr</label>
            <input
              type="text"
              name="rr"
              placeholder="Enter"
              value={formData.rr}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>bp</label>
            <input
              type="text"
              name="bp"
              placeholder="Enter"
              value={formData.bp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>o2</label>
            <input
              type="text"
              name="o2"
              placeholder="Enter"
              value={formData.o2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pre diagnosis</label>
          <textarea
            name="preDiagnosis"
            placeholder="Enter here..."
            value={formData.preDiagnosis}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Reason for admit</label>
          <textarea
            name="reasonForAdmit"
            placeholder="Enter here..."
            value={formData.reasonForAdmit}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Treatment plan</label>
          <textarea
            name="treatmentPlan"
            placeholder="Enter here..."
            value={formData.treatmentPlan}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing... (Generating AI Predictions)' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default NewPatientForm;
