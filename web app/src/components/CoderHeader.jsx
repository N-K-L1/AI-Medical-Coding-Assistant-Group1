import React from 'react';
import { useNavigate } from 'react-router-dom';

function CoderHeader() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'coder@gmail.com';
  const userName = localStorage.getItem('userName') || 'Coder';

  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="welcome-section">
        <h1>Welcome back, {userName}</h1>
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
