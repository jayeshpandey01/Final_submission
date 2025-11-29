# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Hugging Face API key if you want to use the AI chatbot with real AI responses:
   ```
   REACT_APP_HUGGINGFACE_API_KEY=your_api_key_here
   ```
   
   Get a free API key from: https://huggingface.co/settings/tokens

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Features

### 🏠 Landing Page
- Professional hero section with animated elements
- Feature highlights and statistics
- Educational content about carbon footprints
- Call-to-action buttons

### 📊 Carbon Calculator
- Multi-step form with 5 categories:
  - 👴 Personal (height, weight, diet, etc.)
  - 🚗 Travel (transportation, vehicle type, air travel)
  - 🗑️ Waste (bag size, recycling habits)
  - ⚡ Energy (heating, cooking, device usage)
  - 💸 Consumption (shopping, clothing, groceries)

### 📈 Results Dashboard
- Interactive pie chart showing emission breakdown
- Tree offset calculations
- Personalized recommendations
- Detailed category analysis

### 🤖 AI Chatbot
- Floating chat interface
- Environmental advice and tips
- Powered by Hugging Face AI models
- Fallback responses for offline use

## Optional: Backend API

If you want to use the actual ML models instead of mock data:

1. **Install Python dependencies:**
   ```bash
   cd api
   pip install -r requirements.txt
   ```

2. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

## Deployment

### Frontend Only
```bash
npm run build
```
Deploy the `build` folder to any static hosting service (Netlify, Vercel, etc.)

### Full Stack
- Deploy the React app to a static host
- Deploy the Python API to Heroku, Railway, or similar
- Update `REACT_APP_API_URL` in production environment

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
    --primary-color: #2E7D32;
    --primary-light: #4CAF50;
    --primary-dark: #1B5E20;
}
```

### Content
- Landing page content: `src/components/LandingPage.js`
- Environmental facts: Update the `facts` array
- Footer links: `src/components/Footer.js`

### AI Responses
Customize chatbot responses in `src/components/Chatbot.js` in the `getEnvironmentalResponse` function.

## Troubleshooting

### Common Issues

1. **"react-scripts not found"**
   ```bash
   npm install
   ```

2. **Chatbot not responding**
   - Check if `REACT_APP_HUGGINGFACE_API_KEY` is set
   - Fallback responses should still work

3. **API connection failed**
   - Make sure the Python API is running on port 5000
   - Check `REACT_APP_API_URL` in your environment

### Performance Tips

1. **Optimize images:** Compress images in the `media` folder
2. **Bundle analysis:** Run `npm run build` and check bundle size
3. **Lazy loading:** Consider lazy loading for heavy components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Check the troubleshooting section above
- Open an issue on GitHub
- Contact the development team

---

**Happy calculating! 🌱**