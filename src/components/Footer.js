import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AccFlipper</h3>
            <p>The premier marketplace for buying, selling and exchanging digital accounts with expert valuation and secure transactions.</p>
            <div className="social-links">
              <a href="https://twitter.com/accflipper" className="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="https://facebook.com/accflipper" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com/accflipper" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
              </a>
              <a href="https://linkedin.com/accflipper" className="social-link" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://youtube.com/@accflipper" className="social-link" aria-label="Youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.38a2.78 2.78 0 00-1.95 2 29.94 29.94 0 00-.46 5.58 29.94 29.94 0 00.46 5.58 2.78 2.78 0 001.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.38a2.78 2.78 0 001.95-2 29.94 29.94 0 00.46-5.58 29.94 29.94 0 00-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              <li><a href="/valuation">Account Valuation</a></li>
              <li><a href="/buy">Buy Accounts</a></li>
              <li><a href="/sell">Sell Accounts</a></li>
              <li><a href="/exchange">Account Exchange</a></li>
              <li><a href="/transfer">Secure Transfers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="/pricing">Pricing and Fees</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/report">Report A Problem</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: contact@accflipper.com</p>
            <p>Phone: +92 (305) 845-2080</p>
            <p>Address: 123 Canal Avenue, Khawaja Banglows<br />Rahim Yar Khan, Pakistan 64200</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AccFlipper. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
