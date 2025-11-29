import React, { useState } from 'react';
import './MainContent.css';

const MainContent = ({ onStartCalculation }) => {
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  
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
  
  const [currentFact] = useState(() => facts[Math.floor(Math.random() * facts.length)]);

  return (
    <div className="main-content">
      <div className="about-section">
        <h1>🌳About Carbon Footprint</h1>
        <p>
          A carbon footprint measures the total greenhouse gas emissions linked to an individual, 
          organization, event, or product. It's a crucial metric for gauging our impact on the 
          environment and climate change.
        </p>
        
        <h2>🌳Why It Matters</h2>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>🍃 Climate Impact</h4>
            <p>
              Reducing your carbon footprint directly contributes to global efforts against 
              climate change, mitigating extreme weather and rising temperatures.
            </p>
          </div>
          
          <div className="benefit-card">
            <h4>🍃 Resource Conservation</h4>
            <p>
              Cutting carbon often means using fewer natural resources, and promoting 
              sustainability in water, energy, and raw materials.
            </p>
          </div>
          
          <div className="benefit-card">
            <h4>🍃 Health and Well-being</h4>
            <p>
              Lowering emissions supports healthier lifestyle choices, improving air 
              quality and physical well-being.
            </p>
          </div>
          
          <div className="benefit-card">
            <h4>🍃 Sustainable Practices</h4>
            <p>
              Measuring and managing your carbon footprint encourages eco-friendly choices, 
              fostering a more sustainable society.
            </p>
          </div>
          
          <div className="benefit-card">
            <h4>🍃 Responsibility</h4>
            <p>
              Acknowledging and addressing your carbon impact demonstrates social and 
              environmental responsibility.
            </p>
          </div>
        </div>
        
        <div className="cta-section">
          <button 
            className="primary-button"
            onClick={onStartCalculation}
          >
            Calculate Your Carbon Footprint!
          </button>
        </div>
        
        <div className="did-you-know-section">
          <button 
            className="did-you-know-button"
            onClick={() => setShowDidYouKnow(!showDidYouKnow)}
          >
            ❔ Did You Know
          </button>
          
          {showDidYouKnow && (
            <div className="did-you-know-popup" onClick={() => setShowDidYouKnow(false)}>
              <p className="did-you-know-title">❔ Did you know</p>
              <p className="did-you-know-content">{currentFact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;