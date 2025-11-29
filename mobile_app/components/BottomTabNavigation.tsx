import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

interface BottomTabNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = [
  { id: 'welcome', icon: '🏠', label: 'Home' },
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'calculator', icon: '🧮', label: 'Calculator' },
  { id: 'marida', icon: '🛰️', label: 'Research' },
];

export default function BottomTabNavigation({ activeTab, onTabPress }: BottomTabNavigationProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === tab.id && styles.activeIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.label, activeTab === tab.id && styles.activeLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    paddingBottom: 34, // Safe area for iPhone
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#10b981',
    fontWeight: '600',
  },
});