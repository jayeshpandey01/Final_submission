import React from 'react';
import './Visualizations.css';

const DatasetStatistics = () => {
  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1 className="visualization-title">Dataset Statistics</h1>
        <p className="visualization-description">
          Comprehensive statistics on dataset composition, train/validation/test splits, and patch distribution across categories for machine learning applications.
        </p>
      </div>
      <div className="content-container">
        <iframe 
          src="/docs/Report_5_Patches_stats.html" 
          title="MARIDA Dataset Statistics"
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
};

export default DatasetStatistics;