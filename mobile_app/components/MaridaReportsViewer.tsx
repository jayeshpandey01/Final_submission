import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MaridaMapView from './MaridaMapView';
import MaridaEDAView from './MaridaEDAView';
import MaridaSignaturesView from './MaridaSignaturesView';
import MaridaEmbeddingView from './MaridaEmbeddingView';
import MaridaPatchesView from './MaridaPatchesView';

interface MaridaReportsViewerProps {
  initialReport?: 'map' | 'eda' | 'signatures' | 'embedding' | 'patches';
}

const { width } = Dimensions.get('window');

export default function MaridaReportsViewer({ initialReport = 'map' }: MaridaReportsViewerProps) {
  const [activeReport, setActiveReport] = useState(initialReport);

  const reports = [
    {
      id: 'map',
      title: 'Geographic Map',
      icon: '🗺️',
      description: 'Global distribution of marine debris data points',
      component: MaridaMapView,
    },
    {
      id: 'eda',
      title: 'Data Analysis',
      icon: '📊',
      description: 'Exploratory data analysis and class distributions',
      component: MaridaEDAView,
    },
    {
      id: 'signatures',
      title: 'Spectral Signatures',
      icon: '📈',
      description: 'Analysis of spectral characteristics across bands',
      component: MaridaSignaturesView,
    },
    {
      id: 'embedding',
      title: '2D Embedding',
      icon: '🔍',
      description: 'Spectral signatures embedded in 2D space',
      component: MaridaEmbeddingView,
    },
    {
      id: 'patches',
      title: 'Patch Statistics',
      icon: '📋',
      description: 'Dataset statistics and train/validation/test splits',
      component: MaridaPatchesView,
    },
  ];

  const activeReportData = reports.find(r => r.id === activeReport);
  const ActiveComponent = activeReportData?.component;

  return (
    <View style={styles.container}>
      {/* Report Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.navContainer}
        contentContainerStyle={styles.navContent}
      >
        {reports.map((report) => (
          <TouchableOpacity
            key={report.id}
            style={[
              styles.navItem,
              activeReport === report.id && styles.activeNavItem
            ]}
            onPress={() => setActiveReport(report.id as any)}
          >
            <Text style={styles.navIcon}>{report.icon}</Text>
            <Text style={[
              styles.navTitle,
              activeReport === report.id && styles.activeNavTitle
            ]}>
              {report.title}
            </Text>
            <Text style={[
              styles.navDescription,
              activeReport === report.id && styles.activeNavDescription
            ]}>
              {report.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active Report Content */}
      <View style={styles.contentContainer}>
        {ActiveComponent && <ActiveComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  navContainer: {
    backgroundColor: '#1e293b',
    paddingVertical: 12,
  },
  navContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  navItem: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    minWidth: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeNavItem: {
    backgroundColor: '#10b981',
    borderColor: '#059669',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 4,
  },
  activeNavTitle: {
    color: '#fff',
  },
  navDescription: {
    fontSize: 10,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 14,
  },
  activeNavDescription: {
    color: '#ecfdf5',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});