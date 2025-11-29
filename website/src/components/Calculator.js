import React, { useState } from 'react';
import './Calculator.css';

const Calculator = ({ formData, onFormChange, onCalculate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { title: '👴 Personal', key: 'personal' },
    { title: '🚗 Travel', key: 'travel' },
    { title: '🗑️ Waste', key: 'waste' },
    { title: '⚡ Energy', key: 'energy' },
    { title: '💸 Consumption', key: 'consumption' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const handleMultiSelectChange = (field, option) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(item => item !== option)
      : [...currentValues, option];
    onFormChange(field, newValues);
  };

  const calculateBMI = () => {
    const height = parseFloat(formData.height) || 160;
    const weight = parseFloat(formData.weight) || 75;
    return weight / Math.pow(height / 100, 2);
  };

  const getBodyType = () => {
    const bmi = calculateBMI();
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  };

  const renderPersonalStep = () => (
    <div className="step-content">
      <h3>Personal Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="160"
            min="0"
            max="251"
          />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="75"
            min="0"
            max="250"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Gender</label>
        <select
          value={formData.sex}
          onChange={(e) => handleInputChange('sex', e.target.value)}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Diet</label>
        <select
          value={formData.diet}
          onChange={(e) => handleInputChange('diet', e.target.value)}
        >
          <option value="omnivore">Omnivore</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
        <small>Current BMI: {calculateBMI().toFixed(1)} ({getBodyType()})</small>
      </div>
      
      <div className="form-group">
        <label>Social Activity</label>
        <select
          value={formData.social}
          onChange={(e) => handleInputChange('social', e.target.value)}
        >
          <option value="never">Never</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
        </select>
        <small>How often do you go out?</small>
      </div>
    </div>
  );

  const renderTravelStep = () => (
    <div className="step-content">
      <h3>Travel Information</h3>
      <div className="form-group">
        <label>Transportation</label>
        <select
          value={formData.transport}
          onChange={(e) => handleInputChange('transport', e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="walk/bicycle">Walk/Bicycle</option>
        </select>
        <small>Which transportation method do you prefer the most?</small>
      </div>
      
      {formData.transport === 'private' && (
        <div className="form-group">
          <label>Vehicle Type</label>
          <select
            value={formData.vehicleType}
            onChange={(e) => handleInputChange('vehicleType', e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="lpg">LPG</option>
            <option value="electric">Electric</option>
          </select>
          <small>What type of fuel do you use in your car?</small>
        </div>
      )}
      
      {formData.transport !== 'walk/bicycle' && (
        <div className="form-group">
          <label>Monthly Distance (km): {formData.vehicleKm}</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={formData.vehicleKm}
            onChange={(e) => handleInputChange('vehicleKm', parseInt(e.target.value))}
          />
        </div>
      )}
      
      <div className="form-group">
        <label>Air Travel Frequency</label>
        <select
          value={formData.airTravel}
          onChange={(e) => handleInputChange('airTravel', e.target.value)}
        >
          <option value="never">Never</option>
          <option value="rarely">Rarely (1-4 Hours)</option>
          <option value="frequently">Frequently (5-10 Hours)</option>
          <option value="very frequently">Very Frequently (10+ Hours)</option>
        </select>
        <small>How often did you fly last month?</small>
      </div>
    </div>
  );

  const renderWasteStep = () => (
    <div className="step-content">
      <h3>Waste Information</h3>
      <div className="form-group">
        <label>Waste Bag Size</label>
        <select
          value={formData.wasteBag}
          onChange={(e) => handleInputChange('wasteBag', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra large">Extra Large</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Weekly Waste Bags: {formData.wasteCount}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={formData.wasteCount}
          onChange={(e) => handleInputChange('wasteCount', parseInt(e.target.value))}
        />
        <small>How many waste bags do you trash out in a week?</small>
      </div>
      
      <div className="form-group">
        <label>Recycling Materials</label>
        <div className="checkbox-group">
          {['Plastic', 'Paper', 'Metal', 'Glass'].map(material => (
            <label key={material} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.recycle.includes(material)}
                onChange={() => handleMultiSelectChange('recycle', material)}
              />
              {material}
            </label>
          ))}
        </div>
        <small>Do you recycle any materials below?</small>
      </div>
    </div>
  );

  const renderEnergyStep = () => (
    <div className="step-content">
      <h3>Energy Information</h3>
      <div className="form-group">
        <label>Heating Energy Source</label>
        <select
          value={formData.heatingEnergy}
          onChange={(e) => handleInputChange('heatingEnergy', e.target.value)}
        >
          <option value="natural gas">Natural Gas</option>
          <option value="electricity">Electricity</option>
          <option value="wood">Wood</option>
          <option value="coal">Coal</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Cooking Systems</label>
        <div className="checkbox-group">
          {['microwave', 'oven', 'grill', 'airfryer', 'stove'].map(system => (
            <label key={system} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.cooking.includes(system)}
                onChange={() => handleMultiSelectChange('cooking', system)}
              />
              {system.charAt(0).toUpperCase() + system.slice(1)}
            </label>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Energy Efficiency Consideration</label>
        <select
          value={formData.energyEfficiency}
          onChange={(e) => handleInputChange('energyEfficiency', e.target.value)}
        >
          <option value="No">No</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Daily TV/PC Hours: {formData.dailyTvPc}</label>
        <input
          type="range"
          min="0"
          max="24"
          value={formData.dailyTvPc}
          onChange={(e) => handleInputChange('dailyTvPc', parseInt(e.target.value))}
        />
      </div>
      
      <div className="form-group">
        <label>Daily Internet Hours: {formData.internetDaily}</label>
        <input
          type="range"
          min="0"
          max="24"
          value={formData.internetDaily}
          onChange={(e) => handleInputChange('internetDaily', parseInt(e.target.value))}
        />
      </div>
    </div>
  );

  const renderConsumptionStep = () => (
    <div className="step-content">
      <h3>Consumption Information</h3>
      <div className="form-group">
        <label>Shower Frequency</label>
        <select
          value={formData.shower}
          onChange={(e) => handleInputChange('shower', e.target.value)}
        >
          <option value="less frequently">Less Frequently</option>
          <option value="daily">Daily</option>
          <option value="twice a day">Twice a Day</option>
          <option value="more frequently">More Frequently</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Monthly Grocery Spending: ${formData.groceryBill}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={formData.groceryBill}
          onChange={(e) => handleInputChange('groceryBill', parseInt(e.target.value))}
        />
      </div>
      
      <div className="form-group">
        <label>Monthly Clothes Purchases: {formData.clothesMonthly}</label>
        <input
          type="range"
          min="0"
          max="30"
          value={formData.clothesMonthly}
          onChange={(e) => handleInputChange('clothesMonthly', parseInt(e.target.value))}
        />
      </div>
      
      <div className="calculate-section">
        <button className="calculate-button" onClick={onCalculate}>
          Calculate Environmental Impact
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalStep();
      case 1: return renderTravelStep();
      case 2: return renderWasteStep();
      case 3: return renderEnergyStep();
      case 4: return renderConsumptionStep();
      default: return renderPersonalStep();
    }
  };

  return (
    <div className="calculator">
      <div className="step-navigation">
        {steps.map((step, index) => (
          <button
            key={step.key}
            className={`step-button ${currentStep === index ? 'active' : ''}`}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </button>
        ))}
      </div>
      
      <div className="step-container">
        {renderStepContent()}
      </div>
      
      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button 
            className="nav-button prev"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button 
            className="nav-button next"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Calculator;