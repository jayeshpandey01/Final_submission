import React from 'react';
import './Visualizations.css';

const GeographicDistribution = () => {
  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1 className="visualization-title">Geographic Distribution</h1>
        <p className="visualization-description">
          Interactive map showing the global distribution of marine debris detection sites and data collection points across different oceanic regions.
        </p>
      </div>
      <div className="content-container">
        <iframe 
          src="/docs/Report_1_Map.html" 
          title="MARIDA Geographic Distribution"
          className="doc-iframe"
          frameBorder="0"
        />
      </div>
      <div className="doc-summary">
        <div className="summary-card">
          <h3>Global Coverage</h3>
          <p>Satellite data from multiple oceanic regions worldwide</p>
        </div>
        <div className="summary-card">
          <h3>Sentinel-2 Data</h3>
          <p>High-resolution 10m spatial resolution imagery</p>
        </div>
        <div className="summary-card">
          <h3>Marine Focus</h3>
          <p>Targeted collection in areas with known marine debris</p>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;