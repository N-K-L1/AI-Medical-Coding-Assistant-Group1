import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="welcome-section">
        <h1>Welcome back, Dr. June</h1>
        <p className="subtitle">Doctor Dashboard</p>
      </div>
      
      <div className="header-right">
        <div className="user-email">
          <span className="icon">👤</span>
          doctor@gmail.com
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
          <span className="icon">→</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
