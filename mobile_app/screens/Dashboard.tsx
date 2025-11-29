import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CarbonChart from '../components/CarbonChart';
import WorldMap from '../components/WorldMap';

interface DashboardProps {
  onLogout?: () => void;
  onNavigateToMarida?: () => void;
  onNavigateToCalculator?: () => void;
}

interface CarbonData {
  travel: number;
  energy: number;
  waste: number;
  diet: number;
  total: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function Dashboard({ onLogout, onNavigateToMarida, onNavigateToCalculator }: DashboardProps) {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    travel: 0,
    energy: 0,
    waste: 0,
    diet: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi! I'm your SawtchEarth Assistant. Ask me anything about reducing your environmental impact!",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchCarbonData();
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatMessages]);

  const fetchCarbonData = async () => {
    try {
      // Enhanced mock data with more realistic variations
      const mockData: CarbonData = {
        travel: 2500 + Math.floor(Math.random() * 500 - 250), // ±250 variation
        energy: 1800 + Math.floor(Math.random() * 400 - 200), // ±200 variation
        waste: 900 + Math.floor(Math.random() * 200 - 100),   // ±100 variation
        diet: 1200 + Math.floor(Math.random() * 300 - 150),   // ±150 variation
        total: 0,
      };
      
      mockData.total = mockData.travel + mockData.energy + mockData.waste + mockData.diet;
      
      setCarbonData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching carbon data:', error);
      setLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      // Call the chatbot API
      const response = await fetch('http://10.118.161.3:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatInput }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: data.response,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Unable to connect to the chatbot service. Make sure the backend is running on http://10.118.161.3:5000',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  const treeCount = Math.round(carbonData.total / 411.4);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back!</Text>
          <Text style={styles.subGreeting}>Your Carbon Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Environmental Impact Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Monthly Environmental Impact</Text>
        <Text style={styles.carbonValue}>{carbonData.total.toLocaleString()}</Text>
        <Text style={styles.carbonUnit}>kg CO₂e</Text>
        <Text style={styles.treeInfo}>
          You need to plant {treeCount} tree{treeCount !== 1 ? 's' : ''} to offset this
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'breakdown' && styles.activeTab]}
          onPress={() => setActiveTab('breakdown')}
        >
          <Text style={[styles.tabText, activeTab === 'breakdown' && styles.activeTabText]}>
            Breakdown
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'marida' && styles.activeTab]}
          onPress={() => setActiveTab('marida')}
        >
          <Text style={[styles.tabText, activeTab === 'marida' && styles.activeTabText]}>
            Research
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <View style={styles.tabContent}>
          {/* Map Panel */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>🗺️ Global Carbon Emissions Map</Text>
            <WorldMap width={Dimensions.get('window').width - 80} height={200} />
          </View>

          {/* Quick Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🚗</Text>
              <Text style={styles.statValue}>{carbonData.travel}</Text>
              <Text style={styles.statLabel}>Travel</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statValue}>{carbonData.energy}</Text>
              <Text style={styles.statLabel}>Energy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🗑️</Text>
              <Text style={styles.statValue}>{carbonData.waste}</Text>
              <Text style={styles.statLabel}>Waste</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🍽️</Text>
              <Text style={styles.statValue}>{carbonData.diet}</Text>
              <Text style={styles.statLabel}>Diet</Text>
            </View>
          </View>
        </View>
      )}

      {/* Breakdown Tab */}
      {activeTab === 'breakdown' && (
        <View style={styles.tabContent}>
          {/* Graph Panel */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>📊 Emissions Breakdown</Text>
            <CarbonChart data={carbonData} type="bar" />
          </View>

          {/* Pie Chart Panel */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>🥧 Emissions Distribution</Text>
            <CarbonChart data={carbonData} type="pie" />
          </View>

          {/* Recommendations */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>💡 Recommendations</Text>
            <View style={styles.recommendationItem}>
              <Text style={styles.recIcon}>🚴</Text>
              <View style={styles.recContent}>
                <Text style={styles.recTitle}>Use Public Transport</Text>
                <Text style={styles.recDesc}>
                  Could reduce travel emissions by 40%
                </Text>
              </View>
            </View>
            <View style={styles.recommendationItem}>
              <Text style={styles.recIcon}>💡</Text>
              <View style={styles.recContent}>
                <Text style={styles.recTitle}>Switch to LED Bulbs</Text>
                <Text style={styles.recDesc}>
                  Save 75% on lighting energy costs
                </Text>
              </View>
            </View>
            <View style={styles.recommendationItem}>
              <Text style={styles.recIcon}>🥗</Text>
              <View style={styles.recContent}>
                <Text style={styles.recTitle}>Reduce Meat Consumption</Text>
                <Text style={styles.recDesc}>
                  Could reduce diet emissions by 30%
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <View style={styles.tabContent}>
          {/* Chatbot Panel */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>🤖 Carbon Assistant</Text>
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatContainer}
              showsVerticalScrollIndicator={false}
            >
              {chatMessages.map((msg) => (
                <View key={msg.id} style={styles.chatMessage}>
                  {msg.type === 'bot' ? (
                    <View style={styles.botMessage}>
                      <Text style={styles.botText}>{msg.text}</Text>
                    </View>
                  ) : (
                    <View style={styles.userMessage}>
                      <Text style={styles.userText}>{msg.text}</Text>
                    </View>
                  )}
                </View>
              ))}
              {chatLoading && (
                <View style={styles.chatMessage}>
                  <View style={styles.botMessage}>
                    <ActivityIndicator size="small" color="#10b981" />
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask about carbon reduction..."
                placeholderTextColor="#94a3b8"
                value={chatInput}
                onChangeText={setChatInput}
                editable={!chatLoading}
              />
              <TouchableOpacity
                style={[styles.sendBtn, chatLoading && styles.sendBtnDisabled]}
                onPress={sendChatMessage}
                disabled={chatLoading}
              >
                <Text style={styles.sendBtnText}>{chatLoading ? '...' : 'Send'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* MARIDA Tab */}
      {activeTab === 'marida' && (
        <View style={styles.tabContent}>
          {/* MARIDA Panel */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>🛰️ Marine Research Data</Text>
            <View style={styles.maridaPreview}>
              <Text style={styles.maridaPreviewTitle}>MARIDA Dataset</Text>
              <Text style={styles.maridaPreviewSubtitle}>Marine Debris Archive for Deep Learning</Text>
              <Text style={styles.maridaPreviewDescription}>
                Explore comprehensive satellite-based marine debris detection data for environmental research and conservation.
              </Text>
              
              <View style={styles.maridaQuickStats}>
                <View style={styles.quickStat}>
                  <Text style={styles.quickStatValue}>15</Text>
                  <Text style={styles.quickStatLabel}>Categories</Text>
                </View>
                <View style={styles.quickStat}>
                  <Text style={styles.quickStatValue}>2,597</Text>
                  <Text style={styles.quickStatLabel}>Image Patches</Text>
                </View>
                <View style={styles.quickStat}>
                  <Text style={styles.quickStatValue}>11</Text>
                  <Text style={styles.quickStatLabel}>Spectral Bands</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.exploreBtn}
                onPress={onNavigateToMarida}
              >
                <Text style={styles.exploreBtnText}>Explore Full Dataset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Research Applications */}
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>🔬 Research Applications</Text>
            <View style={styles.applicationItem}>
              <Text style={styles.appIcon}>🌊</Text>
              <View style={styles.appContent}>
                <Text style={styles.appTitle}>Marine Debris Detection</Text>
                <Text style={styles.appDesc}>AI-powered identification of ocean pollution</Text>
              </View>
            </View>
            <View style={styles.applicationItem}>
              <Text style={styles.appIcon}>🌍</Text>
              <View style={styles.appContent}>
                <Text style={styles.appTitle}>Environmental Monitoring</Text>
                <Text style={styles.appDesc}>Track pollution levels and ecosystem health</Text>
              </View>
            </View>
            <View style={styles.applicationItem}>
              <Text style={styles.appIcon}>🏛️</Text>
              <View style={styles.appContent}>
                <Text style={styles.appTitle}>Policy Support</Text>
                <Text style={styles.appDesc}>Data-driven environmental policy decisions</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={onNavigateToCalculator}
        >
          <Text style={styles.actionBtnText}>🧮 Carbon Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={onNavigateToMarida}
        >
          <Text style={styles.actionBtnText}>🛰️ Research Data</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  subGreeting: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    margin: 24,
    backgroundColor: '#10b981',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#ecfdf5',
    marginBottom: 12,
  },
  carbonValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  carbonUnit: {
    fontSize: 14,
    color: '#ecfdf5',
    marginTop: 4,
  },
  treeInfo: {
    fontSize: 12,
    color: '#ecfdf5',
    marginTop: 12,
    fontStyle: 'italic',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeTab: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  panelCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  mapPlaceholder: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
  },
  chartPlaceholder: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 16,
  },
  chartBar: {
    height: 24,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  chartLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  recIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  recDesc: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  chatContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
    marginBottom: 12,
  },
  chatMessage: {
    marginBottom: 12,
  },
  botMessage: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginRight: 40,
  },
  botText: {
    fontSize: 12,
    color: '#f1f5f9',
    lineHeight: 18,
  },
  userMessage: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 12,
    marginLeft: 40,
  },
  userText: {
    fontSize: 12,
    color: '#fff',
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#f1f5f9',
  },
  chatInputText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  sendBtn: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#059669',
    opacity: 0.7,
  },
  sendBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  maridaPreview: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  maridaPreviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  maridaPreviewSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  maridaPreviewDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  maridaQuickStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  quickStatLabel: {
    fontSize: 10,
    color: '#cbd5e1',
    marginTop: 2,
  },
  exploreBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  exploreBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  applicationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  appIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appContent: {
    flex: 1,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 2,
  },
  appDesc: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});
