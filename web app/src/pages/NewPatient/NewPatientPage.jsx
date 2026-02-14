import React from 'react';
import NewPatientForm from './components/NewPatientForm';
import './NewPatient.css';

function NewPatientPage() {
  return (
    <div className="patient-form-container">
      <h2 className="form-title">Submit New Patient</h2>
      <NewPatientForm />
    </div>
  );
}

export default NewPatientPage;
