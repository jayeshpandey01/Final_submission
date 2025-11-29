# Charts and Maps Setup Guide

This guide explains how to set up and use the enhanced chart and map visualizations in the React Native mobile app.

## Current Implementation

The app now includes both advanced chart libraries and fallback components to ensure visualizations work across all devices and environments.

### Components Available

1. **CarbonChart** - Advanced charts using react-native-chart-kit
2. **FallbackChart** - Native React Native chart implementation
3. **CarbonMap** - Interactive maps using react-native-maps
4. **FallbackMap** - Native React Native map simulation
5. **MaridaVisualization** - Advanced MARIDA dataset visualizations
6. **FallbackMaridaVisualization** - Native MARIDA visualizations

## Installation Steps

### 1. Install Dependencies

```bash
cd mobile_app
npm install
```

The following packages are now included:
- `react-native-chart-kit` - For advanced charts
- `react-native-svg` - Required for chart rendering
- `expo-location` - For location services
- `react-native-maps` - For interactive maps

### 2. Configure Permissions

The app.json has been updated with necessary permissions:

**Android:**
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION

**iOS:**
- NSLocationWhenInUseUsageDescription

### 3. Run the App

```bash
# Start the development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Features

### Dashboard Visualizations

1. **Environmental Impact Map**
   - Shows emission locations with color-coded markers
   - Displays heatmap of carbon intensity
   - Includes legend and location details

2. **Emissions Charts**
   - Bar chart showing breakdown by category
   - Pie chart showing distribution percentages
   - Interactive legends and tooltips

### MARIDA Dataset Visualizations

1. **Geographic Distribution** - Ocean basin coverage
2. **Class Analysis** - Category distribution pie charts
3. **Spectral Signatures** - Multi-band reflectance curves
4. **2D Embeddings** - Cluster visualization
5. **Dataset Statistics** - Train/validation/test splits

## Fallback Strategy

If advanced libraries fail to load or render:

1. **Automatic Fallback** - App automatically uses native components
2. **Same Data** - All visualizations use the same data sources
3. **Consistent UI** - Fallback components match the app's design
4. **Full Functionality** - All features remain accessible

## Troubleshooting

### Charts Not Displaying

1. **Check Dependencies**
   ```bash
   npm install react-native-chart-kit react-native-svg
   ```

2. **Clear Cache**
   ```bash
   expo start --clear
   ```

3. **Use Fallback Components**
   - The app automatically falls back to native implementations
   - No user intervention required

### Maps Not Loading

1. **Check Location Permissions**
   - Ensure location permissions are granted
   - Check device location services are enabled

2. **Network Issues**
   - Maps require internet connection
   - Fallback shows simulated map with data

3. **Platform Specific**
   - iOS: Check Info.plist permissions
   - Android: Check manifest permissions

### Performance Issues

1. **Reduce Chart Complexity**
   - Limit data points for better performance
   - Use sampling for large datasets

2. **Optimize Rendering**
   - Charts render on demand
   - Maps use efficient marker clustering

## Data Sources

### Environmental Impact Data
- Travel emissions by location
- Energy consumption patterns
- Waste generation tracking
- Diet-related carbon impact

### MARIDA Dataset
- 15 marine debris categories
- 2,597 satellite image patches
- 11 spectral bands analysis
- Global ocean coverage

## Customization

### Adding New Chart Types

1. Create component in `/components/`
2. Import required libraries
3. Add fallback implementation
4. Update screen imports

### Modifying Data Sources

1. Update data files in `/data/`
2. Modify fetch functions in screens
3. Ensure fallback components receive same data

### Styling Changes

1. Update StyleSheet in component files
2. Maintain consistent color scheme
3. Ensure accessibility compliance

## Best Practices

1. **Always Provide Fallbacks** - Never rely solely on external libraries
2. **Test on Multiple Devices** - Ensure compatibility across platforms
3. **Optimize Performance** - Limit data complexity for mobile devices
4. **Handle Errors Gracefully** - Provide meaningful error messages
5. **Maintain Consistency** - Keep UI/UX consistent across components

## Future Enhancements

1. **Real-time Data** - Connect to live carbon tracking APIs
2. **Offline Support** - Cache visualizations for offline viewing
3. **Interactive Features** - Add drill-down capabilities
4. **Export Options** - Allow users to save/share charts
5. **Advanced Analytics** - Add trend analysis and predictions