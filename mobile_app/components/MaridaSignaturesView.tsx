import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Spectral signature data extracted from the HTML report
const spectralData = [
  {
    class: 'Marine Debris',
    color: '#ef4444',
    values: [0.046, 0.062, 0.057, 0.057, 0.040, 0.042, 0.046, 0.057, 0.048, 0.020, 0.011],
  },
  {
    class: 'Dense Sargassum',
    color: '#22c55e',
    values: [0.042, 0.041, 0.049, 0.045, 0.095, 0.118, 0.141, 0.133, 0.137, 0.016, 0.010],
  },
  {
    class: 'Sparse Sargassum',
    color: '#84cc16',
    values: [0.039, 0.032, 0.027, 0.022, 0.035, 0.041, 0.046, 0.045, 0.044, 0.008, 0.005],
  },
  {
    class: 'Marine Water',
    color: '#1e40af',
    values: [0.039, 0.034, 0.024, 0.017, 0.014, 0.014, 0.015, 0.013, 0.014, 0.009, 0.007],
  },
  {
    class: 'Sediment-Laden Water',
    color: '#eab308',
    values: [0.067, 0.076, 0.105, 0.136, 0.124, 0.097, 0.109, 0.086, 0.086, 0.010, 0.006],
  },
  {
    class: 'Ship',
    color: '#f97316',
    values: [0.066, 0.108, 0.108, 0.116, 0.097, 0.098, 0.107, 0.106, 0.108, 0.075, 0.047],
  },
  {
    class: 'Clouds',
    color: '#d1d5db',
    values: [0.169, 0.166, 0.152, 0.152, 0.146, 0.150, 0.159, 0.147, 0.161, 0.137, 0.108],
  },
];

const bands = [
  { name: 'B1', wavelength: '443nm', description: 'Coastal aerosol' },
  { name: 'B2', wavelength: '490nm', description: 'Blue' },
  { name: 'B3', wavelength: '560nm', description: 'Green' },
  { name: 'B4', wavelength: '665nm', description: 'Red' },
  { name: 'B5', wavelength: '705nm', description: 'Red edge 1' },
  { name: 'B6', wavelength: '740nm', description: 'Red edge 2' },
  { name: 'B7', wavelength: '783nm', description: 'Red edge 3' },
  { name: 'B8', wavelength: '842nm', description: 'NIR' },
  { name: 'B8A', wavelength: '865nm', description: 'NIR narrow' },
  { name: 'B11', wavelength: '1610nm', description: 'SWIR 1' },
  { name: 'B12', wavelength: '2190nm', description: 'SWIR 2' },
];

export default function MaridaSignaturesView() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>(spectralData.map(d => d.class));
  const [selectedBand, setSelectedBand] = useState<number | null>(null);

  const toggleClass = (className: string) => {