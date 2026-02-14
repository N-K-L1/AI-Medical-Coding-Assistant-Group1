import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import NewPatientPage from './pages/NewPatient/NewPatientPage';
import MedicalRecordPage from './pages/MedicalRecord/MedicalRecordPage';
import CoderDashboardPage from './pages/CoderDashboard/CoderDashboardPage';
import ICDReviewPage from './pages/CoderDashboard/ICDReviewPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CoderSidebar from './components/CoderSidebar';
import CoderHeader from './components/CoderHeader';

// Doctor Dashboard component that includes the sidebar and header
function DoctorDashboard() {
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

// Medical Coder Dashboard component
function CoderDashboard() {
  const [currentView, setCurrentView] = useState('medicalRecord');

  return (
    <div className="app">
      <CoderSidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <CoderHeader />
        {currentView === 'icdReview' && <ICDReviewPage />}
        {currentView === 'medicalRecord' && <CoderDashboardPage />}
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
      <Route path="/dashboard" element={<DoctorDashboard />} />
      <Route path="/coder-dashboard" element={<CoderDashboard />} />
    </Routes>
  );
}

export default App;
