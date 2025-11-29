import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import worldCarbonData from '../data/worldCarbonData.json';

interface WorldMapProps {
  width?: number;
  height?: number;
  showMarineDebris?: boolean;
}

interface EmissionData {
  country: string;
  coordinates: [number, number];
  emissions: number;
  population: number;
  perCapita: number;
  category: string;
}

interface MarineDebrisData {
  location: string;
  coordinates: [number, number];
  debrisCount: number;
  area: number;
  type: string;
}

export default function WorldMap({ width = 350, height = 250, showMarineDebris = false }: WorldMapProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const emissionsData: EmissionData[] = worldCarbonData.globalEmissions;
  const marineData: MarineDebrisData[] = worldCarbonData.marineDebris;

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(location);
        setLoading(false);
      } catch (error) {
        console.log('Location error:', error);
        setErrorMsg('Unable to get location');
        setLoading(false);
      }
    })();
  }, []);

  const getMarkerColor = (category: string): string => {
    switch (category) {
      case 'high':
        return '#ef4444'; // Red for high emissions
      case 'medium':
        return '#f59e0b'; // Orange for medium emissions
      case 'low':
        return '#10b981'; // Green for low emissions
      default:
        return '#64748b'; // Gray for unknown
    }
  };

  const getCircleRadius = (emissions: number): number => {
    // Scale circle size based on emissions (logarithmic scale for better visualization)
    return Math.max(Math.log(emissions) * 50000, 100000);
  };

  const initialRegion = {
    latitude: location?.coords.latitude || 20.0,
    longitude: location?.coords.longitude || 0.0,
    latitudeDelta: 80.0,
    longitudeDelta: 80.0,
  };

  if (loading) {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading World Map...</Text>
        </View>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🌍</Text>
          <Text style={styles.errorTitle}>World Carbon Emissions Map</Text>
          <Text style={styles.errorMessage}>Location services unavailable</Text>
          <Text style={styles.errorSubtext}>Showing global emission data</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {/* Carbon Emissions Circles */}
        {emissionsData.map((country, index) => (
          <Circle
            key={`emission-${index}`}
            center={{
              latitude: country.coordinates[0],
              longitude: country.coordinates[1],
            }}
            radius={getCircleRadius(country.emissions)}
            fillColor={`${getMarkerColor(country.category)}40`} // 40 for transparency
            strokeColor={getMarkerColor(country.category)}
            strokeWidth={2}
          />
        ))}

        {/* Country Markers */}
        {emissionsData.map((country, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: country.coordinates[0],
              longitude: country.coordinates[1],
            }}
            title={country.country}
            description={`${country.emissions}Mt CO₂ | ${country.perCapita}t per capita`}
            pinColor={getMarkerColor(country.category)}
          />
        ))}

        {/* Marine Debris Markers (if enabled) */}
        {showMarineDebris && marineData.map((debris, index) => (
          <Marker
            key={`debris-${index}`}
            coordinate={{
              latitude: debris.coordinates[0],
              longitude: debris.coordinates[1],
            }}
            title={debris.location}
            description={`${debris.debrisCount.toLocaleString()} tons of debris`}
            pinColor="#8b5cf6"
          >
            <View style={styles.debrisMarker}>
              <Text style={styles.debrisIcon}>🌊</Text>
            </View>
          </Marker>
        ))}

        {/* User Location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="Current position"
            pinColor="#3b82f6"
          />
        )}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Global CO₂ Emissions</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.legendText}>High (&gt;8t per capita)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Medium (3-8t per capita)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#10b981' }]} />
            <Text style={styles.legendText}>Low (&lt;3t per capita)</Text>
          </View>
          {showMarineDebris && (
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#8b5cf6' }]} />
              <Text style={styles.legendText}>Marine Debris</Text>
            </View>
          )}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          {emissionsData.length} countries • {showMarineDebris ? marineData.length + ' debris zones' : 'Carbon emissions'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  loadingText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#ef4444',
    marginBottom: 4,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  debrisMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  debrisIcon: {
    fontSize: 14,
  },
  legend: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 8,
    padding: 12,
    maxWidth: 200,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 10,
    color: '#cbd5e1',
    flex: 1,
  },
  stats: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 6,
    padding: 8,
  },
  statsText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '600',
  },
});