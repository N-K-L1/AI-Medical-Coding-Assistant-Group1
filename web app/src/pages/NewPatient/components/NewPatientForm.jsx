import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing patients from localStorage
    const existingPatients = localStorage.getItem('patients');
    const patients = existingPatients ? JSON.parse(existingPatients) : [];
    
    // Add new patient data
    patients.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    
    // Save to localStorage
    localStorage.setItem('patients', JSON.stringify(patients));
    
    console.log('Form submitted:', formData);
    alert('Patient data submitted successfully!');
    
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
  };

  return (
    <form onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewPatientForm;
