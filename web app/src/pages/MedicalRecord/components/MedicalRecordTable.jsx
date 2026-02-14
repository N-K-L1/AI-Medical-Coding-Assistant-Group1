import React, { useEffect, useState } from 'react';

function MedicalRecordTable({ searchQuery }) {
  const [patients, setPatients] = useState([]);

  // Load patients from localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.patientName.toLowerCase().includes(searchLower) ||
      patient.gender.toLowerCase().includes(searchLower) ||
      patient.age.toString().includes(searchLower) ||
      patient.cc.toLowerCase().includes(searchLower) ||
      patient.pi.toLowerCase().includes(searchLower) ||
      patient.ph.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="table-container">
      <table className="medical-record-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>cc</th>
            <th>pi</th>
            <th>ph</th>
            <th>fh</th>
            <th>Patient examine</th>
            <th>bt</th>
            <th>pr</th>
            <th>rr</th>
            <th>bp</th>
            <th>o2</th>
            <th>Pre diagnosis</th>
            <th>Reason for admit</th>
            <th>Treatment plan</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan="16" className="no-data">
                {searchQuery ? 'No patients found matching your search.' : 'No patient records yet. Submit a new patient to see data here.'}
              </td>
            </tr>
          ) : (
            filteredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.patientName}</td>
                <td>{patient.gender === 'male' ? 'M' : patient.gender === 'female' ? 'F' : patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.cc}</td>
                <td>{patient.pi}</td>
                <td>{patient.ph}</td>
                <td>{patient.fh}</td>
                <td>{patient.examination}</td>
                <td>{patient.bt}</td>
                <td>{patient.pr}</td>
                <td>{patient.rr}</td>
                <td>{patient.bp}</td>
                <td>{patient.o2}</td>
                <td>{patient.preDiagnosis}</td>
                <td>{patient.reasonForAdmit}</td>
                <td>{patient.treatmentPlan}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalRecordTable;
