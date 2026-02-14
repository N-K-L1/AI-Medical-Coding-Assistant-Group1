import React from 'react';

function CoderSidebar({ currentView, setCurrentView }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
            <path d="M50 20 C30 20 20 30 20 45 C20 65 50 85 50 85 C50 85 80 65 80 45 C80 30 70 20 50 20 Z" fill="white"/>
            <path d="M30 50 L40 50 L45 38 L50 62 L55 42 L60 50 L70 50" stroke="#2e6d6d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div>
            <h2>AI Medical</h2>
            <p>Coding Assistant</p>
          </div>
        </div>
      </div>
      
      <div className="sidebar-menu">
        <button 
          className={`menu-item ${currentView === 'icdReview' ? 'active' : ''}`}
          onClick={() => setCurrentView('icdReview')}
        >
          <span className="icon">🔍</span>
          AI Generated ICD-10 Codes Review
        </button>
        
        <button 
          className={`menu-item ${currentView === 'medicalRecord' ? 'active' : ''}`}
          onClick={() => setCurrentView('medicalRecord')}
        >
          <span className="icon">📋</span>
          Medical Record
        </button>
      </div>
    </div>
  );
}

export default CoderSidebar;
