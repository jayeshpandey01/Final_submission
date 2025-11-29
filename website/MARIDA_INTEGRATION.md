# MARIDA Dataset Integration

## Overview
This document describes the integration of the MARIDA (Marine Debris Archive) dataset documentation into the Carbon Footprint Calculator website.

## Changes Made

### 1. New Documentation Component
- **File**: `src/components/Documentation.js`
- **Purpose**: Displays MARIDA dataset documentation with interactive navigation
- **Features**:
  - Responsive sidebar navigation
  - Interactive iframe displays for each report
  - Attractive hero section with dataset statistics
  - Information cards explaining each section

### 2. Documentation Styles
- **File**: `src/components/Documentation.css`
- **Purpose**: Comprehensive styling for the documentation component
- **Features**:
  - Modern gradient backgrounds
  - Smooth animations and transitions
  - Responsive design for mobile devices
  - Interactive hover effects

### 3. Updated Navigation
- **File**: `src/components/Header.js`
- **Changes**: Added "MARIDA Dataset" tab to main navigation
- **Icon**: 🛰️ (satellite emoji)

### 4. Enhanced Landing Page
- **File**: `src/components/LandingPage.js`
- **Changes**: Added MARIDA dataset section with:
  - Satellite animation
  - Feature highlights
  - Call-to-action button
- **File**: `src/components/LandingPage.css`
- **Changes**: Added styles for MARIDA section with animations

### 5. Documentation Files
- **Location**: `public/docs/`
- **Files Copied**:
  - `Report_1_Map.html` - Geographic distribution map
  - `Report_2_EDA.html` - Exploratory data analysis
  - `Report_3_Signatures.html` - Spectral signatures analysis
  - `Report_4_Embedding.html` - 2D embedding visualization
  - `Report_5_Patches_stats.html` - Patch statistics
  - `favicon.ico` - Favicon for documentation
  - `graph.PNG` - Supporting image

### 6. App Integration
- **File**: `src/App.js`
- **Changes**: 
  - Imported Documentation component
  - Added tab 3 for documentation
  - Updated navigation handlers

## Features

### Interactive Navigation
- Sidebar navigation with 5 main sections
- Smooth transitions between sections
- Active state indicators
- Mobile-responsive design

### Content Sections
1. **📍 Archive Overview**: Geographic distribution map
2. **📊 Categories & Analysis**: Exploratory data analysis
3. **🌊 Spectral Signatures**: Spectral analysis charts
4. **🗺️ 2D Embedding Maps**: Dimensionality reduction visualizations
5. **📈 Patch Statistics**: Dataset statistics and distributions

### Visual Design
- Modern gradient backgrounds
- Satellite-themed animations
- Responsive grid layouts
- Interactive hover effects
- Professional color scheme

### Technical Implementation
- React functional components with hooks
- CSS Grid and Flexbox layouts
- Iframe integration for HTML reports
- Intersection Observer for animations
- Mobile-first responsive design

## Usage

### Accessing Documentation
1. Navigate to the website
2. Click on "MARIDA Dataset" in the main navigation
3. Use the sidebar to explore different sections
4. Each section loads the corresponding HTML report in an iframe

### From Landing Page
1. Scroll to the MARIDA section on the home page
2. Click "Explore MARIDA Dataset" button
3. Automatically navigates to the documentation tab

## Browser Compatibility
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Responsive design for mobile devices

## Future Enhancements
- Add search functionality within documentation
- Implement bookmarking for specific sections
- Add download links for datasets
- Include interactive data exploration tools
- Add user feedback and rating system

## File Structure
```
website/
├── public/
│   └── docs/
│       ├── Report_1_Map.html
│       ├── Report_2_EDA.html
│       ├── Report_3_Signatures.html
│       ├── Report_4_Embedding.html
│       ├── Report_5_Patches_stats.html
│       ├── favicon.ico
│       └── graph.PNG
└── src/
    └── components/
        ├── Documentation.js
        ├── Documentation.css
        ├── Header.js (updated)
        ├── LandingPage.js (updated)
        └── LandingPage.css (updated)
```

## Dependencies
- React 18+
- Modern CSS features (Grid, Flexbox, Custom Properties)
- No additional npm packages required for documentation component