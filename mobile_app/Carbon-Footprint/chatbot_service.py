import requests
import json
from typing import Optional

class CarbonFootprintChatbot:
    """
    Chatbot service for carbon footprint questions using HuggingFace free LLM
    Uses the Hugging Face Inference API with free models
    """
    
    def __init__(self, api_token: Optional[str] = None):
        """
        Initialize the chatbot with HuggingFace API token
        Get free token from: https://huggingface.co/settings/tokens
        """
        self.api_token = api_token or "hf_YOUR_TOKEN_HERE"
        self.api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
        self.headers = {"Authorization": f"Bearer {self.api_token}"}
        
        self.system_prompt = """You are an expert carbon footprint assistant. 
Your role is to help users understand and reduce their carbon emissions.
Provide practical, actionable advice about:
- Transportation and travel emissions
- Energy consumption and efficiency
- Waste reduction and recycling
- Diet and food choices
- Sustainable lifestyle changes

Keep responses concise, friendly, and focused on carbon reduction strategies.
Always provide specific numbers or percentages when possible."""

    def query(self, user_message: str) -> dict:
        """
        Send a query to the HuggingFace model and get a response
        """
        try:
            payload = {
                "inputs": f"{self.system_prompt}\n\nUser: {user_message}\n\nAssistant:",
                "parameters": {
                    "max_new_tokens": 200,
                    "temperature": 0.7,
                    "top_p": 0.95,
                }
            }
            
            response = requests.post(
                self.api_url,
                headers=self.headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get("generated_text", "")
                    # Extract only the assistant's response
                    if "Assistant:" in generated_text:
                        assistant_response = generated_text.split("Assistant:")[-1].strip()
                    else:
                        assistant_response = generated_text
                    
                    return {
                        "success": True,
                        "response": assistant_response,
                        "model": "Mistral-7B"
                    }
                else:
                    return {
                        "success": False,
                        "response": "No response from model",
                        "error": "Empty response"
                    }
            else:
                return {
                    "success": False,
                    "response": "Error connecting to AI model",
                    "error": f"Status code: {response.status_code}"
                }
                
        except requests.exceptions.Timeout:
            return {
                "success": False,
                "response": "Request timed out. Please try again.",
                "error": "Timeout"
            }
        except Exception as e:
            return {
                "success": False,
                "response": "Error processing your question",
                "error": str(e)
            }

    def get_carbon_tips(self, category: str) -> str:
        """
        Get specific carbon reduction tips for a category
        """
        tips = {
            "travel": """🚗 Travel Emissions Tips:
- Use public transport: Reduces emissions by 40-50%
- Carpool: Share rides to cut emissions in half
- Electric vehicles: 50-70% lower emissions than gas cars
- Bike/Walk: Zero emissions for short distances
- Fly less: One flight = weeks of car emissions""",
            
            "energy": """⚡ Energy Efficiency Tips:
- Switch to LED bulbs: 75% less energy than incandescent
- Unplug devices: Saves 5-10% of electricity bill
- Use renewable energy: Solar/wind reduces emissions by 100%
- Improve insulation: Reduces heating needs by 30%
- Smart thermostat: Saves 10-15% on heating/cooling""",
            
            "waste": """🗑️ Waste Reduction Tips:
- Recycle properly: Reduces landfill emissions by 50%
- Compost food waste: Prevents methane emissions
- Buy less: Reduce consumption by 30% = 30% less emissions
- Choose reusable: Bags, bottles, containers
- Repair instead of replace: Extends product life""",
            
            "diet": """🍽️ Diet & Food Tips:
- Reduce meat: Beef has 10x emissions of vegetables
- Go vegetarian 1 day/week: Saves 1 ton CO2/year
- Buy local: Reduces transport emissions by 80%
- Minimize food waste: 8% of global emissions
- Choose seasonal produce: Lower transportation needs"""
        }
        
        return tips.get(category.lower(), "Category not found. Try: travel, energy, waste, or diet")


# Example usage
if __name__ == "__main__":
    # Initialize chatbot (replace with your actual HuggingFace token)
    chatbot = CarbonFootprintChatbot(api_token="hf_YOUR_TOKEN_HERE")
    
    # Test queries
    test_questions = [
        "How can I reduce my travel emissions?",
        "What's the carbon footprint of flying?",
        "How much can I save by using public transport?"
    ]
    
    for question in test_questions:
        print(f"\nUser: {question}")
        response = chatbot.query(question)
        print(f"Assistant: {response['response']}")
