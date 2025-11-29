from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_service import CarbonFootprintChatbot
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize chatbot with HuggingFace token from environment
HF_TOKEN = os.getenv("HUGGINGFACE_TOKEN", "hf_YOUR_TOKEN_HERE")
chatbot = CarbonFootprintChatbot(api_token=HF_TOKEN)

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Endpoint to send a message to the carbon footprint chatbot
    Expected JSON: {"message": "user question"}
    """
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                "success": False,
                "error": "Message cannot be empty"
            }), 400
        
        # Get response from chatbot
        response = chatbot.query(user_message)
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/tips/<category>', methods=['GET'])
def get_tips(category):
    """
    Endpoint to get carbon reduction tips for a specific category
    Categories: travel, energy, waste, diet
    """
    try:
        tips = chatbot.get_carbon_tips(category)
        return jsonify({
            "success": True,
            "category": category,
            "tips": tips
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "service": "Carbon Footprint Chatbot API"
    }), 200

if __name__ == '__main__':
    print("Starting Carbon Footprint Chatbot API...")
    print(f"HuggingFace Token configured: {bool(HF_TOKEN and HF_TOKEN != 'hf_YOUR_TOKEN_HERE')}")
    app.run(debug=True, host='0.0.0.0', port=5000)
