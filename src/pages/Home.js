import React, { useEffect } from 'react';
import './Home.css';
import TestimonialSlider from '../components/TestimonialSlider';
import { initializeCounters } from '../utils/animations';

// Try to import AOS, but don't break if it's not installed
let AOS;
try {
  AOS = require('aos');
  require('aos/dist/aos.css');
} catch (e) {
  console.warn("AOS library is not installed. Run 'npm install aos' to enable animations.");
  AOS = { init: () => {} }; // Mock AOS if not available
}

const Home = () => {
  useEffect(() => {
    // Initialize AOS if available
    if (AOS) {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50,
        disable: window.innerWidth < 768 ? true : false // Disable on mobile
      });
    }

    // Initialize counters when component mounts
    setTimeout(() => {
      initializeCounters();
    }, 500);
    
    // Add scroll event listener for parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      
      // Only apply parallax effect on devices that can handle it well
      if (heroContent && window.innerWidth > 768) {
        // Apply parallax only when element is in viewport
        if (scrollPosition < 600) {
          heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
          heroContent.style.opacity = Math.max(0, 1 - scrollPosition / 600);
        }
      } else if (heroContent) {
        // Reset transform for mobile devices
        heroContent.style.transform = 'none';
        heroContent.style.opacity = 1;
      }
    };
    
    // Handle resize events for better responsiveness
    const handleResize = () => {
      // Reset parallax effect on small screens
      if (window.innerWidth <= 768) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = 'none';
          heroContent.style.opacity = 1;
        }
      }
      
      // Refresh AOS animations on resize
      if (AOS) {
        AOS.refresh();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Helper function for data-aos attributes
  const aosAttr = (animation, delay = 0) => {
    return AOS ? { 'data-aos': animation, 'data-aos-delay': delay } : {};
  };

  return (
    <main className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <h1 {...aosAttr('fade-up')}>The Ultimate Account Marketplace</h1>
          <p {...aosAttr('fade-up', 100)}>AccFlipper helps you value, buy, sell, and exchange digital accounts at the best market rates</p>
          <button className="cta-button" {...aosAttr('fade-up', 200)}>Start Trading</button>
        </div>
        <div className="hero-shape"></div>
      </section>
      
      {/* Stats section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" {...aosAttr('fade-up')}>
              <div className="stat-number count-up" data-count="500">0</div>
              <div className="stat-label">Successful Deals</div>
            </div>
            <div className="stat-item" {...aosAttr('fade-up', 100)}>
              <div className="stat-number count-up" data-count="95">0</div>
              <div className="stat-label">Client Satisfaction %</div>
            </div>
            <div className="stat-item" {...aosAttr('fade-up', 200)}>
              <div className="stat-number count-up" data-count="12">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item" {...aosAttr('fade-up', 300)}>
              <div className="stat-number count-up" data-count="250">0</div>
              <div className="stat-label">Premium Clients</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="features">
        <div className="container">
          <h2 {...aosAttr('fade-up')}>Our Premium Services</h2>
          <p className="section-subtitle" {...aosAttr('fade-up', 100)}>The complete platform for digital account trading</p>
          
          <div className="feature-grid">
            <div className="feature-card" {...aosAttr('flip-left')}>
              <div className="feature-icon">
                {/* Valuation Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11H3V9H21V11ZM21 13H3V15H21V13ZM12 20L3 17V5L12 2L21 5V17L12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Expert Valuation</h3>
              <p>Accurate market-based assessment of your account's worth using our proprietary analytics.</p>
              <a href="/services/valuation" className="feature-link">Learn More</a>
            </div>
            
            <div className="feature-card" {...aosAttr('flip-left', 100)}>
              <div className="feature-icon">
                {/* Buy/Sell Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 9H20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Buy & Sell</h3>
              <p>Access our marketplace of verified accounts or list your own with our secure transaction process.</p>
              <a href="/services/marketplace" className="feature-link">Visit Marketplace</a>
            </div>
            
            <div className="feature-card" {...aosAttr('flip-left', 200)}>
              <div className="feature-icon">
                {/* Exchange Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 1L21 5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 23L3 19L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Account Exchange</h3>
              <p>Trade your digital assets for others of similar value through our secure exchange platform.</p>
              <a href="/services/exchange" className="feature-link">Exchange Now</a>
            </div>
            
            <div className="feature-card" {...aosAttr('flip-left', 300)}>
              <div className="feature-icon">
                {/* Secure Transfer Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C12 11 14 11 14 9C14 7.34315 12.6569 6 11 6C9.34315 6 8 7.34315 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Secure Transfers</h3>
              <p>Protected transaction processes with escrow services and verified buyer/seller screening.</p>
              <a href="/services/transfer" className="feature-link">Learn More</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* About section */}
      <section className="about-brief">
        <div className="container">
          <div className="about-content">
            <div className="about-text" {...aosAttr('fade-right')}>
              <h2>The AccFlipper Advantage</h2>
              <p>With over a decade of experience in the digital asset marketplace, our team brings unparalleled expertise to every transaction. We've facilitated thousands of successful account trades across gaming, social media, and content platforms.</p>
              <p>Our secure platform ensures safe transactions for buyers and sellers, with verified accounts, secure payment processing, and comprehensive escrow services to protect all parties.</p>
              <button className="secondary-button">Learn More About Us</button>
            </div>
            <div className="about-image" {...aosAttr('fade-left')}>
              <div className="image-placeholder"></div>
              <div className="floating-badge">Trusted by 500+ clients worldwide</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process section */}
      <section className="process">
        <div className="container">
          <h2 {...aosAttr('fade-up')}>How It Works</h2>
          <p className="section-subtitle" {...aosAttr('fade-up', 100)}>Easy account trading in three simple steps</p>
          
          <div className="timeline">
            <div className="timeline-item" {...aosAttr('fade-up')}>
              <div className="timeline-number">1</div>
              <h3>List or Browse</h3>
              <p>Submit your account for valuation and listing, or browse our marketplace of verified accounts.</p>
            </div>
            
            <div className="timeline-item" {...aosAttr('fade-up', 100)}>
              <div className="timeline-number">2</div>
              <h3>Negotiate & Agree</h3>
              <p>Communicate with buyers/sellers through our secure platform and agree on a price or exchange.</p>
            </div>
            
            <div className="timeline-item" {...aosAttr('fade-up', 200)}>
              <div className="timeline-number">3</div>
              <h3>Secure Transfer</h3>
              <p>Complete the transaction with our escrow service ensuring secure payment and account transfer.</p>
            </div>
          </div>
          
          <div className="process-cta" {...aosAttr('zoom-in')}>
            <h3>Ready to trade accounts?</h3>
            <div className="dual-cta">
              <button className="cta-button">Sell Your Account</button>
              <button className="secondary-button action-button">Browse Accounts</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="testimonials">
        <div className="container">
          <h2 {...aosAttr('fade-up')}>Success Stories</h2>
          <TestimonialSlider />
        </div>
      </section>
      
      {/* CTA section */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content" {...aosAttr('zoom-in')}>
            <h2>Join the Leading Account Marketplace</h2>
            <p>Buy, sell, or exchange digital accounts with confidence and security</p>
            <div className="cta-buttons">
              <button className="cta-button">Create Account</button>
              <button className="secondary-button invert">View Marketplace</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
