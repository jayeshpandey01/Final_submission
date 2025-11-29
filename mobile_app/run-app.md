# Running the MARIDA-Enhanced Mobile App

## Quick Start Guide

### Prerequisites
Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation
```bash
cd mobile_app
npm install
```

### Running the App

#### For Development
```bash
npm start
```
This will start the Expo development server and show a QR code.

#### Platform-Specific
```bash
# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web
```

### Testing the MARIDA Integration

#### Navigation Flow
1. **Start**: Welcome screen with MARIDA preview
2. **Explore**: Tap "Explore Dataset" or "Explore Research Data"
3. **Navigate**: Use the Research tab in Dashboard
4. **Discover**: Browse through different dataset sections

#### Key Features to Test
- ✅ MARIDA preview card on Welcome screen
- ✅ Research tab in Dashboard
- ✅ Full MARIDA dataset screen
- ✅ Interactive section navigation
- ✅ Statistics and technical specifications
- ✅ Back navigation between screens

#### Mobile Testing
- Test on different screen sizes
- Verify touch interactions
- Check scrolling performance
- Validate responsive design

### Troubleshooting

#### Common Issues
1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Node modules**: Delete `node_modules` and run `npm install`
3. **Expo CLI**: Update with `npm install -g @expo/cli@latest`

#### Performance Tips
- Use physical device for best performance
- Enable fast refresh for development
- Monitor memory usage on older devices

### Development Notes
- The app uses TypeScript for type safety
- Styling is done with React Native StyleSheet
- Navigation is custom screen-based (no external router)
- All MARIDA content is currently static (ready for API integration)

### Next Steps
- Add real data visualization
- Implement API integration
- Add offline data caching
- Enhance interactive features