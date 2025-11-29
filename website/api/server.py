from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the ML model and scaler
try:
    model = pickle.load(open("../models/model.sav", "rb"))
    scaler = pickle.load(open("../models/scale.sav", "rb"))
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
    model = None
    scaler = None

# Sample data structure (from original functions.py)
sample_columns = ['Body Type', 'Sex', 'How Often Shower', 'Social Activity', 'Monthly Grocery Bill',
                 'Frequency of Traveling by Air', 'Vehicle Monthly Distance Km', 'Waste Bag Size',
                 'Waste Bag Weekly Count', 'How Long TV PC Daily Hour', 'How Many New Clothes Monthly',
                 'How Long Internet Daily Hour', 'Energy efficiency', 'Do You Recyle_Paper',
                 'Do You Recyle_Plastic', 'Do You Recyle_Glass', 'Do You Recyle_Metal',
                 'Cooking_with_stove', 'Cooking_with_oven', 'Cooking_with_microwave',
                 'Cooking_with_grill', 'Cooking_with_airfryer', 'Diet_omnivore', 'Diet_pescatarian',
                 'Diet_vegan', 'Diet_vegetarian', 'Heating Energy Source_coal',
                 'Heating Energy Source_electricity', 'Heating Energy Source_natural gas',
                 'Heating Energy Source_wood', 'Transport_private', 'Transport_public',
                 'Transport_walk/bicycle', 'Vehicle Type_None', 'Vehicle Type_diesel',
                 'Vehicle Type_electric', 'Vehicle Type_hybrid', 'Vehicle Type_lpg',
                 'Vehicle Type_petrol']

def preprocess_data(form_data):
    """Convert form data to model input format"""
    # Calculate BMI and body type
    height = float(form_data.get('height', 160)) / 100
    weight = float(form_data.get('weight', 75))
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        body_type = 0  # underweight
    elif bmi < 25:
        body_type = 1  # normal
    elif bmi < 30:
        body_type = 2  # overweight
    else:
        body_type = 3  # obese
    
    # Create base data dictionary
    data = {
        'Body Type': body_type,
        'Sex': 1 if form_data.get('sex') == 'male' else 0,
        'How Often Shower': {'less frequently': 0, 'daily': 1, 'twice a day': 2, 'more frequently': 3}.get(form_data.get('shower', 'daily'), 1),
        'Social Activity': {'never': 0, 'sometimes': 1, 'often': 2}.get(form_data.get('social', 'never'), 0),
        'Monthly Grocery Bill': int(form_data.get('groceryBill', 0)),
        'Frequency of Traveling by Air': {'never': 0, 'rarely': 1, 'frequently': 2, 'very frequently': 3}.get(form_data.get('airTravel', 'never'), 0),
        'Vehicle Monthly Distance Km': int(form_data.get('vehicleKm', 0)),
        'Waste Bag Size': {'small': 0, 'medium': 1, 'large': 2, 'extra large': 3}.get(form_data.get('wasteBag', 'small'), 0),
        'Waste Bag Weekly Count': int(form_data.get('wasteCount', 0)),
        'How Long TV PC Daily Hour': int(form_data.get('dailyTvPc', 0)),
        'How Many New Clothes Monthly': int(form_data.get('clothesMonthly', 0)),
        'How Long Internet Daily Hour': int(form_data.get('internetDaily', 0)),
        'Energy efficiency': {'No': 0, 'Sometimes': 1, 'Yes': 2}.get(form_data.get('energyEfficiency', 'No'), 0)
    }
    
    # Initialize all categorical columns to 0
    for col in sample_columns:
        if col not in data:
            data[col] = 0
    
    # Set diet
    diet = form_data.get('diet', 'omnivore')
    data[f'Diet_{diet}'] = 1
    
    # Set heating energy source
    heating = form_data.get('heatingEnergy', 'natural gas')
    data[f'Heating Energy Source_{heating}'] = 1
    
    # Set transport
    transport = form_data.get('transport', 'public')
    data[f'Transport_{transport}'] = 1
    
    # Set vehicle type
    vehicle_type = form_data.get('vehicleType', 'None')
    data[f'Vehicle Type_{vehicle_type}'] = 1
    
    # Set recycling
    recycle = form_data.get('recycle', [])
    for material in recycle:
        data[f'Do You Recyle_{material}'] = 1
    
    # Set cooking methods
    cooking = form_data.get('cooking', [])
    for method in cooking:
        data[f'Cooking_with_{method}'] = 1
    
    return data

def calculate_breakdown(model, scaler, sample_df):
    """Calculate breakdown by category"""
    copy_df = sample_df.copy()
    
    # Travel calculation
    travel_cols = ["Frequency of Traveling by Air", "Vehicle Monthly Distance Km",
                   'Transport_private', 'Transport_public', 'Transport_walk/bicycle',
                   'Vehicle Type_None', 'Vehicle Type_diesel', 'Vehicle Type_electric',
                   'Vehicle Type_hybrid', 'Vehicle Type_lpg', 'Vehicle Type_petrol']
    travel_df = copy_df.copy()
    for col in travel_df.columns:
        if col not in travel_cols:
            travel_df[col] = 0
    travel = np.exp(model.predict(scaler.transform(travel_df)))[0]
    
    # Energy calculation
    energy_cols = ['Heating Energy Source_coal', 'How Often Shower', 'How Long TV PC Daily Hour',
                   'Heating Energy Source_electricity', 'How Long Internet Daily Hour',
                   'Heating Energy Source_natural gas', 'Cooking_with_stove',
                   'Cooking_with_oven', 'Cooking_with_microwave', 'Cooking_with_grill',
                   'Cooking_with_airfryer', 'Heating Energy Source_wood', 'Energy efficiency']
    energy_df = copy_df.copy()
    for col in energy_df.columns:
        if col not in energy_cols:
            energy_df[col] = 0
    energy = np.exp(model.predict(scaler.transform(energy_df)))[0]
    
    # Waste calculation
    waste_cols = ['Do You Recyle_Paper', 'How Many New Clothes Monthly', 'Waste Bag Size',
                  'Waste Bag Weekly Count', 'Do You Recyle_Plastic', 'Do You Recyle_Glass',
                  'Do You Recyle_Metal', 'Social Activity']
    waste_df = copy_df.copy()
    for col in waste_df.columns:
        if col not in waste_cols:
            waste_df[col] = 0
    waste = np.exp(model.predict(scaler.transform(waste_df)))[0]
    
    # Diet calculation
    diet_cols = ['Diet_omnivore', 'Diet_pescatarian', 'Diet_vegan', 'Diet_vegetarian',
                 'Monthly Grocery Bill', 'Transport_private', 'Transport_public',
                 'Transport_walk/bicycle', 'Heating Energy Source_coal',
                 'Heating Energy Source_electricity', 'Heating Energy Source_natural gas',
                 'Heating Energy Source_wood']
    diet_df = copy_df.copy()
    for col in diet_df.columns:
        if col not in diet_cols:
            diet_df[col] = 0
    diet = np.exp(model.predict(scaler.transform(diet_df)))[0]
    
    return {
        "Travel": round(travel),
        "Energy": round(energy),
        "Waste": round(waste),
        "Diet": round(diet)
    }

@app.route('/api/calculate', methods=['POST'])
def calculate_footprint():
    try:
        if not model or not scaler:
            return jsonify({"error": "ML models not loaded"}), 500
        
        form_data = request.json
        
        # Preprocess the data
        processed_data = preprocess_data(form_data)
        
        # Create DataFrame with all required columns
        sample_df = pd.DataFrame([{col: 0 for col in sample_columns}])
        for key, value in processed_data.items():
            if key in sample_df.columns:
                sample_df[key] = value
        
        # Make prediction
        prediction = round(np.exp(model.predict(scaler.transform(sample_df))[0]))
        
        # Calculate breakdown
        breakdown = calculate_breakdown(model, scaler, sample_df)
        
        # Calculate tree offset
        tree_count = round(prediction / 411.4)
        
        return jsonify({
            "prediction": prediction,
            "treeCount": tree_count,
            "breakdown": breakdown
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/save-calculation', methods=['POST'])
def save_calculation():
    try:
        data = request.json
        timestamp = data.get('timestamp', pd.Timestamp.now().isoformat())
        
        # Create calculation record
        calculation_record = {
            'id': str(pd.Timestamp.now().timestamp()),
            'timestamp': timestamp,
            'form_data': data.get('formData', {}),
            'results': data.get('results', {}),
            'user_id': data.get('userId', 'anonymous')
        }
        
        # Save to JSON file
        json_file_path = '../data/carbon_calculations.json'
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(json_file_path), exist_ok=True)
        
        # Read existing data
        try:
            with open(json_file_path, 'r') as f:
                existing_data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            existing_data = []
        
        # Add new calculation
        existing_data.append(calculation_record)
        
        # Write updated data
        with open(json_file_path, 'w') as f:
            json.dump(existing_data, f, indent=2)
        
        return jsonify({
            "success": True,
            "message": "Calculation saved successfully",
            "id": calculation_record['id']
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/get-calculations', methods=['GET'])
def get_calculations():
    try:
        json_file_path = '../data/carbon_calculations.json'
        
        try:
            with open(json_file_path, 'r') as f:
                data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            data = []
        
        return jsonify({
            "success": True,
            "calculations": data,
            "count": len(data)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "models_loaded": model is not None})

if __name__ == '__main__':
    app.run(debug=True, port=5000)