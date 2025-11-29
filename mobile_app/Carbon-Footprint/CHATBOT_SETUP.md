# Carbon Footprint Chatbot Setup Guide

## Overview
The chatbot uses HuggingFace's free Inference API with the Mistral-7B model to provide carbon reduction advice.

## Prerequisites
- Python 3.8+
- HuggingFace account (free)
- Flask and required dependencies

## Step 1: Get HuggingFace API Token

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Give it a name (e.g., "Carbon Footprint App")
4. Select "Read" access
5. Copy the token

## Step 2: Setup Environment

1. Navigate to the Carbon-Footprint directory:
```bash
cd Carbon-Footprint
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Edit `.env` and replace `hf_YOUR_TOKEN_HERE` with your actual HuggingFace token:
```
HUGGINGFACE_TOKEN=hf_xxxxxxxxxxxxxxxxxxxx
```

## Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 4: Run the Chatbot API

```bash
python chatbot_api.py
```

You should see:
```
Starting Carbon Footprint Chatbot API...
HuggingFace Token configured: True
 * Running on http://0.0.0.0:5000
```

## Step 5: Test the Chatbot

### Using cURL:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How can I reduce my travel emissions?"}'
```

### Using Python:
```python
import requests

response = requests.post(
    'http://localhost:5000/api/chat',
    json={'message': 'How can I reduce my travel emissions?'}
)
print(response.json())
```

## Step 6: Connect React Native App

The app is already configured to connect to `http://localhost:5000/api/chat`. 

When running on a physical device or emulator:
- **Android Emulator**: Use `http://10.0.2.2:5000` instead of `localhost`
- **iOS Simulator**: Use `http://localhost:5000`
- **Physical Device**: Use your machine's IP address (e.g., `http://192.168.x.x:5000`)

## API Endpoints

### Chat Endpoint
**POST** `/api/chat`

Request:
```json
{
  "message": "How can I reduce my carbon footprint?"
}
```

Response:
```json
{
  "success": true,
  "response": "Here are some ways to reduce your carbon footprint...",
  "model": "Mistral-7B"
}
```

### Tips Endpoint
**GET** `/api/tips/<category>`

Categories: `travel`, `energy`, `waste`, `diet`

Example: `GET /api/tips/travel`

Response:
```json
{
  "success": true,
  "category": "travel",
  "tips": "🚗 Travel Emissions Tips:\n- Use public transport: Reduces emissions by 40-50%\n..."
}
```

### Health Check
**GET** `/api/health`

## Troubleshooting

### "Invalid API token"
- Verify your HuggingFace token is correct
- Check that the token has "Read" access
- Regenerate the token if needed

### "Request timed out"
- The HuggingFace API might be slow on first request
- Try again after a few seconds
- Check your internet connection

### "Connection refused" from React Native
- Ensure the Flask server is running
- Check the correct IP address for your device
- Verify firewall settings

### Model not responding
- HuggingFace free tier has rate limits
- Wait a few seconds between requests
- Consider upgrading to a paid plan for production

## Free Models Available

You can also use other free models from HuggingFace:

1. **Mistral-7B** (Current - Recommended)
   - Fast and accurate
   - Good for carbon advice

2. **Llama-2-7B**
   - URL: `https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf`

3. **Zephyr-7B**
   - URL: `https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta`

To switch models, edit the `api_url` in `chatbot_service.py`.

## Production Deployment

For production:

1. Use environment variables for sensitive data
2. Add rate limiting
3. Implement caching for common questions
4. Use a paid HuggingFace plan for reliability
5. Add error logging and monitoring
6. Deploy on a server (AWS, Heroku, etc.)

## Example Queries

The chatbot is trained to answer questions like:

- "How can I reduce my travel emissions?"
- "What's the carbon footprint of flying?"
- "How much can I save by using public transport?"
- "What diet choices reduce carbon emissions?"
- "How to improve home energy efficiency?"
- "Best ways to reduce waste?"
- "What's my carbon footprint?"

## Support

For issues with:
- **HuggingFace API**: Visit [HuggingFace Docs](https://huggingface.co/docs/api-inference)
- **Flask**: Visit [Flask Docs](https://flask.palletsprojects.com/)
- **React Native**: Visit [React Native Docs](https://reactnative.dev/)
