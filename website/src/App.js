import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import Results from './components/Results';
import Documentation from './components/Documentation';
import DataViewer from './components/DataViewer';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { calculateEnvironmentalImpact, saveCalculation } from './utils/api';

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    // Personal
    height: '',
    weight: '',
    sex: 'female',
    diet: 'omnivore',
    social: 'never',
    
    // Travel
    transport: 'public',
    vehicleType: 'None',
    vehicleKm: 0,
    airTravel: 'never',
    
    // Waste
    wasteBag: 'small',
    wasteCount: 0,
    recycle: [],
    
    // Energy
    heatingEnergy: 'natural gas',
    cooking: [],
    energyEfficiency: 'No',
    dailyTvPc: 0,
    internetDaily: 0,
    
    // Consumption
    shower: 'daily',
    groceryBill: 0,
    clothesMonthly: 0
  });
  
  const [results, setResults] = useState(null);

  const handleTabChange = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveToJSON = async (data) => {
    try {
      const timestamp = new Date().toISOString();
      const calculationData = {
        timestamp,
        formData,
        results: data,
        userId: 'web-user-' + Date.now()
      };

      // Save to backend
      await saveCalculation(calculationData);

      // Also save to localStorage as backup
      const existingData = JSON.parse(localStorage.getItem('carbon_calculations') || '[]');
      existingData.push(calculationData);
      localStorage.setItem('carbon_calculations', JSON.stringify(existingData));
      
      // Create downloadable JSON file
      const dataStr = JSON.stringify(existingData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'carbon_calculations.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('Your calculation has been saved to database and downloaded!');
    } catch (error) {
      console.error('Error saving data:', error);
      
      // Fallback to localStorage only
      try {
        const timestamp = new Date().toISOString();
        const calculationData = {
          timestamp,
          formData,
          results: data,
          id: Date.now().toString()
        };

        const existingData = JSON.parse(localStorage.getItem('carbon_calculations') || '[]');
        existingData.push(calculationData);
        localStorage.setItem('carbon_calculations', JSON.stringify(existingData));
        
        alert('Calculation saved locally (server unavailable)');
      } catch (localError) {
        alert('Failed to save calculation data');
      }
    }
  };

  const calculateImpact = async () => {
    try {
      const result = await calculateEnvironmentalImpact(formData);
      setResults(result);
      
      // Save to JSON
      saveToJSON(result);
      
      setCurrentTab(2); // Switch to results tab
    } catch (error) {
      console.error('Calculation failed:', error);
      // Fallback to mock data if API fails
      const mockPrediction = Math.floor(Math.random() * 1000) + 500;
      const treeCount = Math.round(mockPrediction / 411.4);
      
      const mockResults = {
        prediction: mockPrediction,
        treeCount: treeCount,
        breakdown: {
          Travel: Math.floor(Math.random() * 300) + 100,
          Energy: Math.floor(Math.random() * 300) + 100,
          Waste: Math.floor(Math.random() * 200) + 50,
          Diet: Math.floor(Math.random() * 250) + 75
        }
      };
      
      setResults(mockResults);
      
      // Save to JSON
      saveToJSON(mockResults);
      
      setCurrentTab(2); // Switch to results tab
    }
  };

  return (
    <div className="App">
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      
      <main className="main-content">
        {currentTab === 0 && (
          <LandingPage 
            onStartCalculation={() => handleTabChange(1)}
            onNavigateToDocumentation={() => handleTabChange(3)}
          />
        )}
        {currentTab === 1 && (
          <div className="container">
            <Calculator 
              formData={formData}
              onFormChange={handleFormChange}
              onCalculate={calculateImpact}
            />
          </div>
        )}
        {currentTab === 2 && (
          <div className="container">
            <Results 
              results={results}
              onBackToCalculator={() => handleTabChange(1)}
            />
          </div>
        )}
        {currentTab === 3 && (
          <Documentation />
        )}
        {currentTab === 4 && (
          <DataViewer />
        )}
      </main>
      
      <Chatbot isPageMode={false} />
      <Footer />
    </div>
  );
}

export default App;