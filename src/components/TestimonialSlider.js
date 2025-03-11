import React, { useState, useEffect, useCallback } from 'react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      quote: "AccFlipper's valuation was spot-on. They helped me sell my account for 3x what I initially thought it was worth!",
      author: "Michael R.",
      role: "Gaming Account Seller",
      avatar: "" // Add path to image if available
    },
    {
      quote: "The team's growth strategy increased my account's follower count by 200% in just two months, resulting in a significant value increase.",
      author: "Jennifer L.",
      role: "Social Media Influencer",
      avatar: "" // Add path to image if available
    },
    {
      quote: "As a buyer, I appreciate AccFlipper's verification process. I've purchased multiple accounts through them with complete confidence.",
      author: "David T.",
      role: "Digital Entrepreneur",
      avatar: "" // Add path to image if available
    }
  ];

  // Use useCallback to memoize these functions
  const goToTestimonial = useCallback((index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [activeIndex, isAnimating]);

  const goToNextTestimonial = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  }, [activeIndex, goToTestimonial, testimonials.length]);

  const goToPrevTestimonial = useCallback(() => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToTestimonial(prevIndex);
  }, [activeIndex, goToTestimonial, testimonials.length]);

  useEffect(() => {
    // Auto-rotate testimonials every 5 seconds
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNextTestimonial();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating, goToNextTestimonial]);

  return (
    <div className="testimonial-container">
      <button 
        className="testimonial-nav-arrow prev-arrow" 
        onClick={goToPrevTestimonial}
        aria-label="Previous testimonial"
      >
        &#10094;
      </button>
      
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className={`testimonial-slide ${index === activeIndex ? 'active' : ''}`}
            style={{ transform: `translateX(${(index - activeIndex) * 100}%)` }}
          >
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p>{testimonial.quote}</p>
              <div className="testimonial-author">
                {testimonial.avatar ? (
                  <div 
                    className="author-avatar" 
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                  ></div>
                ) : (
                  <div className="author-avatar">{testimonial.author.charAt(0)}</div>
                )}
                <div>
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="testimonial-nav-arrow next-arrow" 
        onClick={goToNextTestimonial}
        aria-label="Next testimonial"
      >
        &#10095;
      </button>
      
      <div className="testimonial-nav" data-aos="fade-up">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => goToTestimonial(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
