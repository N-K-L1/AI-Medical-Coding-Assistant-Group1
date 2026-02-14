import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import NewPatientPage from './pages/NewPatient/NewPatientPage';
import MedicalRecordPage from './pages/MedicalRecord/MedicalRecordPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Dashboard component that includes the sidebar and header
function Dashboard() {
  const [currentView, setCurrentView] = useState('newPatient');

  return (
    <div className="app">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Header />
        {currentView === 'newPatient' && <NewPatientPage />}
        {currentView === 'medicalRecord' && <MedicalRecordPage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
