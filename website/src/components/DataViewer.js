import React, { useState, useEffect } from 'react';
import { getCalculations } from '../utils/api';
import './DataViewer.css';

const DataViewer = () => {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCalculation, setSelectedCalculation] = useState(null);

  useEffect(() => {
    loadCalculations();
  }, []);

  const loadCalculations = async () => {
    try {
      setLoading(true);
      const response = await getCalculations();
      setCalculations(response.calculations || []);
    } catch (err) {
      console.error('Failed to load calculations:', err);
      // Fallback to localStorage
      const localData = JSON.parse(localStorage.getItem('carbon_calculations') || '[]');
      setCalculations(localData);
      setError('Using local data (server unavailable)');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(calculations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'all_carbon_calculations.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all calculation data?')) {
      localStorage.removeItem('carbon_calculations');
      setCalculations([]);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="data-viewer">
        <div className="loading">Loading calculations...</div>
      </div>
    );
  }

  return (
    <div className="data-viewer">
      <div className="data-viewer-header">
        <h2>Saved Environmental Impact Assessments</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="data-actions">
          <button onClick={loadCalculations} className="refresh-btn">
            🔄 Refresh
          </button>
          <button onClick={exportData} className="export-btn">
            📥 Export All Data
          </button>
          <button onClick={clearData} className="clear-btn">
            🗑️ Clear Local Data
          </button>
        </div>
      </div>

      <div className="data-stats">
        <div className="stat-card">
          <h3>Total Calculations</h3>
          <p>{calculations.length}</p>
        </div>
        {calculations.length > 0 && (
          <>
            <div className="stat-card">
              <h3>Average Impact</h3>
              <p>
                {Math.round(
                  calculations.reduce((sum, calc) => sum + (calc.results?.prediction || 0), 0) / calculations.length
                ).toLocaleString()} kg CO₂e
              </p>
            </div>
            <div className="stat-card">
              <h3>Latest Calculation</h3>
              <p>{formatDate(calculations[calculations.length - 1]?.timestamp)}</p>
            </div>
          </>
        )}
      </div>

      {calculations.length === 0 ? (
        <div className="no-data">
          <p>No assessments saved yet. Complete an environmental impact assessment to see data here.</p>
        </div>
      ) : (
        <div className="calculations-grid">
          <div className="calculations-list">
            <h3>Calculation History</h3>
            {calculations.map((calc, index) => (
              <div
                key={calc.id || index}
                className={`calculation-item ${selectedCalculation === calc ? 'selected' : ''}`}
                onClick={() => setSelectedCalculation(calc)}
              >
                <div className="calc-header">
                  <span className="calc-date">{formatDate(calc.timestamp)}</span>
                  <span className="calc-footprint">
                    {calc.results?.prediction?.toLocaleString() || 'N/A'} kg CO₂e
                  </span>
                </div>
                <div className="calc-preview">
                  Trees needed: {calc.results?.treeCount || 'N/A'}
                </div>
              </div>
            ))}
          </div>

          {selectedCalculation && (
            <div className="calculation-details">
              <h3>Calculation Details</h3>
              <div className="detail-section">
                <h4>Results</h4>
                <div className="result-grid">
                  <div className="result-item">
                    <label>Total Impact:</label>
                    <span>{selectedCalculation.results?.prediction?.toLocaleString() || 'N/A'} kg CO₂e</span>
                  </div>
                  <div className="result-item">
                    <label>Trees to Plant:</label>
                    <span>{selectedCalculation.results?.treeCount || 'N/A'}</span>
                  </div>
                </div>

                {selectedCalculation.results?.breakdown && (
                  <div className="breakdown-section">
                    <h5>Breakdown by Category</h5>
                    {Object.entries(selectedCalculation.results.breakdown).map(([category, value]) => (
                      <div key={category} className="breakdown-item">
                        <span className="category">{category}:</span>
                        <span className="value">{value} kg CO₂e</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h4>Form Data</h4>
                <div className="form-data-grid">
                  {Object.entries(selectedCalculation.form_data || selectedCalculation.formData || {}).map(([key, value]) => (
                    <div key={key} className="form-data-item">
                      <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                      <span>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-actions">
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(selectedCalculation, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `calculation_${selectedCalculation.id || Date.now()}.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="export-single-btn"
                >
                  📥 Export This Calculation
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataViewer;