import React from 'react';
import './Visualizations.css';

const DataAnalysis = () => {
  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1 className="visualization-title">Exploratory Data Analysis</h1>
        <p className="visualization-description">
          Comprehensive statistical analysis of the MARIDA dataset including data distribution, quality metrics, and preprocessing insights.
        </p>
      </div>
      <div className="content-container">
        <iframe 
          src="/docs/Report_2_EDA.html" 
          title="MARIDA Exploratory Data Analysis"
          className="doc-iframe"
          frameBorder="0"
        />
      </div>
      <div className="doc-summary">
        <div className="summary-card">
          <h3>Statistical Overview</h3>
          <p>Detailed statistics on pixel values and band distributions</p>
        </div>
        <div className="summary-card">
          <h3>Quality Assessment</h3>
          <p>Data quality metrics and preprocessing validation</p>
        </div>
        <div className="summary-card">
          <h3>Pattern Analysis</h3>
          <p>Identification of data patterns and anomalies</p>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;