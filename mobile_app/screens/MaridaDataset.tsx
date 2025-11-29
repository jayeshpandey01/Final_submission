import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MaridaVisualization from '../components/MaridaVisualization';

interface MaridaDatasetProps {
  onBack?: () => void;
}

interface DatasetSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  stats: string;
}

const { width } = Dimensions.get('window');

export default function MaridaDataset({ onBack }: MaridaDatasetProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const sections: DatasetSection[] = [
    {
      id: 'overview',
      title: 'Geographic Distribution',
      icon: '🗺️',
      description: 'Interactive map showing global distribution of marine debris data points from Sentinel-2 satellite imagery.',
      stats: 'Global Coverage'
    },
    {
      id: 'analysis',
      title: 'Data Analysis',
      icon: '📊',
      description: 'Statistical analysis of class distributions and data composition for machine learning applications.',
      stats: '15 Categories'
    },
    {
      id: 'signatures',
      title: 'Spectral Signatures',
      icon: '📈',
      description: 'Analysis of unique spectral characteristics across different material types and environmental features.',
      stats: '11 Spectral Bands'
    },
    {
      id: 'visualization',
      title: 'Data Visualization',
      icon: '🔍',
      description: '2D visualization of high-dimensional spectral data using dimensionality reduction techniques.',
      stats: 'Pattern Recognition'
    },
    {
      id: 'statistics',
      title: 'Dataset Statistics',
      icon: '📋',
      description: 'Comprehensive statistics on dataset composition and train/validation/test splits.',
      stats: '2,597 Patches'
    }
  ];

  const datasetStats = [
    { label: 'Categories', value: '15', icon: '🏷️' },
    { label: 'Image Patches', value: '2,597', icon: '🖼️' },
    { label: 'Spectral Bands', value: '11', icon: '🌈' },
    { label: 'Resolution', value: '10m', icon: '🛰️' }
  ];

  const features = [
    {
      icon: '🛰️',
      title: 'Satellite Data',
      description: 'High-resolution Sentinel-2 imagery with 10m spatial resolution for precise environmental monitoring'
    },
    {
      icon: '🤖',
      title: 'ML Ready',
      description: 'Pre-processed dataset optimized for deep learning applications in marine debris detection'
    },
    {
      icon: '📊',
      title: 'Comprehensive Analysis',
      description: '15 categories, 2,597 image patches, and detailed statistical analysis for researchers'
    }
  ];

  const applications = [
    {
      icon: '🌊',
      title: 'Marine Debris Detection',
      description: 'Automated identification of plastic waste and debris in ocean environments'
    },
    {
      icon: '🌍',
      title: 'Environmental Monitoring',
      description: 'Track pollution levels and environmental changes over time'
    },
    {
      icon: '🔬',
      title: 'Research Applications',
      description: 'Support scientific research in oceanography and environmental science'
    },
    {
      icon: '🏛️',
      title: 'Policy Making',
      description: 'Provide data-driven insights for environmental policy decisions'
    }
  ];

  const renderSectionContent = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;

    return (
      <View style={styles.sectionContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>{section.icon}</Text>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
        
        <Text style={styles.sectionDescription}>{section.description}</Text>
        
        {/* Interactive visualization */}
        <MaridaVisualization type={activeSection as any} />

        {/* Key Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Key Insights</Text>
          {activeSection === 'overview' && (
            <>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🌍</Text>
                <Text style={styles.insightText}>Global distribution across multiple marine ecosystems</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📍</Text>
                <Text style={styles.insightText}>Precise geographic coordinates for each labeled instance</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🛰️</Text>
                <Text style={styles.insightText}>High-resolution Sentinel-2 imagery with 10m spatial resolution</Text>
              </View>
            </>
          )}
          {activeSection === 'analysis' && (
            <>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🏷️</Text>
                <Text style={styles.insightText}>15 distinct categories including debris, sargassum, and water types</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📈</Text>
                <Text style={styles.insightText}>Detailed pixel distributions across geographic regions</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🔍</Text>
                <Text style={styles.insightText}>Quality metrics and confidence analysis for model training</Text>
              </View>
            </>
          )}
          {activeSection === 'signatures' && (
            <>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🌈</Text>
                <Text style={styles.insightText}>Analysis across 11 Sentinel-2 spectral bands</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📊</Text>
                <Text style={styles.insightText}>Distinctive reflectance patterns for material classification</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🤖</Text>
                <Text style={styles.insightText}>Optimized for machine learning classification models</Text>
              </View>
            </>
          )}
          {activeSection === 'visualization' && (
            <>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🗺️</Text>
                <Text style={styles.insightText}>Complex spectral relationships visualized in 2D space</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🔍</Text>
                <Text style={styles.insightText}>Clustering analysis and class separability assessment</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📊</Text>
                <Text style={styles.insightText}>Visual exploration of spectral similarities and differences</Text>
              </View>
            </>
          )}
          {activeSection === 'statistics' && (
            <>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>🎯</Text>
                <Text style={styles.insightText}>256×256 pixel patches optimized for deep learning</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📊</Text>
                <Text style={styles.insightText}>Balanced train/validation/test splits for robust evaluation</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>📈</Text>
                <Text style={styles.insightText}>Comprehensive patch counts and distribution analysis</Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MARIDA Dataset</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroIcon}>🛰️</Text>
        <Text style={styles.heroTitle}>Marine Debris Archive</Text>
        <Text style={styles.heroSubtitle}>for Deep Learning</Text>
        <Text style={styles.heroDescription}>
          Satellite-based dataset for marine debris detection and environmental monitoring using advanced machine learning techniques.
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Dataset Overview</Text>
        <View style={styles.statsGrid}>
          {datasetStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionHeaderText}>Key Features</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Section Navigation */}
      <View style={styles.navigationSection}>
        <Text style={styles.sectionHeaderText}>Explore Sections</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.navCard,
                activeSection === section.id && styles.activeNavCard
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <Text style={styles.navIcon}>{section.icon}</Text>
              <Text style={[
                styles.navTitle,
                activeSection === section.id && styles.activeNavTitle
              ]}>
                {section.title}
              </Text>
              <Text style={[
                styles.navStats,
                activeSection === section.id && styles.activeNavStats
              ]}>
                {section.stats}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Section Content */}
      {renderSectionContent()}

      {/* Applications Section */}
      <View style={styles.applicationsSection}>
        <Text style={styles.sectionHeaderText}>Applications</Text>
        <View style={styles.applicationsGrid}>
          {applications.map((app, index) => (
            <View key={index} style={styles.applicationCard}>
              <Text style={styles.applicationIcon}>{app.icon}</Text>
              <Text style={styles.applicationTitle}>{app.title}</Text>
              <Text style={styles.applicationDescription}>{app.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Technical Specs */}
      <View style={styles.specsSection}>
        <Text style={styles.sectionHeaderText}>Technical Specifications</Text>
        <View style={styles.specCard}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Data Source</Text>
            <Text style={styles.specValue}>Sentinel-2 Satellite</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Spatial Resolution</Text>
            <Text style={styles.specValue}>10m per pixel</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Patch Size</Text>
            <Text style={styles.specValue}>256 × 256 pixels</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Format</Text>
            <Text style={styles.specValue}>ML-ready preprocessing</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Coverage</Text>
            <Text style={styles.specValue}>Global marine environments</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Supporting marine conservation through advanced satellite data analysis
        </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#1e293b',
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  placeholder: {
    width: 60,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  heroIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#10b981',
    marginBottom: 16,
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width - 40,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 4,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  navigationSection: {
    paddingVertical: 20,
  },
  navScroll: {
    paddingLeft: 20,
  },
  navCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeNavCard: {
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
  navStats: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  activeNavStats: {
    color: '#ecfdf5',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
    marginBottom: 20,
  },
  visualizationPlaceholder: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  insightsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  applicationsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  applicationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  applicationCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  applicationIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  applicationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  applicationDescription: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 16,
  },
  specsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  specCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  specLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});