import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomePage from './screens/WelcomePage';
import Dashboard from './screens/Dashboard';
import MaridaDataset from './screens/MaridaDataset';
import CarbonCalculator from './screens/CarbonCalculator';
import BottomTabNavigation from './components/BottomTabNavigation';

type Screen = 'welcome' | 'dashboard' | 'marida' | 'calculator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleTabPress = (tab: string) => {
    setCurrentScreen(tab as Screen);
  };

  const handleGetStarted = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomePage 
            onGetStarted={handleGetStarted}
            onNavigateToMarida={() => setCurrentScreen('marida')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            onLogout={handleLogout}
            onNavigateToMarida={() => setCurrentScreen('marida')}
            onNavigateToCalculator={() => setCurrentScreen('calculator')}
          />
        );
      case 'marida':
        return <MaridaDataset onBack={() => setCurrentScreen('dashboard')} />;
      case 'calculator':
        return <CarbonCalculator onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return (
          <WelcomePage 
            onGetStarted={handleGetStarted}
            onNavigateToMarida={() => setCurrentScreen('marida')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderCurrentScreen()}
      </View>
      {currentScreen !== 'welcome' && (
        <BottomTabNavigation 
          activeTab={currentScreen} 
          onTabPress={handleTabPress} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
});
