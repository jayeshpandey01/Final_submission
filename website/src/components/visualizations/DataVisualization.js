import React from 'react';
import './Visualizations.css';

const DataVisualization = () => {
  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1 className="visualization-title">Data Visualization & Embedding</h1>
        <p className="visualization-description">
          Advanced visualization techniques including dimensionality reduction, feature embedding, and interactive data exploration for the MARIDA dataset.
        </p>
      </div>
      <div className="content-container">
        <iframe 
          src="/docs/Report_4_Embedding.html" 
          title="MARIDA Data Visualization"
          className="doc-iframe"
          frameBorder="0"
        />
      </div>
      <div className="doc-summary">
        <div className="summary-card">
          <h3>Feature Embedding</h3>
          <p>High-dimensional data projected into interpretable spaces</p>
        </div>
        <div className="summary-card">
          <h3>Clustering Analysis</h3>
          <p>Natural groupings and patterns in the dataset</p>
        </div>
        <div className="summary-card">
          <h3>Interactive Plots</h3>
          <p>Dynamic visualizations for data exploration</p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;