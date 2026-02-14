import React, { useState } from 'react';
import MedicalRecordTable from '../MedicalRecord/components/MedicalRecordTable';
import SearchBar from '../MedicalRecord/components/SearchBar';
import './CoderDashboard.css';

function CoderDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="coder-dashboard-container">
      <div className="coder-dashboard-header">
        <h2 className="page-title">Medical record</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <MedicalRecordTable searchQuery={searchQuery} />
    </div>
  );
}

export default CoderDashboardPage;
