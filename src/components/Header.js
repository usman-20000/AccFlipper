import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Handle scroll detection for header state changes
  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when pressing escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Prevent body scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'visible';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const navItems = [
    mobileMenuOpen && { name: 'Profile', path: '/Profile', onclick: () => setMobileMenuOpen(false) },
    { name: 'Home', path: '/', onclick: () => setMobileMenuOpen(false) },
    { name: 'Buy', path: '/buy', onclick: () => setMobileMenuOpen(false) },
    { name: 'Sell', path: '/sell', onclick: () => setMobileMenuOpen(false) },
    { name: 'Exchange', path: '/exchange', onclick: () => setMobileMenuOpen(false) },
    mobileMenuOpen && { name: 'Logout', path: '/Login', onclick: () => { setMobileMenuOpen(false); localStorage.clear(); } },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <a href="/" aria-label="AccFlipper Home">
            <h1>AccFlipper</h1>
          </a>
        </div>

        <button
          className="mobile-menu-icon"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className={`bar ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${mobileMenuOpen ? 'open' : ''}`}></div>
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} style={{ "--item-index": index }}>
                <a
                  href={item.path}
                  onClick={item.onClick}
                >
                  {item.name}
                </a>
              </li>

            ))}
            {!loggedIn ? (
              <li className="cta-nav-item" style={{ "--item-index": navItems.length }}>
                <a
                  href="/login"
                  className="nav-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In / Register
                </a>
              </li>
            ) : (
              <>
                {!mobileMenuOpen && <li className="profile-nav-item" style={{ "--item-index": navItems.length }}>
                  <button
                    className="profile-button"
                    onClick={toggleProfileMenu}
                  >
                    <img src={require('../assets/images/user.png')} style={{ height: 30, width: 30, marginTop: '15%' }} />
                  </button>
                  {profileMenuOpen && (
                    <div className="profile-dropdown">
                      <a href="/Profile" onClick={() => setProfileMenuOpen(false)}>Profile</a>
                      <a href="/Login" onClick={() => { setProfileMenuOpen(false); localStorage.clear(); }}>Logout</a>
                    </div>
                  )}
                </li>}
              </>
            )}
          </ul>
        </nav>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;