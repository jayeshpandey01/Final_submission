import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';

interface CarbonCalculatorProps {
  onBack?: () => void;
}

interface FormData {
  // Personal
  height: string;
  weight: string;
  sex: string;
  diet: string;
  social: string;
  
  // Travel
  transport: string;
  vehicleType: string;
  vehicleKm: number;
  airTravel: string;
  
  // Waste
  wasteBag: string;
  wasteCount: number;
  recycle: string[];
  
  // Energy
  heatingEnergy: string;
  cooking: string[];
  energyEfficiency: string;
  dailyTvPc: number;
  internetDaily: number;
  
  // Consumption
  shower: string;
  groceryBill: number;
  clothesMonthly: number;
}

export default function CarbonCalculator({ onBack }: CarbonCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    height: '',
    weight: '',
    sex: 'female',
    diet: 'omnivore',
    social: 'never',
    transport: 'public',
    vehicleType: 'None',
    vehicleKm: 0,
    airTravel: 'never',
    wasteBag: 'small',
    wasteCount: 0,
    recycle: [],
    heatingEnergy: 'natural gas',
    cooking: [],
    energyEfficiency: 'No',
    dailyTvPc: 0,
    internetDaily: 0,
    shower: 'daily',
    groceryBill: 0,
    clothesMonthly: 0
  });
  
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: '👴 Personal', key: 'personal' },
    { title: '🚗 Travel', key: 'travel' },
    { title: '🗑️ Waste', key: 'waste' },
    { title: '⚡ Energy', key: 'energy' },
    { title: '💸 Consumption', key: 'consumption' },
    { title: '📊 Results', key: 'results' }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field: 'recycle' | 'cooking', option: string) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(item => item !== option)
      : [...currentValues, option];
    handleInputChange(field, newValues);
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

  const saveToJSON = async (data: any) => {
    try {
      const timestamp = new Date().toISOString();
      const calculationData = {
        timestamp,
        formData,
        results: data,
        id: Date.now().toString()
      };

      const fileUri = FileSystem.documentDirectory + 'carbon_calculations.json';
      
      // Read existing data
      let existingData = [];
      try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        existingData = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist yet, start with empty array
      }

      // Add new calculation
      existingData.push(calculationData);

      // Save updated data
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(existingData, null, 2));
      
      Alert.alert('Success', 'Your calculation has been saved!');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save calculation data');
    }
  };

  const calculateFootprint = async () => {
    setLoading(true);
    try {
      // Mock calculation for now - replace with actual API call
      const mockPrediction = Math.floor(Math.random() * 1000) + 500;
      const treeCount = Math.round(mockPrediction / 411.4);
      
      const calculationResults = {
        prediction: mockPrediction,
        treeCount: treeCount,
        breakdown: {
          Travel: Math.floor(Math.random() * 300) + 100,
          Energy: Math.floor(Math.random() * 300) + 100,
          Waste: Math.floor(Math.random() * 200) + 50,
          Diet: Math.floor(Math.random() * 250) + 75
        }
      };
      
      setResults(calculationResults);
      
      // Save to JSON
      await saveToJSON(calculationResults);
      
      setCurrentStep(5); // Move to results step
    } catch (error) {
      console.error('Calculation failed:', error);
      Alert.alert('Error', 'Failed to calculate environmental impact');
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={formData.height}
            onChangeText={(value) => handleInputChange('height', value)}
            placeholder="160"
            keyboardType="numeric"
            placeholderTextColor="#64748b"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={formData.weight}
            onChangeText={(value) => handleInputChange('weight', value)}
            placeholder="75"
            keyboardType="numeric"
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {['female', 'male'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.sex === option && styles.radioSelected]}
              onPress={() => handleInputChange('sex', option)}
            >
              <Text style={[styles.radioText, formData.sex === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Diet</Text>
        <View style={styles.radioGroup}>
          {['omnivore', 'pescatarian', 'vegetarian', 'vegan'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.diet === option && styles.radioSelected]}
              onPress={() => handleInputChange('diet', option)}
            >
              <Text style={[styles.radioText, formData.diet === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.helperText}>BMI: {calculateBMI().toFixed(1)} ({getBodyType()})</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Social Activity</Text>
        <View style={styles.radioGroup}>
          {['never', 'sometimes', 'often'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.social === option && styles.radioSelected]}
              onPress={() => handleInputChange('social', option)}
            >
              <Text style={[styles.radioText, formData.social === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.helperText}>How often do you go out?</Text>
      </View>
    </View>
  );

  const renderTravelStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Travel Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Transportation</Text>
        <View style={styles.radioGroup}>
          {['public', 'private', 'walk/bicycle'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.transport === option && styles.radioSelected]}
              onPress={() => handleInputChange('transport', option)}
            >
              <Text style={[styles.radioText, formData.transport === option && styles.radioTextSelected]}>
                {option === 'walk/bicycle' ? 'Walk/Bike' : option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {formData.transport === 'private' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Vehicle Type</Text>
          <View style={styles.radioGroup}>
            {['petrol', 'diesel', 'hybrid', 'lpg', 'electric'].map(option => (
              <TouchableOpacity
                key={option}
                style={[styles.radioOption, formData.vehicleType === option && styles.radioSelected]}
                onPress={() => handleInputChange('vehicleType', option)}
              >
                <Text style={[styles.radioText, formData.vehicleType === option && styles.radioTextSelected]}>
                  {option.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {formData.transport !== 'walk/bicycle' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Monthly Distance: {formData.vehicleKm} km</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>0</Text>
            <View style={styles.slider}>
              <TouchableOpacity
                style={[styles.sliderThumb, { left: `${(formData.vehicleKm / 5000) * 100}%` }]}
                onPress={() => {/* Implement slider logic */}}
              />
            </View>
            <Text style={styles.sliderLabel}>5000</Text>
          </View>
          <View style={styles.sliderButtons}>
            <TouchableOpacity
              style={styles.sliderButton}
              onPress={() => handleInputChange('vehicleKm', Math.max(0, formData.vehicleKm - 100))}
            >
              <Text style={styles.sliderButtonText}>-100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sliderButton}
              onPress={() => handleInputChange('vehicleKm', Math.min(5000, formData.vehicleKm + 100))}
            >
              <Text style={styles.sliderButtonText}>+100</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Air Travel Frequency</Text>
        <View style={styles.radioGroup}>
          {['never', 'rarely', 'frequently', 'very frequently'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.airTravel === option && styles.radioSelected]}
              onPress={() => handleInputChange('airTravel', option)}
            >
              <Text style={[styles.radioText, formData.airTravel === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.helperText}>How often did you fly last month?</Text>
      </View>
    </View>
  );

  const renderWasteStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Waste Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Waste Bag Size</Text>
        <View style={styles.radioGroup}>
          {['small', 'medium', 'large', 'extra large'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.wasteBag === option && styles.radioSelected]}
              onPress={() => handleInputChange('wasteBag', option)}
            >
              <Text style={[styles.radioText, formData.wasteBag === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weekly Waste Bags: {formData.wasteCount}</Text>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('wasteCount', Math.max(0, formData.wasteCount - 1))}
          >
            <Text style={styles.sliderButtonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('wasteCount', Math.min(10, formData.wasteCount + 1))}
          >
            <Text style={styles.sliderButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Recycling Materials</Text>
        <View style={styles.checkboxGroup}>
          {['Plastic', 'Paper', 'Metal', 'Glass'].map(material => (
            <TouchableOpacity
              key={material}
              style={[styles.checkboxOption, formData.recycle.includes(material) && styles.checkboxSelected]}
              onPress={() => handleMultiSelectChange('recycle', material)}
            >
              <Text style={[styles.checkboxText, formData.recycle.includes(material) && styles.checkboxTextSelected]}>
                {material}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderEnergyStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Energy Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Heating Energy Source</Text>
        <View style={styles.radioGroup}>
          {['natural gas', 'electricity', 'wood', 'coal'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.heatingEnergy === option && styles.radioSelected]}
              onPress={() => handleInputChange('heatingEnergy', option)}
            >
              <Text style={[styles.radioText, formData.heatingEnergy === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cooking Systems</Text>
        <View style={styles.checkboxGroup}>
          {['microwave', 'oven', 'grill', 'airfryer', 'stove'].map(system => (
            <TouchableOpacity
              key={system}
              style={[styles.checkboxOption, formData.cooking.includes(system) && styles.checkboxSelected]}
              onPress={() => handleMultiSelectChange('cooking', system)}
            >
              <Text style={[styles.checkboxText, formData.cooking.includes(system) && styles.checkboxTextSelected]}>
                {system.charAt(0).toUpperCase() + system.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Energy Efficiency</Text>
        <View style={styles.radioGroup}>
          {['No', 'Sometimes', 'Yes'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.energyEfficiency === option && styles.radioSelected]}
              onPress={() => handleInputChange('energyEfficiency', option)}
            >
              <Text style={[styles.radioText, formData.energyEfficiency === option && styles.radioTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Daily TV/PC Hours: {formData.dailyTvPc}</Text>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('dailyTvPc', Math.max(0, formData.dailyTvPc - 1))}
          >
            <Text style={styles.sliderButtonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('dailyTvPc', Math.min(24, formData.dailyTvPc + 1))}
          >
            <Text style={styles.sliderButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Daily Internet Hours: {formData.internetDaily}</Text>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('internetDaily', Math.max(0, formData.internetDaily - 1))}
          >
            <Text style={styles.sliderButtonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('internetDaily', Math.min(24, formData.internetDaily + 1))}
          >
            <Text style={styles.sliderButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderConsumptionStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Consumption Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Shower Frequency</Text>
        <View style={styles.radioGroup}>
          {['less frequently', 'daily', 'twice a day', 'more frequently'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, formData.shower === option && styles.radioSelected]}
              onPress={() => handleInputChange('shower', option)}
            >
              <Text style={[styles.radioText, formData.shower === option && styles.radioTextSelected]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Monthly Grocery Spending: ${formData.groceryBill}</Text>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('groceryBill', Math.max(0, formData.groceryBill - 25))}
          >
            <Text style={styles.sliderButtonText}>-$25</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('groceryBill', Math.min(500, formData.groceryBill + 25))}
          >
            <Text style={styles.sliderButtonText}>+$25</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Monthly Clothes: {formData.clothesMonthly}</Text>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('clothesMonthly', Math.max(0, formData.clothesMonthly - 1))}
          >
            <Text style={styles.sliderButtonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('clothesMonthly', Math.min(30, formData.clothesMonthly + 1))}
          >
            <Text style={styles.sliderButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.calculateButton, loading && styles.calculateButtonDisabled]}
        onPress={calculateFootprint}
        disabled={loading}
      >
        <Text style={styles.calculateButtonText}>
          {loading ? 'Calculating...' : 'Calculate My Environmental Impact'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderResultsStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Your Environmental Impact</Text>
      
      {results && (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.resultValue}>{results.prediction.toLocaleString()}</Text>
            <Text style={styles.resultUnit}>kg CO₂e per month</Text>
            <Text style={styles.treeInfo}>
              You need to plant {results.treeCount} tree{results.treeCount !== 1 ? 's' : ''} to offset this
            </Text>
          </View>

          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Breakdown by Category</Text>
            {Object.entries(results.breakdown).map(([category, value]) => (
              <View key={category} style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>{category}</Text>
                <Text style={styles.breakdownValue}>{value} kg CO₂e</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentStep(0)}>
            <Text style={styles.actionButtonText}>Calculate Again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalStep();
      case 1: return renderTravelStep();
      case 2: return renderWasteStep();
      case 3: return renderEnergyStep();
      case 4: return renderConsumptionStep();
      case 5: return renderResultsStep();
      default: return renderPersonalStep();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SawtchEarth Calculator</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Step Navigation */}
      <View style={styles.stepNavigation}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {steps.map((step, index) => (
            <TouchableOpacity
              key={step.key}
              style={[styles.stepButton, currentStep === index && styles.stepButtonActive]}
              onPress={() => setCurrentStep(index)}
            >
              <Text style={[styles.stepButtonText, currentStep === index && styles.stepButtonTextActive]}>
                {step.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      {currentStep < 5 && (
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentStep < 4 && (
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonNext]}
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text style={[styles.navButtonText, styles.navButtonTextNext]}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  placeholder: {
    width: 60,
  },
  stepNavigation: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  stepButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 24,
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
  },
  stepButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  stepButtonText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  stepButtonTextActive: {
    color: '#fff',
  },
  stepContent: {
    padding: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 32,
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    flex: 1,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#475569',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  radioText: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  radioTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkboxOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
  },
  checkboxSelected: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxText: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  checkboxTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#10b981',
    borderRadius: 10,
    top: -8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  sliderButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  sliderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#334155',
    borderRadius: 6,
  },
  sliderButtonText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  calculateButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonDisabled: {
    backgroundColor: '#059669',
    opacity: 0.7,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultUnit: {
    fontSize: 14,
    color: '#ecfdf5',
    marginTop: 4,
  },
  treeInfo: {
    fontSize: 12,
    color: '#ecfdf5',
    marginTop: 12,
    fontStyle: 'italic',
  },
  breakdownCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  actionButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#334155',
  },
  navButtonNext: {
    backgroundColor: '#10b981',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  navButtonTextNext: {
    color: '#fff',
  },
});