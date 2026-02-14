import React from 'react';
import { useNavigate } from 'react-router-dom';

function CoderHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const userEmail = localStorage.getItem('userEmail') || 'coder@gmail.com';

  return (
    <div className="header">
      <div className="welcome-section">
        <h1>Welcome back, Mike</h1>
        <p className="subtitle">Medical Coder Dashboard</p>
      </div>
      
      <div className="header-right">
        <div className="user-email">
          <span className="icon">👤</span>
          {userEmail}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
          <span className="icon">→</span>
        </button>
      </div>
    </div>
  );
}

export default CoderHeader;
