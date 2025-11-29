import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { VictoryChart, VictoryBar, VictoryPie, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';

interface CarbonData {
  travel: number;
  energy: number;
  waste: number;
  diet: number;
  total: number;
}

interface CarbonChartProps {
  data: CarbonData;
  type?: 'pie' | 'bar';
}

const { width } = Dimensions.get('window');

export default function CarbonChart({ data, type = 'bar' }: CarbonChartProps) {
  const chartData = [
    { category: 'Travel', value: data.travel, y: data.travel, x: 'Travel', color: '#10b981', icon: '🚗' },
    { category: 'Energy', value: data.energy, y: data.energy, x: 'Energy', color: '#f59e0b', icon: '⚡' },
    { category: 'Waste', value: data.waste, y: data.waste, x: 'Waste', color: '#ef4444', icon: '🗑️' },
    { category: 'Diet', value: data.diet, y: data.diet, x: 'Diet', color: '#8b5cf6', icon: '🍽️' },
  ];

  const pieData = chartData.map((item, index) => ({
    ...item,
    y: item.value,
    label: `${item.category}\n${((item.value / data.total) * 100).toFixed(1)}%`,
  }));

  if (type === 'pie') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carbon Emissions Distribution</Text>
        
        <View style={styles.chartContainer}>
          <VictoryPie
            data={pieData}
            width={width - 80}
            height={220}
            innerRadius={40}
            colorScale={chartData.map(item => item.color)}
            labelComponent={<VictoryLabel style={{ fontSize: 10, fill: '#f1f5f9' }} />}
            theme={VictoryTheme.material}
          />
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{data.total.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total kg CO₂e</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{Math.round(data.total / 411.4)}</Text>
            <Text style={styles.summaryLabel}>Trees to Plant</Text>
          </View>
        </View>

        {/* Legend */}
        <ScrollView style={styles.legendContainer} showsVerticalScrollIndicator={false}>
          {chartData.map((item, index) => {
            const percentage = ((item.value / data.total) * 100).toFixed(1);
            return (
              <View key={index} style={styles.legendItem}>
                <Text style={styles.legendIcon}>{item.icon}</Text>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <View style={styles.legendInfo}>
                  <Text style={styles.legendText}>{item.category}</Text>
                  <Text style={styles.legendValue}>{item.value} kg ({percentage}%)</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carbon Emissions Breakdown</Text>
      
      <View style={styles.chartContainer}>
        <VictoryChart
          width={width - 80}
          height={220}
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          padding={{ left: 60, top: 20, right: 40, bottom: 60 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}`}
            style={{
              axis: { stroke: '#64748b' },
              tickLabels: { fontSize: 10, fill: '#cbd5e1' },
              grid: { stroke: '#374151', strokeWidth: 0.5 }
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: '#64748b' },
              tickLabels: { fontSize: 10, fill: '#cbd5e1', angle: -45 }
            }}
          />
          <VictoryBar
            data={chartData}
            x="category"
            y="value"
            style={{
              data: { 
                fill: ({ datum }) => datum.color,
                stroke: ({ datum }) => datum.color,
                strokeWidth: 2
              }
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
          />
        </VictoryChart>
      </View>

      {/* Category Details */}
      <View style={styles.detailsContainer}>
        {chartData.map((item, index) => {
          const percentage = ((item.value / data.total) * 100).toFixed(1);
          return (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailIcon}>{item.icon}</Text>
              <View style={styles.detailInfo}>
                <Text style={styles.detailCategory}>{item.category}</Text>
                <Text style={styles.detailValue}>{item.value} kg CO₂e</Text>
                <Text style={styles.detailPercentage}>{percentage}% of total</Text>
              </View>
              <View style={[styles.detailBar, { backgroundColor: item.color, width: `${percentage}%` }]} />
            </View>
          );
        })}
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>💡 Reduction Tips</Text>
        <View style={styles.recommendationsList}>
          <Text style={styles.recommendationItem}>🚴 Use public transport or bike</Text>
          <Text style={styles.recommendationItem}>💡 Switch to LED bulbs</Text>
          <Text style={styles.recommendationItem}>♻️ Reduce, reuse, recycle</Text>
          <Text style={styles.recommendationItem}>🥗 Eat more plant-based meals</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
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
    fontSize: 10,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 4,
  },
  legendContainer: {
    maxHeight: 120,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 6,
    padding: 8,
    marginBottom: 4,
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendInfo: {
    flex: 1,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  legendValue: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  detailIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  detailInfo: {
    flex: 1,
  },
  detailCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  detailValue: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  detailPercentage: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  detailBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    opacity: 0.3,
  },
  recommendationsContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  recommendationsList: {
    gap: 4,
  },
  recommendationItem: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 16,
  },
});