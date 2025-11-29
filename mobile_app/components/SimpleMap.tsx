import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

interface SimpleMapProps {
  width?: number;
  height?: number;
}

export default function SimpleMap({ width = 300, height = 200 }: SimpleMapProps) {
  const locations = [
    { name: 'Home', emissions: 1800, category: 'Energy', icon: '⚡', x: 30, y: 40 },
    { name: 'Work', emissions: 2500, category: 'Travel', icon: '🚗', x: 60, y: 30 },
    { name: 'Mall', emissions: 900, category: 'Waste', icon: '🗑️', x: 45, y: 60 },
    { name: 'Restaurant', emissions: 1200, category: 'Diet', icon: '🍽️', x: 70, y: 50 },
  ];

  const totalEmissions = locations.reduce((sum, loc) => sum + loc.emissions, 0);

  return (
    <View style={[styles.container, { width, height: height + 120 }]}>
      <Text style={styles.title}>🗺️ Your SawtchEarth Impact Map</Text>
      
      {/* Map Area */}
      <View style={[styles.mapArea, { height }]}>
        {/* Grid background */}
        <View style={styles.gridBackground}>
          {Array.from({ length: 8 }).map((_, row) => (
            <View key={row} style={styles.gridRow}>
              {Array.from({ length: 10 }).map((_, col) => (
                <View key={col} style={styles.gridCell} />
              ))}
            </View>
          ))}
        </View>

        {/* Location markers */}
        {locations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.marker,
              {
                left: `${location.x}%`,
                top: `${location.y}%`,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.markerIcon}>{location.icon}</Text>
          </TouchableOpacity>
        ))}

        {/* Center marker (you) */}
        <View style={styles.centerMarker}>
          <Text style={styles.centerIcon}>📍</Text>
        </View>
      </View>

      {/* Location details */}
      <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Emission Sources</Text>
        {locations.map((location, index) => (
          <TouchableOpacity key={index} style={styles.locationItem} activeOpacity={0.7}>
            <Text style={styles.locationIcon}>{location.icon}</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationCategory}>{location.category}</Text>
            </View>
            <View style={styles.emissionInfo}>
              <Text style={styles.emissionValue}>{location.emissions}</Text>
              <Text style={styles.emissionUnit}>kg CO₂e</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Monthly Emissions:</Text>
          <Text style={styles.totalValue}>{totalEmissions.toLocaleString()} kg CO₂e</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 16,
  },
  mapArea: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    position: 'relative',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#334155',
  },
  gridBackground: {
    flex: 1,
    padding: 2,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#374151',
    margin: 0.5,
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerIcon: {
    fontSize: 14,
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  centerIcon: {
    fontSize: 12,
  },
  locationList: {
    maxHeight: 140,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  locationIcon: {
    fontSize: 18,
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  locationCategory: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
  },
  emissionInfo: {
    alignItems: 'flex-end',
  },
  emissionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  emissionUnit: {
    fontSize: 10,
    color: '#64748b',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});