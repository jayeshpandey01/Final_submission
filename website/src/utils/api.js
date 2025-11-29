const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const calculateEnvironmentalImpact = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    // Fallback to mock calculation
    return mockCalculation(formData);
  }
};

// Mock calculation for when API is not available
const mockCalculation = (formData) => {
  const mockPrediction = Math.floor(Math.random() * 1000) + 500;
  const treeCount = Math.round(mockPrediction / 411.4);
  
  return {
    prediction: mockPrediction,
    treeCount: treeCount,
    breakdown: {
      Travel: Math.floor(Math.random() * 300) + 100,
      Energy: Math.floor(Math.random() * 300) + 100,
      Waste: Math.floor(Math.random() * 200) + 50,
      Diet: Math.floor(Math.random() * 250) + 75
    }
  };
};

export const saveCalculation = async (calculationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/save-calculation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calculationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Save calculation failed:', error);
    throw error;
  }
};

export const getCalculations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-calculations`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get calculations failed:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};