import React, { useState } from 'react';
import './Documentation.css';
import './visualizations/Visualizations.css';
import GeographicDistribution from './visualizations/GeographicDistribution';
import DataAnalysis from './visualizations/DataAnalysis';
import SpectralSignatures from './visualizations/SpectralSignatures';
import DataVisualization from './visualizations/DataVisualization';


const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Geographic Distribution', icon: '🗺️' },
    { id: 'eda', title: 'Data Analysis', icon: '📊' },
    { id: 'signatures', title: 'Spectral Signatures', icon: '📈' },
    { id: 'embedding', title: 'Data Visualization', icon: '🔍' },
    { id: 'patches', title: 'Dataset Statistics', icon: '📋' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <GeographicDistribution />;
      
      case 'eda':
        return <DataAnalysis />;
      
      case 'signatures':
        return <SpectralSignatures />;
      
      case 'embedding':
        return <DataVisualization />;
      
      case 'patches':
        return (
          <div className="doc-content">
            <div className="doc-header">
              <h1>Dataset Statistics</h1>
              <p className="doc-description">
                Comprehensive statistics on dataset composition, train/validation/test splits, and patch distribution across categories for machine learning applications.
              </p>
            </div>
            <div className="content-container">
              <iframe 
                src="/docs/Report_5_Patches_stats.html" 
                title="MARIDA Patch Statistics"
                className="doc-iframe"
                frameBorder="0"
              />
            </div>
            <div className="doc-summary">
              <div className="summary-card">
                <h3>ML-Ready Format</h3>
                <p>256×256 pixel patches optimized for deep learning training</p>
              </div>
              <div className="summary-card">
                <h3>Balanced Splits</h3>
                <p>Train/validation/test divisions for robust model evaluation</p>
              </div>
              <div className="summary-card">
                <h3>Distribution Analysis</h3>
                <p>Patch counts and percentages across all categories</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a section to view documentation</div>;
    }
  };

  return (
    <div className="documentation-container">
      <div className="doc-hero">
        <div className="hero-content">
          <h1 className="hero-title">MARIDA Dataset</h1>
          <p className="hero-subtitle">Marine Debris Archive for Deep Learning</p>
          <p className="hero-description">
            A comprehensive satellite-based dataset for marine debris detection and environmental monitoring using advanced machine learning techniques.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">15</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2,597</span>
            <span className="stat-label">Image Patches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">11</span>
            <span className="stat-label">Spectral Bands</span>
          </div>
        </div>
      </div>

      <div className="doc-layout">
        <nav className="doc-sidebar">
          <h3 className="sidebar-title">Dataset Sections</h3>
          <ul className="nav-links">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-text">{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="sidebar-info">
            <div className="info-item">
              <h4>Data Source</h4>
              <p>Sentinel-2 satellite imagery with 10m spatial resolution</p>
            </div>
            <div className="info-item">
              <h4>Applications</h4>
              <p>Environmental monitoring, marine debris detection, ocean conservation</p>
            </div>
            <div className="info-item">
              <h4>Format</h4>
              <p>256×256 pixel patches, ML-ready preprocessing</p>
            </div>
          </div>
        </nav>

        <main className="doc-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Documentation;