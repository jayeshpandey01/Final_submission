import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onStartCalculation, onNavigateToDocumentation }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
  const facts = [
    "Each year, human activities release over 40 billion tCO₂ into the atmosphere.",
    "The production of one kilogram of beef is associated with approximately 26 kgCO₂ emissions.",
    "The transportation sector accounts for nearly 25% of global CO₂ emissions, with the aviation industry being a major contributor.",
    "Deforestation contributes to about 10% of global carbon emissions, releasing stored carbon in trees into the atmosphere",
    "Some carbon offset projects, like reforestation initiatives, can sequester up to 20 tCO₂ per acre over several decades.",
    "Driving an electric vehicle can reduce an individual's carbon footprint by around 50% compared to a conventional gasoline-powered car.",
    "Approximately 3 kgCO₂ is produced when using 1GB of data, and watching an HD-quality movie on Netflix causes approximately 4.5 kgCO₂ emissions.",
    "Globally, buildings are responsible for approximately 36% of total energy use and 39% of CO₂ emissions.",
    "The annual global carbon footprint from the fashion industry is estimated to be around 3.3 billion tons of CO₂.",
    "As of 2021, the average global temperature has increased by approximately 1.2 degrees Celsius compared to pre-industrial levels."
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Scientist",
      avatar: "👩‍🔬",
      quote: "This calculator helped me identify areas where I could make the biggest impact. I reduced my footprint by 30% in just 6 months!"
    },
    {
      name: "Mike Chen",
      role: "Sustainability Manager",
      avatar: "👨‍💼",
      quote: "We use this tool for our entire team. The insights are actionable and the AI assistant provides excellent guidance."
    },
    {
      name: "Emma Rodriguez",
      role: "Climate Activist",
      avatar: "🌱",
      quote: "Finally, a carbon calculator that's both accurate and easy to use. The visualizations make it easy to understand my impact."
    }
  ];

  const impactStories = [
    {
      icon: "🚗",
      title: "Transportation Revolution",
      description: "Users switching to electric vehicles report 45% reduction in transport emissions",
      metric: "45% less CO₂"
    },
    {
      icon: "🏠",
      title: "Energy Efficiency",
      description: "Home energy optimizations leading to significant monthly savings",
      metric: "30% energy saved"
    },
    {
      icon: "🌱",
      title: "Dietary Changes",
      description: "Plant-based meal planning reducing food-related carbon footprint",
      metric: "25% reduction"
    },
    {
      icon: "♻️",
      title: "Waste Reduction",
      description: "Improved recycling and waste management practices",
      metric: "60% less waste"
    }
  ];

  const features = [
    {
      icon: "🌍",
      title: "Global Impact Tracking",
      description: "Understand your personal contribution to global carbon emissions and climate change with real-time data.",
      highlight: "Real-time tracking"
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Get comprehensive breakdown of your carbon footprint across 5 major lifestyle categories with ML-powered insights.",
      highlight: "ML-powered insights"
    },
    {
      icon: "🌱",
      title: "Smart Recommendations",
      description: "Receive personalized, actionable recommendations based on your unique lifestyle and location.",
      highlight: "Personalized advice"
    },
    {
      icon: "🤖",
      title: "AI Environmental Coach",
      description: "Chat with our advanced AI assistant trained on environmental data for instant guidance and support.",
      highlight: "24/7 AI support"
    },
    {
      icon: "📈",
      title: "Progress Monitoring",
      description: "Track your improvement over time with detailed charts and milestone celebrations.",
      highlight: "Track progress"
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description: "Earn badges and compete with friends while making positive environmental changes.",
      highlight: "Gamified experience"
    }
  ];

  const stats = [
    { number: "40B+", label: "Tons CO₂ annually", description: "Global carbon emissions" },
    { number: "1.2°C", label: "Temperature rise", description: "Since pre-industrial times" },
    { number: "25%", label: "Transport emissions", description: "Of global CO₂ output" },
    { number: "36%", label: "Building energy use", description: "Of total energy consumption" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);



  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight">SawtchEarth</span> Environmental Platform
            </h1>
            <p className="hero-subtitle">
              Monitor and analyze environmental data with advanced satellite imagery and AI-powered insights. 
              Get comprehensive environmental impact assessments and actionable recommendations.
            </p>
            <div className="hero-actions">
              <button className="cta-primary" onClick={onStartCalculation}>
                <span>🌱</span>
                Start Your Assessment
              </button>
              <button className="cta-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="carbon-visualization">
              <div className="earth-container">
                <div className="earth-icon">🌍</div>
                <div className="orbit-ring"></div>
                <div className="orbit-ring orbit-ring-2"></div>
              </div>
              <div className="emission-particles">
                <span>💨</span>
                <span>💨</span>
                <span>💨</span>
                <span>🌱</span>
                <span>♻️</span>
              </div>
              <div className="floating-elements">
                <div className="floating-element">🌿</div>
                <div className="floating-element">🔋</div>
                <div className="floating-element">🚲</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="floating-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" data-animate>
        <div className="section-header">
          <h2>Why Choose SawtchEarth?</h2>
          <p>Advanced environmental monitoring and analysis is the key to understanding and reducing your impact</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-highlight">{feature.highlight}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>What We Measure</h2>
          <p>Comprehensive analysis across all major emission sources</p>
        </div>
        
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🚗</div>
            <h3>Transportation</h3>
            <p>Vehicle usage, public transport, air travel, and commuting patterns</p>
            <ul>
              <li>Daily commute distance</li>
              <li>Vehicle fuel type</li>
              <li>Flight frequency</li>
              <li>Public transport usage</li>
            </ul>
          </div>
          
          <div className="category-card">
            <div className="category-icon">⚡</div>
            <h3>Energy Consumption</h3>
            <p>Home energy usage, heating, cooling, and electronic device consumption</p>
            <ul>
              <li>Heating energy source</li>
              <li>Daily screen time</li>
              <li>Cooking methods</li>
              <li>Energy efficiency habits</li>
            </ul>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🍽️</div>
            <h3>Diet & Consumption</h3>
            <p>Food choices, grocery spending, and consumption patterns</p>
            <ul>
              <li>Dietary preferences</li>
              <li>Grocery spending</li>
              <li>Food waste habits</li>
              <li>Local vs imported foods</li>
            </ul>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🗑️</div>
            <h3>Waste Management</h3>
            <p>Waste generation, recycling habits, and disposal methods</p>
            <ul>
              <li>Weekly waste volume</li>
              <li>Recycling practices</li>
              <li>Clothing purchases</li>
              <li>Single-use items</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Fact Section */}
      <section className="fact-section">
        <div className="fact-container">
          <h3>💡 Did You Know?</h3>
          <div className="fact-display">
            <p className="rotating-fact">{facts[currentFactIndex]}</p>
          </div>
          <div className="fact-indicators">
            {facts.map((_, index) => (
              <button
                key={index}
                className={`fact-dot ${index === currentFactIndex ? 'active' : ''}`}
                onClick={() => setCurrentFactIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="impact-section" data-animate>
        <div className="section-header">
          <h2>Real Impact Stories</h2>
          <p>See how our users are making a difference in their daily lives</p>
        </div>
        
        <div className="impact-grid">
          {impactStories.map((story, index) => (
            <div key={index} className="impact-card">
              <div className="impact-icon">{story.icon}</div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <div className="impact-metric">{story.metric}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" data-animate>
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied users making a positive environmental impact</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{testimonial.quote}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Showcase */}
      <section className="stats-showcase">
        <div className="stats-container">
          <div className="stat-highlight">
            <div style={{ color: "white"}} className="stat-number">50,000+</div>
            <div className="stat-label">Environmental Assessments</div>
          </div>
          <div className="stat-highlight">
            <div style={{ color: "white"}} className="stat-number">2.5M</div>
            <div className="stat-label">Tons CO₂ Tracked & Reduced</div>
          </div>
          <div className="stat-highlight">
            <div style={{ color: "white"}} className="stat-number">15,000</div>
            <div className="stat-label">Trees Planted Through Offsets</div>
          </div>
          <div className="stat-highlight">
            <div style={{ color: "white"}} className="stat-number">98%</div>
            <div className="stat-label">User Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* MARIDA Dataset Section */}
      <section className="marida-section" data-animate>
        <div className="marida-container">
          <div className="marida-content">
            <div className="marida-header">
              <h2>Marine Environmental Research</h2>
              <p>Explore the MARIDA Dataset - Advanced satellite-based marine debris detection for environmental monitoring and ocean conservation research.</p>
            </div>
            
            <div className="marida-features">
              <div className="marida-feature">
                <div className="marida-icon">🛰️</div>
                <h3>Satellite Imagery</h3>
                <p>High-resolution Sentinel-2 data with 10m spatial resolution for precise environmental monitoring</p>
              </div>
              <div className="marida-feature">
                <div className="marida-icon">🤖</div>
                <h3>Machine Learning Ready</h3>
                <p>Pre-processed dataset optimized for deep learning applications in marine debris detection</p>
              </div>
              <div className="marida-feature">
                <div className="marida-icon">📊</div>
                <h3>Comprehensive Analysis</h3>
                <p>15 categories, 2,597 image patches, and detailed statistical analysis for researchers</p>
              </div>
            </div>
            
            <div className="marida-cta">
              <button 
                className="marida-button"
                onClick={onNavigateToDocumentation}
              >
                Explore Dataset
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>
            Join thousands of environmentally conscious individuals using SawtchEarth's advanced platform 
            to monitor, analyze, and reduce their environmental impact.
          </p>
          <button className="cta-large" onClick={onStartCalculation}>
            <span>🌍</span>
            Start Environmental Analysis
            <span>→</span>
          </button>
          <div className="cta-features">
            <div className="cta-feature">
              <span>✓</span>
              <span>Free & Anonymous</span>
            </div>
            <div className="cta-feature">
              <span>✓</span>
              <span>Takes 5 Minutes</span>
            </div>
            <div className="cta-feature">
              <span>✓</span>
              <span>Personalized Results</span>
            </div>
            <div className="cta-feature">
              <span>✓</span>
              <span>AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;