import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface WelcomePageProps {
  onGetStarted?: () => void;
  onNavigateToMarida?: () => void;
}

export default function WelcomePage({ onGetStarted, onNavigateToMarida }: WelcomePageProps) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>SawtchEarth</Text>
        <Text style={styles.subtitle}>Environmental Monitoring & Analysis</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>🌍</Text>
        <Text style={styles.heroTitle}>Make a Difference</Text>
        <Text style={styles.heroDescription}>
          Monitor and analyze environmental data to understand and reduce your impact on Earth.
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>What You Can Do</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureTitle}>Track Activities</Text>
          <Text style={styles.featureDescription}>
            Log your daily activities and see how they impact the environment
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💡</Text>
          <Text style={styles.featureTitle}>Get Insights</Text>
          <Text style={styles.featureDescription}>
            Receive personalized recommendations to reduce your environmental impact
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎯</Text>
          <Text style={styles.featureTitle}>Set Goals</Text>
          <Text style={styles.featureDescription}>
            Create and track sustainability goals to make lasting changes
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🌱</Text>
          <Text style={styles.featureTitle}>Learn & Grow</Text>
          <Text style={styles.featureDescription}>
            Access educational resources about environmental sustainability
          </Text>
        </View>
      </View>

      {/* MARIDA Dataset Section */}
      <View style={styles.maridaSection}>
        <Text style={styles.sectionTitle}>Marine Research Data</Text>
        
        <View style={styles.maridaCard}>
          <Text style={styles.maridaIcon}>🛰️</Text>
          <Text style={styles.maridaTitle}>MARIDA Dataset</Text>
          <Text style={styles.maridaSubtitle}>Marine Debris Archive for Deep Learning</Text>
          <Text style={styles.maridaDescription}>
            Explore satellite-based marine debris detection data for environmental research and conservation efforts.
          </Text>
          
          <View style={styles.maridaStats}>
            <View style={styles.maridaStat}>
              <Text style={styles.maridaStatValue}>15</Text>
              <Text style={styles.maridaStatLabel}>Categories</Text>
            </View>
            <View style={styles.maridaStat}>
              <Text style={styles.maridaStatValue}>2,597</Text>
              <Text style={styles.maridaStatLabel}>Patches</Text>
            </View>
            <View style={styles.maridaStat}>
              <Text style={styles.maridaStatValue}>11</Text>
              <Text style={styles.maridaStatLabel}>Bands</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.maridaButton}
            onPress={onNavigateToMarida}
          >
            <Text style={styles.maridaButtonText}>Explore Dataset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={onGetStarted}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={onNavigateToMarida}
        >
          <Text style={styles.secondaryButtonText}>Explore Research Data</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Together, we can create a sustainable future
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
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10b981',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    fontWeight: '500',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 80,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10b981',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  maridaSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  maridaCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  maridaIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  maridaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  maridaSubtitle: {
    fontSize: 14,
    color: '#10b981',
    marginBottom: 12,
    fontWeight: '600',
  },
  maridaDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  maridaStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  maridaStat: {
    alignItems: 'center',
  },
  maridaStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  maridaStatLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
  },
  maridaButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  maridaButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
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
  },
});
