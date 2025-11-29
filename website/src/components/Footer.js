import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🌱</span>
              <div className="footer-brand-text">
                <h3>SawtchEarth</h3>
                <p>Environmental Intelligence Platform</p>
              </div>
            </div>
            <p className="footer-description">
              Empowering individuals and organizations to understand, measure, and reduce their 
              environmental impact through data-driven insights and actionable recommendations.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">🐦</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">💼</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">💻</a>
              <a href="mailto:contact@sawtchearth.com" aria-label="Email" className="social-link">📧</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://www.epa.gov/ghgemissions" target="_blank" rel="noopener noreferrer">EPA Emissions Data</a></li>
                <li><a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer">IPCC Reports</a></li>
                <li><a href="https://www.carbonfootprint.com/" target="_blank" rel="noopener noreferrer">Carbon Footprint Ltd</a></li>
                <li><a href="https://www.globalcarbonproject.org/" target="_blank" rel="noopener noreferrer">Global Carbon Project</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Take Action</h4>
              <ul>
                <li><a href="https://www.tema.org.tr/en/homepage" target="_blank" rel="noopener noreferrer">Plant Trees</a></li>
                <li><a href="https://www.energy.gov/energysaver" target="_blank" rel="noopener noreferrer">Energy Efficiency</a></li>
                <li><a href="https://www.epa.gov/recycle" target="_blank" rel="noopener noreferrer">Recycling Guide</a></li>
                <li><a href="https://www.climateaction.org/" target="_blank" rel="noopener noreferrer">Climate Action</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Learn More</h4>
              <ul>
                <li><a href="/about">About Environmental Impact</a></li>
                <li><a href="/methodology">Our Methodology</a></li>
                <li><a href="/faq">Frequently Asked Questions</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Tools</h4>
              <ul>
                <li><a href="/calculator">Environmental Calculator</a></li>
                <li><a href="/chatbot">AI Assistant</a></li>
                <li><a href="/api">Developer API</a></li>
                <li><a href="/mobile">Mobile App</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Calculations Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2.5M</span>
            <span className="stat-label">Tons CO₂ Tracked</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Trees Planted</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">User Satisfaction</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-legal">
            <p>&copy; {currentYear} SawtchEarth. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
          {/* <div className="footer-tech">
            <span>Built with ❤️ using React & AI</span>
            <div className="footer-badges">
              <span className="badge">🌱 Carbon Neutral</span>
              <span className="badge">♻️ Sustainable</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;