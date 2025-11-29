import React, { useState } from 'react';
import './Header.css';

const Header = ({ currentTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 0, label: 'Home', icon: '🏠' },
    { id: 1, label: 'Calculator', icon: '📊' },
    { id: 2, label: 'Results', icon: '📈' },
    { id: 3, label: 'MARIDA Dataset', icon: '🛰️' },
    // { id: 4, label: 'Data Viewer', icon: '📋' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo">
            <span className="logo-icon">🌱</span>
            <div className="brand-text">
              <h1>SawtchEarth</h1>
              <span className="brand-tagline">Environmental Intelligence</span>
            </div>
          </div>
        </div>

        <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
              onClick={() => {
                onTabChange(item.id);
                setIsMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">40B+</span>
              <span className="stat-label">Tons CO₂/year</span>
            </div>
          </div>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <div className="header-decoration"></div>
    </header>
  );
};

export default Header;