import React, { useEffect, useState, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ finishLoading, contentLoaded }) => {

  const [counter, setCounter] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const loadingRef = useRef(null);
  
  useEffect(() => {
    let interval;
    
    if (contentLoaded) {
      interval = setInterval(() => {
        setCounter(prevCounter => {
          const increment = prevCounter < 70 ? 5 : 3;
          const newValue = prevCounter + increment;
          
          if (newValue >= 100) {
            clearInterval(interval);
            setIsCompleted(true);
            return 100;
          }
          return newValue;
        });
      }, 50);
    } else {
      // Slow loading progress until content is ready
      interval = setInterval(() => {
        setCounter(prevCounter => {
          // Only load up to 70% while waiting for content
          if (prevCounter >= 70) {
            clearInterval(interval);
            return 70;
          }
          return prevCounter + 1;
        });
      }, 30);
    }

    return () => clearInterval(interval);
  }, [contentLoaded]);
  
  // Handle completion animation and finishLoading
  useEffect(() => {
    if (isCompleted) {
      // Add completed class for animation
      if (loadingRef.current) {
        loadingRef.current.classList.add('completed');
      }
      
      // Wait for fade-out animation before finishing
      setTimeout(() => {
        finishLoading();
      }, 800);
    }
  }, [isCompleted, finishLoading]);

  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="letter" style={{"--i": 1}}>A</span>
          <span className="letter" style={{"--i": 2}}>c</span>
          <span className="letter" style={{"--i": 3}}>c</span>
          <span className="letter" style={{"--i": 4}}>F</span>
          <span className="letter" style={{"--i": 5}}>l</span>
          <span className="letter" style={{"--i": 6}}>i</span>
          <span className="letter" style={{"--i": 7}}>p</span>
          <span className="letter" style={{"--i": 8}}>p</span>
          <span className="letter" style={{"--i": 9}}>e</span>
          <span className="letter" style={{"--i": 10}}>r</span>
        </div>
        <p className="loading-tagline">Buy • Sell • Exchange</p>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${counter}%` }}></div>
        </div>
        <div className="loading-text">Loading {counter}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
