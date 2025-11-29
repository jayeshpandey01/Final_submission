import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { VictoryChart, VictoryBar, VictoryPie, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter } from 'victory-native';
import WorldMap from './WorldMap';

interface MaridaVisualizationProps {
  type: 'overview' | 'analysis' | 'signatures' | 'visualization' | 'statistics';
}

const { width } = Dimensions.get('window');

export default function MaridaVisualization({ type }: MaridaVisualizationProps) {
  const getVisualizationData = () => {
    switch (type) {
      case 'overview':
        return {
          title: 'Global Marine Debris Distribution',
          data: [
            { ocean: 'Pacific', patches: 680, x: 'Pacific', y: 680 },
            { ocean: 'Atlantic', patches: 450, x: 'Atlantic', y: 450 },
            { ocean: 'Indian', patches: 320, x: 'Indian', y: 320 },
            { ocean: 'Southern', patches: 280, x: 'Southern', y: 280 },
            { ocean: 'Arctic', patches: 120, x: 'Arctic', y: 120 },
          ],
          colors: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'],
        };

      case 'analysis':
        return {
          title: 'MARIDA Dataset Class Distribution',
          data: [
            { category: 'Marine Debris', count: 520, x: 'Marine Debris', y: 520 },
            { category: 'Dense Sargassum', count: 380, x: 'Dense Sargassum', y: 380 },
            { category: 'Sparse Sargassum', count: 290, x: 'Sparse Sargassum', y: 290 },
            { category: 'Natural Organic', count: 240, x: 'Natural Organic', y: 240 },
            { category: 'Ship', count: 180, x: 'Ship', y: 180 },
            { category: 'Clouds', count: 350, x: 'Clouds', y: 350 },
            { category: 'Marine Water', count: 637, x: 'Marine Water', y: 637 },
          ],
          colors: ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#3b82f6', '#64748b', '#06b6d4'],
        };

      case 'signatures':
        return {
          title: 'Spectral Signatures Analysis',
          data: [
            // Marine Debris signature
            { band: 'B1', debris: 0.08, sargassum: 0.06, water: 0.04, x: 1 },
            { band: 'B2', debris: 0.12, sargassum: 0.09, water: 0.06, x: 2 },
            { band: 'B3', debris: 0.15, sargassum: 0.11, water: 0.08, x: 3 },
            { band: 'B4', debris: 0.18, sargassum: 0.14, water: 0.10, x: 4 },
            { band: 'B5', debris: 0.25, sargassum: 0.20, water: 0.15, x: 5 },
            { band: 'B6', debris: 0.32, sargassum: 0.28, water: 0.22, x: 6 },
            { band: 'B7', debris: 0.28, sargassum: 0.35, water: 0.18, x: 7 },
            { band: 'B8', debris: 0.35, sargassum: 0.42, water: 0.25, x: 8 },
            { band: 'B8A', debris: 0.38, sargassum: 0.45, water: 0.28, x: 9 },
            { band: 'B11', debris: 0.22, sargassum: 0.38, water: 0.20, x: 10 },
            { band: 'B12', debris: 0.18, sargassum: 0.32, water: 0.16, x: 11 },
          ],
        };

      case 'visualization':
        return {
          title: '2D Embedding Visualization',
          data: [
            // Simulated t-SNE/UMAP embedding results
            { cluster: 'Water', x: -2.5, y: 1.2, size: 150 },
            { cluster: 'Debris', x: 1.8, y: -1.5, size: 120 },
            { cluster: 'Sargassum', x: -0.5, y: 2.1, size: 100 },
            { cluster: 'Natural', x: 2.2, y: 1.8, size: 80 },
            { cluster: 'Ships', x: -1.8, y: -2.2, size: 60 },
            { cluster: 'Clouds', x: 0.8, y: -0.5, size: 90 },
          ],
          colors: ['#06b6d4', '#ef4444', '#10b981', '#8b5cf6', '#3b82f6', '#64748b'],
        };

      case 'statistics':
        return {
          title: 'Dataset Statistics',
          data: [
            { split: 'Training', count: 1558, x: 'Training', y: 1558, percentage: 60 },
            { split: 'Validation', count: 519, x: 'Validation', y: 519, percentage: 20 },
            { split: 'Test', count: 520, x: 'Test', y: 520, percentage: 20 },
          ],
          colors: ['#10b981', '#f59e0b', '#ef4444'],
        };

      default:
        return null;
    }
  };

  const renderVisualization = () => {
    const vizData = getVisualizationData();
    if (!vizData) return null;

    switch (type) {
      case 'overview':
        return (
          <View style={styles.vizContainer}>
            <Text style={styles.vizTitle}>{vizData.title}</Text>
            
            {/* World Map with Marine Debris */}
            <WorldMap 
              width={width - 60} 
              height={200} 
              showMarineDebris={true}
            />
            
            {/* Ocean Distribution Chart */}
            <View style={styles.chartContainer}>
              <VictoryChart
                width={width - 80}
                height={180}
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
                  data={vizData.data}
                  x="ocean"
                  y="patches"
                  style={{
                    data: { 
                      fill: ({ index }) => vizData.colors[index % vizData.colors.length],
                      stroke: ({ index }) => vizData.colors[index % vizData.colors.length],
                      strokeWidth: 2
                    }
                  }}
                />
              </VictoryChart>
            </View>
          </View>
        );

      case 'analysis':
        return (
          <View style={styles.vizContainer}>
            <Text style={styles.vizTitle}>{vizData.title}</Text>
            
            <View style={styles.chartContainer}>
              <VictoryPie
                data={vizData.data}
                x="category"
                y="count"
                width={width - 80}
                height={220}
                innerRadius={50}
                colorScale={vizData.colors}
                labelComponent={<Text style={{ fontSize: 8, fill: '#f1f5f9' }} />}
              />
            </View>

            {/* Class Statistics */}
            <ScrollView style={styles.statsContainer} showsVerticalScrollIndicator={false}>
              {vizData.data.map((item: any, index: number) => {
                const total = vizData.data.reduce((sum: number, d: any) => sum + d.count, 0);
                const percentage = ((item.count / total) * 100).toFixed(1);
                return (
                  <View key={index} style={styles.statItem}>
                    <View style={[styles.statColor, { backgroundColor: vizData.colors[index] }]} />
                    <View style={styles.statInfo}>
                      <Text style={styles.statCategory}>{item.category}</Text>
                      <Text style={styles.statValue}>{item.count} patches ({percentage}%)</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );

      case 'signatures':
        return (
          <View style={styles.vizContainer}>
            <Text style={styles.vizTitle}>{vizData.title}</Text>
            
            <View style={styles.chartContainer}>
              <VictoryChart
                width={width - 80}
                height={200}
                theme={VictoryTheme.material}
                padding={{ left: 60, top: 20, right: 40, bottom: 60 }}
              >
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x.toFixed(2)}`}
                  style={{
                    axis: { stroke: '#64748b' },
                    tickLabels: { fontSize: 10, fill: '#cbd5e1' },
                    grid: { stroke: '#374151', strokeWidth: 0.5 }
                  }}
                />
                <VictoryAxis
                  tickFormat={(x) => vizData.data[x - 1]?.band || ''}
                  style={{
                    axis: { stroke: '#64748b' },
                    tickLabels: { fontSize: 9, fill: '#cbd5e1', angle: -45 }
                  }}
                />
                <VictoryLine
                  data={vizData.data}
                  x="x"
                  y="debris"
                  style={{ data: { stroke: '#ef4444', strokeWidth: 3 } }}
                />
                <VictoryLine
                  data={vizData.data}
                  x="x"
                  y="sargassum"
                  style={{ data: { stroke: '#10b981', strokeWidth: 3 } }}
                />
                <VictoryLine
                  data={vizData.data}
                  x="x"
                  y="water"
                  style={{ data: { stroke: '#06b6d4', strokeWidth: 3 } }}
                />
              </VictoryChart>
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendLine, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.legendText}>Marine Debris</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendLine, { backgroundColor: '#10b981' }]} />
                <Text style={styles.legendText}>Sargassum</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendLine, { backgroundColor: '#06b6d4' }]} />
                <Text style={styles.legendText}>Marine Water</Text>
              </View>
            </View>
          </View>
        );

      case 'visualization':
        return (
          <View style={styles.vizContainer}>
            <Text style={styles.vizTitle}>{vizData.title}</Text>
            
            <View style={styles.chartContainer}>
              <VictoryChart
                width={width - 80}
                height={200}
                theme={VictoryTheme.material}
                padding={{ left: 60, top: 20, right: 40, bottom: 60 }}
                domain={{ x: [-3, 3], y: [-3, 3] }}
              >
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: '#64748b' },
                    tickLabels: { fontSize: 10, fill: '#cbd5e1' },
                    grid: { stroke: '#374151', strokeWidth: 0.5 }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: '#64748b' },
                    tickLabels: { fontSize: 10, fill: '#cbd5e1' }
                  }}
                />
                <VictoryScatter
                  data={vizData.data}
                  x="x"
                  y="y"
                  size={({ datum }) => datum.size / 10}
                  style={{
                    data: { 
                      fill: ({ index }) => vizData.colors[index % vizData.colors.length],
                      fillOpacity: 0.7,
                      stroke: ({ index }) => vizData.colors[index % vizData.colors.length],
                      strokeWidth: 2
                    }
                  }}
                />
              </VictoryChart>
            </View>

            {/* Cluster Legend */}
            <View style={styles.clusterContainer}>
              {vizData.data.map((cluster: any, index: number) => (
                <View key={index} style={styles.clusterItem}>
                  <View style={[styles.clusterColor, { backgroundColor: vizData.colors[index] }]} />
                  <Text style={styles.clusterText}>{cluster.cluster}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'statistics':
        return (
          <View style={styles.vizContainer}>
            <Text style={styles.vizTitle}>{vizData.title}</Text>
            
            <View style={styles.chartContainer}>
              <VictoryChart
                width={width - 80}
                height={180}
                theme={VictoryTheme.material}
                domainPadding={{ x: 40 }}
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
                    tickLabels: { fontSize: 10, fill: '#cbd5e1' }
                  }}
                />
                <VictoryBar
                  data={vizData.data}
                  x="split"
                  y="count"
                  style={{
                    data: { 
                      fill: ({ index }) => vizData.colors[index % vizData.colors.length],
                      stroke: ({ index }) => vizData.colors[index % vizData.colors.length],
                      strokeWidth: 2
                    }
                  }}
                />
              </VictoryChart>
            </View>

            {/* Split Details */}
            <View style={styles.splitContainer}>
              {vizData.data.map((split: any, index: number) => (
                <View key={index} style={styles.splitItem}>
                  <View style={[styles.splitColor, { backgroundColor: vizData.colors[index] }]} />
                  <View style={styles.splitInfo}>
                    <Text style={styles.splitName}>{split.split} Set</Text>
                    <Text style={styles.splitValue}>{split.count.toLocaleString()} patches</Text>
                    <Text style={styles.splitPercentage}>{split.percentage}% of dataset</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderVisualization()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  vizContainer: {
    flex: 1,
  },
  vizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  statsContainer: {
    maxHeight: 150,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 6,
    padding: 8,
    marginBottom: 4,
  },
  statColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  statValue: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1e293b',
    borderRadius: 6,
    padding: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  clusterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  clusterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 4,
    padding: 6,
  },
  clusterColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  clusterText: {
    fontSize: 9,
    color: '#cbd5e1',
  },
  splitContainer: {
    gap: 8,
  },
  splitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 6,
    padding: 12,
  },
  splitColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  splitInfo: {
    flex: 1,
  },
  splitName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  splitValue: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  splitPercentage: {
    fontSize: 10,
    color: '#cbd5e1',
  },
});