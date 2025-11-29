import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Sample data extracted from the HTML report
const marineDebrisData = [
  { lat: 15.9, lon: -88.2, class: 'Marine Debris', confidence: 'High', location: 'Guatemala Coast' },
  { lat: 16.1, lon: -88.0, class: 'Marine Debris', confidence: 'High', location: 'Honduras Coast' },
  { lat: 15.8, lon: -88.4, class: 'Dense Sargassum', confidence: 'High', location: 'Caribbean Sea' },
  { lat: 16.3, lon: -87.8, class: 'Sparse Sargassum', confidence: 'High', location: 'Belize Coast' },
  { lat: 15.7, lon: -88.6, class: 'Ship', confidence: 'High', location: 'Shipping Lane' },
  { lat: 16.0, lon: -88.1, class: 'Marine Water', confidence: 'High', location: 'Open Ocean' },
  { lat: 15.9, lon: -88.3, class: 'Sediment-Laden Water', confidence: 'High', location: 'River Mouth' },
  { lat: 16.2, lon: -87.9, class: 'Turbid Water', confidence: 'High', location: 'Coastal Area' },
  { lat: 15.6, lon: -88.7, class: 'Shallow Water', confidence: 'High', location: 'Reef Area' },
  { lat: 16.4, lon: -87.7, class: 'Natural Organic Material', confidence: 'High', location: 'Mangrove Area' },
];

const classColors = {
  'Marine Debris': '#ef4444',
  'Dense Sargassum': '#22c55e',
  'Sparse Sargassum': '#84cc16',
  'Natural Organic Material': '#a16207',
  'Ship': '#f97316',
  'Clouds': '#d1d5db',
  'Marine Water': '#1e40af',
  'Sediment-Laden Water': '#eab308',
  'Foam': '#a855f7',
  'Turbid Water': '#bab68a',
  'Shallow Water': '#0891b2',
  'Waves': '#f5f5dc',
  'Cloud Shadows': '#6b7280',
  'Wakes': '#fde047',
  'Mixed Water': '#bc8f8f',
};

export default function MaridaMapView() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const filteredData = selectedClass 
    ? marineDebrisData.filter(point => point.class === selectedClass)
    : marineDebrisData;

  const classStats = Object.keys(classColors).map(className => ({
    name: className,
    count: marineDebrisData.filter(point => point.class === className).length,
    color: classColors[className as keyof typeof classColors],
  })).filter(stat => stat.count > 0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ Marine Debris Geographic Distribution</Text>
        <Text style={styles.subtitle}>
          Global distribution of marine debris detection data points from Sentinel-2 satellite imagery
        </Text>
      </View>

      {/* Map Simulation */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Interactive Map View</Text>
        <View style={styles.mapGrid}>
          {/* Grid background representing map */}
          <View style={styles.gridBackground}>
            {Array.from({ length: 8 }).map((_, row) => (
              <View key={row} style={styles.gridRow}>
                {Array.from({ length: 12 }).map((_, col) => (
                  <View key={col} style={styles.gridCell} />
                ))}
              </View>
            ))}
          </View>

          {/* Data points */}
          {filteredData.map((point, index) => {
            const left = 10 + (index % 8) * 10 + Math.random() * 5;
            const top = 15 + Math.floor(index / 8) * 15 + Math.random() * 8;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dataPoint,
                  {
                    left: `${left}%`,
                    top: `${top}%`,
                    backgroundColor: classColors[point.class as keyof typeof classColors],
                  },
                ]}
                onPress={() => setSelectedPoint(point)}
              >
                <View style={styles.pointInner} />
              </TouchableOpacity>
            );
          })}

          {/* Center reference point */}
          <View style={styles.centerPoint}>
            <Text style={styles.centerIcon}>🎯</Text>
          </View>
        </View>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <Text style={styles.controlsTitle}>Map Center: Caribbean Sea</Text>
          <Text style={styles.controlsSubtitle}>Lat: 16.78°N, Lon: -69.48°W</Text>
        </View>
      </View>

      {/* Class Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Class</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedClass && styles.activeFilterChip
            ]}
            onPress={() => setSelectedClass(null)}
          >
            <Text style={[
              styles.filterChipText,
              !selectedClass && styles.activeFilterChipText
            ]}>
              All Classes
            </Text>
          </TouchableOpacity>
          {classStats.map((stat) => (
            <TouchableOpacity
              key={stat.name}
              style={[
                styles.filterChip,
                selectedClass === stat.name && styles.activeFilterChip,
                { borderColor: stat.color }
              ]}
              onPress={() => setSelectedClass(stat.name)}
            >
              <View style={[styles.filterColorDot, { backgroundColor: stat.color }]} />
              <Text style={[
                styles.filterChipText,
                selectedClass === stat.name && styles.activeFilterChipText
              ]}>
                {stat.name} ({stat.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Selected Point Details */}
      {selectedPoint && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>📍 Selected Data Point</Text>
          <View style={styles.detailsContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Class:</Text>
              <View style={styles.detailValue}>
                <View style={[
                  styles.classColorDot,
                  { backgroundColor: classColors[selectedPoint.class as keyof typeof classColors] }
                ]} />
                <Text style={styles.detailText}>{selectedPoint.class}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailText}>{selectedPoint.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coordinates:</Text>
              <Text style={styles.detailText}>
                {selectedPoint.lat.toFixed(2)}°N, {Math.abs(selectedPoint.lon).toFixed(2)}°W
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Confidence:</Text>
              <Text style={styles.detailText}>{selectedPoint.confidence}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPoint(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Statistics Summary */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Dataset Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{marineDebrisData.length}</Text>
            <Text style={styles.statLabel}>Total Data Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{classStats.length}</Text>
            <Text style={styles.statLabel}>Unique Classes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>High Confidence</Text>
          </View>
        </View>
      </View>

      {/* Class Distribution */}
      <View style={styles.distributionContainer}>
        <Text style={styles.distributionTitle}>Class Distribution</Text>
        {classStats.map((stat) => {
          const percentage = ((stat.count / marineDebrisData.length) * 100).toFixed(1);
          return (
            <View key={stat.name} style={styles.distributionRow}>
              <View style={styles.distributionLabel}>
                <View style={[styles.distributionColor, { backgroundColor: stat.color }]} />
                <Text style={styles.distributionName}>{stat.name}</Text>
              </View>
              <View style={styles.distributionBar}>
                <View
                  style={[
                    styles.distributionFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: stat.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.distributionValue}>{stat.count} ({percentage}%)</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e293b',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  mapContainer: {
    margin: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 12,
    textAlign: 'center',
  },
  mapGrid: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    position: 'relative',
    height: 200,
    marginBottom: 12,
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
    borderColor: '#334155',
    margin: 0.5,
  },
  dataPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  centerPoint: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  centerIcon: {
    fontSize: 10,
  },
  mapControls: {
    alignItems: 'center',
  },
  controlsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  controlsSubtitle: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterChip: {
    backgroundColor: '#10b981',
    borderColor: '#059669',
  },
  filterColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  activeFilterChipText: {
    color: '#fff',
    fontWeight: '600',
  },
  detailsContainer: {
    margin: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 12,
  },
  detailsContent: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cbd5e1',
    width: 100,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  classColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#f1f5f9',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  statsContainer: {
    margin: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 4,
  },
  distributionContainer: {
    margin: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distributionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  distributionColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  distributionName: {
    fontSize: 11,
    color: '#cbd5e1',
    flex: 1,
  },
  distributionBar: {
    flex: 1,
    height: 16,
    backgroundColor: '#334155',
    borderRadius: 8,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 8,
  },
  distributionValue: {
    fontSize: 11,
    color: '#f1f5f9',
    width: 60,
    textAlign: 'right',
  },
});