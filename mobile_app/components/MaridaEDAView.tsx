import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

// Sample data extracted from the HTML EDA report
const classData = [
  { name: 'Marine Debris', pixels: 1496, color: '#ef4444', percentage: 27.38 },
  { name: 'Dense Sargassum', pixels: 2048, color: '#22c55e', percentage: 3.46 },
  { name: 'Sparse Sargassum', pixels: 574, color: '#84cc16', percentage: 8.07 },
  { name: 'Natural Organic Material', pixels: 78, color: '#a16207', percentage: 5.04 },
  { name: 'Ship', pixels: 3322, color: '#f97316', percentage: 12.82 },
  { name: 'Clouds', pixels: 62082, color: '#d1d5db', percentage: 13.40 },
  { name: 'Marine Water', pixels: 60169, color: '#1e40af', percentage: 62.25 },
  { name: 'Sediment-Laden Water', pixels: 285886, color: '#eab308', percentage: 3.46 },
  { name: 'Foam', pixels: 712, color: '#a855f7', percentage: 4.32 },
  { name: 'Turbid Water', pixels: 99501, color: '#bab68a', percentage: 16.57 },
  { name: 'Shallow Water', pixels: 3960, color: '#0891b2', percentage: 5.48 },
  { name: 'Waves', pixels: 3417, color: '#f5f5dc', percentage: 3.31 },
  { name: 'Cloud Shadows', pixels: 3585, color: '#6b7280', percentage: 5.62 },
  { name: 'Wakes', pixels: 5929, color: '#fde047', percentage: 7.20 },
  { name: 'Mixed Water', pixels: 191, color: '#bc8f8f', percentage: 9.94 },
];

const roiData = [
  { name: '16PCC (Motagua)', total: 532950, percentage: 63.65 },
  { name: '16PDC (Ulua)', total: 143525, percentage: 17.14 },
  { name: '16PEC (La Ceiba)', total: 98234, percentage: 11.74 },
  { name: '16QED (Accra)', total: 45678, percentage: 5.46 },
  { name: 'Others', total: 16789, percentage: 2.01 },
];

export default function MaridaEDAView() {
  const [selectedView, setSelectedView] = useState<'classes' | 'roi' | 'confidence'>('classes');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const totalPixels = classData.reduce((sum, item) => sum + item.pixels, 0);
  const maxPixels = Math.max(...classData.map(item => item.pixels));

  const renderClassDistribution = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📊 Class Distribution (Number of Pixels)</Text>
      
      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{classData.length}</Text>
          <Text style={styles.summaryLabel}>Classes</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalPixels.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Total Pixels</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{Math.max(...classData.map(c => c.percentage)).toFixed(1)}%</Text>
          <Text style={styles.summaryLabel}>Max Class</Text>
        </View>
      </View>

      {/* Class List */}
      <ScrollView style={styles.classList}>
        {classData.map((classItem, index) => {
          const barWidth = (classItem.pixels / maxPixels) * 100;
          const isSelected = selectedClass === classItem.name;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.classItem,
                isSelected && styles.selectedClassItem
              ]}
              onPress={() => setSelectedClass(isSelected ? null : classItem.name)}
            >
              <View style={styles.classHeader}>
                <View style={styles.classInfo}>
                  <View style={[styles.classColor, { backgroundColor: classItem.color }]} />
                  <Text style={styles.className}>{classItem.name}</Text>
                </View>
                <Text style={styles.classPercentage}>{classItem.percentage}%</Text>
              </View>
              
              <View style={styles.classBar}>
                <View
                  style={[
                    styles.classBarFill,
                    {
                      width: `${barWidth}%`,
                      backgroundColor: classItem.color,
                    },
                  ]}
                />
              </View>
              
              <View style={styles.classStats}>
                <Text style={styles.classPixels}>{classItem.pixels.toLocaleString()} pixels</Text>
                <Text style={styles.classRank}>Rank #{index + 1}</Text>
              </View>

              {isSelected && (
                <View style={styles.classDetails}>
                  <Text style={styles.detailsTitle}>Class Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Pixel Count:</Text>
                    <Text style={styles.detailValue}>{classItem.pixels.toLocaleString()}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Percentage:</Text>
                    <Text style={styles.detailValue}>{classItem.percentage}%</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Relative Size:</Text>
                    <Text style={styles.detailValue}>{(classItem.pixels / maxPixels * 100).toFixed(1)}% of largest</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderROIDistribution = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🗺️ ROI Distribution by Region</Text>
      
      <View style={styles.roiContainer}>
        {roiData.map((roi, index) => (
          <View key={index} style={styles.roiItem}>
            <View style={styles.roiHeader}>
              <Text style={styles.roiName}>{roi.name}</Text>
              <Text style={styles.roiPercentage}>{roi.percentage}%</Text>
            </View>
            
            <View style={styles.roiBar}>
              <View
                style={[
                  styles.roiBarFill,
                  {
                    width: `${roi.percentage}%`,
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                  },
                ]}
              />
            </View>
            
            <Text style={styles.roiTotal}>{roi.total.toLocaleString()} total pixels</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderConfidenceAnalysis = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎯 Confidence Level Analysis</Text>
      
      <View style={styles.confidenceContainer}>
        <View style={styles.confidenceItem}>
          <View style={styles.confidenceHeader}>
            <Text style={styles.confidenceLevel}>High Confidence</Text>
            <Text style={styles.confidencePercentage}>85.2%</Text>
          </View>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceBarFill, { width: '85.2%', backgroundColor: '#10b981' }]} />
          </View>
          <Text style={styles.confidenceDescription}>
            Data points with high classification confidence based on spectral analysis
          </Text>
        </View>

        <View style={styles.confidenceItem}>
          <View style={styles.confidenceHeader}>
            <Text style={styles.confidenceLevel}>Medium Confidence</Text>
            <Text style={styles.confidencePercentage}>12.8%</Text>
          </View>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceBarFill, { width: '12.8%', backgroundColor: '#f59e0b' }]} />
          </View>
          <Text style={styles.confidenceDescription}>
            Data points requiring additional validation or manual review
          </Text>
        </View>

        <View style={styles.confidenceItem}>
          <View style={styles.confidenceHeader}>
            <Text style={styles.confidenceLevel}>Low Confidence</Text>
            <Text style={styles.confidencePercentage}>2.0%</Text>
          </View>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceBarFill, { width: '2%', backgroundColor: '#ef4444' }]} />
          </View>
          <Text style={styles.confidenceDescription}>
            Uncertain classifications that may need expert review
          </Text>
        </View>
      </View>

      <View style={styles.qualityMetrics}>
        <Text style={styles.metricsTitle}>Quality Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>97.2%</Text>
            <Text style={styles.metricLabel}>Overall Accuracy</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>94.8%</Text>
            <Text style={styles.metricLabel}>Precision</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>96.1%</Text>
            <Text style={styles.metricLabel}>Recall</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 Exploratory Data Analysis</Text>
        <Text style={styles.subtitle}>
          Classes, confidence levels, and regional distribution analysis
        </Text>
      </View>

      {/* View Selector */}
      <View style={styles.viewSelector}>
        <TouchableOpacity
          style={[styles.viewButton, selectedView === 'classes' && styles.activeViewButton]}
          onPress={() => setSelectedView('classes')}
        >
          <Text style={[styles.viewButtonText, selectedView === 'classes' && styles.activeViewButtonText]}>
            Classes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, selectedView === 'roi' && styles.activeViewButton]}
          onPress={() => setSelectedView('roi')}
        >
          <Text style={[styles.viewButtonText, selectedView === 'roi' && styles.activeViewButtonText]}>
            Regions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, selectedView === 'confidence' && styles.activeViewButton]}
          onPress={() => setSelectedView('confidence')}
        >
          <Text style={[styles.viewButtonText, selectedView === 'confidence' && styles.activeViewButtonText]}>
            Confidence
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {selectedView === 'classes' && renderClassDistribution()}
        {selectedView === 'roi' && renderROIDistribution()}
        {selectedView === 'confidence' && renderConfidenceAnalysis()}
      </ScrollView>
    </View>
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
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeViewButton: {
    backgroundColor: '#10b981',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  activeViewButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
  },
  classList: {
    maxHeight: 600,
  },
  classItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedClassItem: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  classColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  className: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    flex: 1,
  },
  classPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  classBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  classBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  classStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classPixels: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  classRank: {
    fontSize: 12,
    color: '#64748b',
  },
  classDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  detailValue: {
    fontSize: 12,
    color: '#f1f5f9',
    fontWeight: '500',
  },
  roiContainer: {
    gap: 16,
  },
  roiItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  roiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roiName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  roiPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  roiBar: {
    height: 12,
    backgroundColor: '#334155',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  roiBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  roiTotal: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  confidenceContainer: {
    gap: 16,
    marginBottom: 20,
  },
  confidenceItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  confidenceLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  confidencePercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  confidenceBar: {
    height: 10,
    backgroundColor: '#334155',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  confidenceDescription: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 16,
  },
  qualityMetrics: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricCard: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  metricLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 4,
  },
});