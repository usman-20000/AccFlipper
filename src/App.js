import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Buy from './pages/Buy'; // Import the Buy page
import Sell from './pages/sell'; // Import the Sell page
import Exchange from './pages/Exchange'; // Make sure path matches your file structure
import LoadingScreen from './components/LoadingScreen';
import ScrollToTopButton from './components/ScrollToTopButton';
import ErrorBoundary from './ErrorBoundary';
import { initializeCounters } from './utils/animations';
import './App.css';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import EditSell from './pages/EditSell';
import AdminDashboard from './Admin/Dashboard';
import UserChat from './pages/UserChat';
import { BaseUrl, updateOnline } from './utils/data';

// Try to import AOS, but don't break if it's not installed
let AOS;
try {
  AOS = require('aos');
  require('aos/dist/aos.css');
} catch (e) {
  console.warn("AOS library is not installed. Run 'npm install aos' to enable animations.");
  AOS = {
    init: () => { },
    refresh: () => { }
  }; // Mock AOS if not available
}

function App() {
  const [loading, setLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const updateStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
      updateOnline(onlineStatus); // Update backend status
    };

    const handleTabClose = () => {
      updateOnline(false);
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    window.addEventListener("beforeunload", handleTabClose);

    // Run once on mount to update the status immediately
    updateStatus();

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);


  const finishLoading = () => {
    setLoading(false);

    // Give a small delay to ensure smooth transition
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'visible';
    }, 300);
  };

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = 'hidden';

    // Initialize AOS if available
    if (AOS) {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100,
        easing: 'ease-out-cubic',
        disable: window.innerWidth < 768 ? true : false // Disable on mobile
      });
    }

    // Simulate resource loading and preloading
    const preloadResources = async () => {
      try {
        // Simulate network requests and resource loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        setContentLoaded(true);
      } catch (error) {
        console.error('Error loading resources:', error);
        setContentLoaded(true); // Continue anyway to prevent getting stuck
      }
    };

    preloadResources();

    // Cleanup function
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  // Effect for handling postloading tasks once content is ready
  useEffect(() => {
    if (!loading && contentLoaded) {
      // Initialize counters and refresh animations
      setTimeout(() => {
        initializeCounters();
        if (AOS) AOS.refresh();
      }, 500);
    }
  }, [loading, contentLoaded]);

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          {loading ? (
            <LoadingScreen
              finishLoading={finishLoading}
              contentLoaded={contentLoaded}
            />
          ) : (
            <>
              <a href="#main-content" className="skip-link">Skip to content</a>
              <Header />
              <main id="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/buy" element={<Buy />} />
                  <Route path="/exchange" element={<Exchange />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/editsell/:id" element={<EditSell />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/chat" element={<UserChat />} />
                    <Route path="/chat/:recId" element={<UserChat />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
              {/* <ScrollToTopButton /> */}
            </>
          )}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
