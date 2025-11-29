import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ isPageMode = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your SawtchEarth AI assistant. I can help you with environmental monitoring, impact assessment, and sustainability questions. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(isPageMode);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "How can I reduce my environmental impact?",
    "What's the impact of air travel?",
    "Best sustainable transportation options?",
    "How does diet affect carbon emissions?",
    "Tips for energy-efficient homes?",
    "What is carbon offsetting?"
  ];

  // Hugging Face API integration
  const queryHuggingFace = async (text) => {
    try {
      // Using a free environmental/sustainability model from Hugging Face
      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY || 'hf_demo_key'}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: {
              past_user_inputs: messages
                .filter(m => m.sender === 'user')
                .slice(-3)
                .map(m => m.text),
              generated_responses: messages
                .filter(m => m.sender === 'bot')
                .slice(-3)
                .map(m => m.text),
              text: text
            },
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      return result.generated_text || result.response || "I'm sorry, I couldn't process that request. Could you try rephrasing your question?";
    } catch (error) {
      console.error('Hugging Face API error:', error);
      return getEnvironmentalResponse(text);
    }
  };

  // Fallback environmental responses
  const getEnvironmentalResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('carbon footprint') || lowerText.includes('reduce')) {
      return "Here are some effective ways to reduce your carbon footprint:\n\n• Use public transportation, bike, or walk instead of driving\n• Switch to renewable energy sources\n• Eat less meat and more plant-based foods\n• Reduce, reuse, and recycle\n• Buy local and seasonal products\n• Improve home insulation and use energy-efficient appliances";
    }
    
    if (lowerText.includes('transport') || lowerText.includes('travel')) {
      return "Transportation tips for lower emissions:\n\n• Electric or hybrid vehicles are much cleaner\n• Public transport reduces individual carbon footprint\n• Cycling and walking are zero-emission options\n• For flights, consider carbon offsets\n• Combine trips to reduce overall travel\n• Work from home when possible";
    }
    
    if (lowerText.includes('diet') || lowerText.includes('food')) {
      return "Diet has a significant impact on carbon emissions:\n\n• Beef has the highest carbon footprint (~26kg CO₂/kg)\n• Plant-based diets can reduce food emissions by up to 73%\n• Local and seasonal foods reduce transport emissions\n• Reduce food waste - it accounts for 8% of global emissions\n• Consider pescatarian or vegetarian options";
    }
    
    if (lowerText.includes('energy') || lowerText.includes('electricity')) {
      return "Energy efficiency tips:\n\n• Switch to LED bulbs (use 75% less energy)\n• Unplug devices when not in use\n• Use programmable thermostats\n• Insulate your home properly\n• Consider solar panels if possible\n• Choose energy-efficient appliances (ENERGY STAR rated)";
    }
    
    if (lowerText.includes('offset') || lowerText.includes('tree')) {
      return "Carbon offsetting information:\n\n• One tree absorbs about 48 lbs of CO₂ per year\n• Quality offset programs invest in renewable energy, reforestation\n• Look for verified offset programs (Gold Standard, VCS)\n• Offsetting should complement, not replace, emission reduction\n• Calculate your footprint first, then offset what you can't reduce";
    }
    
    return "That's a great question about environmental impact! While I can provide general guidance on sustainability topics like carbon footprints, energy efficiency, sustainable transportation, and eco-friendly lifestyle choices, I'd recommend using our calculator to get personalized insights about your environmental impact. Is there a specific aspect of sustainability you'd like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await queryHuggingFace(inputText);
      
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later or use our carbon footprint calculator for personalized insights.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button - only show in floating mode */}
      {!isPageMode && (
        <button 
          className={`chat-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle chat"
        >
          {isOpen ? '✕' : '💬'}
        </button>
      )}

      {/* Chat Window */}
      <div className={`chatbot-container ${isPageMode ? 'page-mode' : ''} ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="bot-info">
            <div className="bot-avatar">🤖</div>
            <div className="bot-details">
              <h3>EcoBot</h3>
              <span className="bot-status">Online • Environmental AI Assistant</span>
            </div>
          </div>
          {!isPageMode && (
            <button 
              className="close-chat"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          )}
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-text">
                  {message.text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="quick-questions">
            <p>Quick questions to get started:</p>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about environmental impact, sustainability, or SawtchEarth features..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="send-button"
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </div>
          <div className="input-footer">
            <span>Powered by AI • Environmental guidance</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;