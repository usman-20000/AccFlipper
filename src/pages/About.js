import React from 'react';
import './About.css';

const About = () => {
  // Services data array
  const services = [
    {
      id: 1,
      title: 'Account Valuation',
      description: 'Get accurate and fair valuations for digital accounts, games, and online assets. Our experienced team uses market data and analytics to determine the true value of your accounts.',
      icon: 'valuation'
    },
    {
      id: 2,
      title: 'Buy Accounts',
      description: 'Purchase verified accounts with confidence. All accounts undergo thorough verification and come with transaction protection for buyers.',
      icon: 'buy'
    },
    {
      id: 3,
      title: 'Sell Accounts',
      description: 'Turn your digital assets into cash with our streamlined selling process. Reach genuine buyers and receive secure payments for your accounts.',
      icon: 'sell'
    },
    {
      id: 4,
      title: 'Exchange Services',
      description: 'Trade accounts without cash transactions. Our exchange platform helps you swap digital assets fairly with other members of the community.',
      icon: 'exchange'
    }
  ];

  // Team members data
  const team = [
    {
      name: 'Basharat Ijaz',
      role: 'Founder & CEO',
      bio: 'With over 8 years in digital asset trading, Basharat founded AccFlipper to create a secure platform for account transactions.'
    },
    {
      name: 'Khadija Bisma',
      role: 'Head of Valuations',
      bio: 'Khadija  leads our valuation team, ensuring fair and accurate pricing for all digital assets on our platform.'
    },
    {
      name: 'Asim Ijaz',
      role: 'Security Specialist',
      bio: 'Asim ensures that all transactions and accounts meet our strict security standards before being listed.'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About AccFlipper</h1>
          <p className="subtitle">The trusted marketplace for digital account transactions</p>
          <p className="description">
            Founded in 2018, AccFlipper has become the leading platform for valuing, buying, selling, and exchanging digital accounts. 
            Our mission is to create a secure and transparent marketplace where users can confidently trade their digital assets.
          </p>
        </div>
      </section>

      {/* Services section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive solutions for digital account trading</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <div className="service-card" key={service.id}>
              <div className={`service-icon ${service.icon}`}>
                <div className="icon-inner"></div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How AccFlipper Works</h2>
          <p>Simple, secure, and straightforward</p>
        </div>
        
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Account Submission</h3>
            <p>Submit your account details through our secure platform for valuation or listing.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Verification & Valuation</h3>
            <p>Our team verifies account details and provides an accurate market valuation.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Listing & Matching</h3>
            <p>Your account gets listed on our marketplace or matched with potential buyers/sellers.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Secure Transaction</h3>
            <p>Complete the transaction through our secure escrow system with full protection.</p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Our Team</h2>
          <p>The experts behind AccFlipper</p>
        </div>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="member-image">
                <div className="placeholder-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Security */}
      <section className="trust-section">
        <div className="section-header">
          <h2>Trust & Security</h2>
          <p>Why thousands choose AccFlipper for their digital asset transactions</p>
        </div>
        
        <div className="trust-features">
          <div className="trust-feature">
            <h3>Secure Transactions</h3>
            <p>All transactions are protected by our escrow service, ensuring both parties are satisfied before completion.</p>
          </div>
          
          <div className="trust-feature">
            <h3>Verified Accounts</h3>
            <p>We thoroughly verify all account details to ensure authenticity before listing on our platform.</p>
          </div>
          
          <div className="trust-feature">
            <h3>Fair Valuations</h3>
            <p>Our valuation system uses market data and expert analysis to ensure fair pricing for all accounts.</p>
          </div>
          
          <div className="trust-feature">
            <h3>24/7 Support</h3>
            <p>Our dedicated support team is available around the clock to assist with any questions or issues.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="cta-section">
        <h2>Ready to get started with AccFlipper?</h2>
        <p>Join thousands of satisfied users who safely buy, sell, and exchange digital accounts on our platform.</p>
        <div className="cta-buttons">
          <a href="/login" className="cta-button primary">Create Account</a>
          <a href="/contact" className="cta-button secondary">Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default About;
