import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Results.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Results = ({ results, onBackToCalculator }) => {
  
  if (!results) {
    return (
      <div className="results">
        <div className="no-results">
          <h3>No Results Yet</h3>
          <p>Please complete the calculator to see your carbon footprint results.</p>
          <button className="back-button" onClick={onBackToCalculator}>
            Go to Calculator
          </button>
        </div>
      </div>
    );
  }

  const { prediction, treeCount, breakdown } = results;

  const chartData = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        data: Object.values(breakdown),
        backgroundColor: [
          '#29ad9f',
          '#1dc8b8', 
          '#99d9d9',
          '#b4e3dd'
        ],
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value} kgCO₂e`;
          }
        }
      }
    }
  };

  return (
    <div className="results">
      <div className="results-header">
        <h2>Your Carbon Footprint Results</h2>
        <div className="main-result">
          <div className="emission-display">
            <h3>Monthly Emission</h3>
            <div className="emission-value">
              {prediction} <span>kgCO₂e</span>
            </div>
          </div>
        </div>
      </div>

      <div className="results-content">
        <div className="chart-section">
          <h4>Emission Breakdown</h4>
          <div className="chart-container">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="insights-section">
          <div className="tree-offset">
            <h4>🌳 Environmental Impact</h4>
            <p>
              You owe nature <strong>{treeCount}</strong> tree{treeCount !== 1 ? 's' : ''} monthly.
            </p>
            {treeCount > 0 && (
              <a 
                href="https://www.tema.org.tr/en/homepage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="offset-button"
              >
                🌳 Proceed to offset 🌳
              </a>
            )}
          </div>

          <div className="breakdown-details">
            <h4>Detailed Breakdown</h4>
            <div className="breakdown-list">
              {Object.entries(breakdown).map(([category, value]) => (
                <div key={category} className="breakdown-item">
                  <span className="category">{category}</span>
                  <span className="value">{value} kgCO₂e</span>
                  <div className="percentage">
                    {((value / prediction) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendations">
            <h4>💡 Recommendations</h4>
            <ul>
              <li>Consider using public transportation or cycling more often</li>
              <li>Reduce energy consumption by using energy-efficient appliances</li>
              <li>Minimize food waste and consider a more plant-based diet</li>
              <li>Recycle and reduce single-use items</li>
              <li>Choose renewable energy sources when possible</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="back-button" onClick={onBackToCalculator}>
          🏡 Back to Calculator
        </button>
        <button className="recalculate-button" onClick={onBackToCalculator}>
          🔄 Recalculate
        </button>
      </div>
    </div>
  );
};

export default Results;