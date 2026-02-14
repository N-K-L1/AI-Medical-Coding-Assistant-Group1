import React, { useState } from 'react';
import MedicalRecordTable from './components/MedicalRecordTable';
import SearchBar from './components/SearchBar';
import './MedicalRecord.css';

function MedicalRecordPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="medical-record-container">
      <div className="medical-record-header">
        <h2 className="page-title">Medical record</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <MedicalRecordTable searchQuery={searchQuery} />
    </div>
  );
}

export default MedicalRecordPage;
