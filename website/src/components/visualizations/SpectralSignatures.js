import React from 'react';
import './Visualizations.css';

const SpectralSignatures = () => {
  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1 className="visualization-title">Spectral Signatures</h1>
        <p className="visualization-description">
          Analysis of spectral characteristics across different material categories, showing unique signatures for marine debris detection and classification.
        </p>
      </div>
      <div className="content-container">
        <iframe 
          src="/docs/Report_3_Signatures.html" 
          title="MARIDA Spectral Signatures"
          className="doc-iframe"
          frameBorder="0"
        />
      </div>
      <div className="doc-summary">
        <div className="summary-card">
          <h3>Multi-spectral Analysis</h3>
          <p>11 spectral bands from Sentinel-2 satellite imagery</p>
        </div>
        <div className="summary-card">
          <h3>Material Classification</h3>
          <p>Distinct signatures for different debris types and materials</p>
        </div>
        <div className="summary-card">
          <h3>Detection Features</h3>
          <p>Key spectral features for automated detection algorithms</p>
        </div>
      </div>
    </div>
  );
};

export default SpectralSignatures;