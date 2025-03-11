/**
 * Animates number counting up to a target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} targetValue - The final value to count up to
 * @param {number} duration - Animation duration in milliseconds
 */
export const animateCountUp = (element, targetValue, duration = 2000) => {
  if (!element) return;
  
  const startValue = parseInt(element.textContent) || 0;
  const increment = (targetValue - startValue) / (duration / 16);
  let currentValue = startValue;
  
  const counter = setInterval(() => {
    currentValue += increment;
    if (
      (increment > 0 && currentValue >= targetValue) || 
      (increment < 0 && currentValue <= targetValue)
    ) {
      element.textContent = targetValue;
      clearInterval(counter);
    } else {
      element.textContent = Math.round(currentValue);
    }
  }, 16);
};

/**
 * Initializes all number counters on the page
 */
export const initializeCounters = () => {
  const countElements = document.querySelectorAll('.count-up');
  
  if (!countElements.length) return;
  
  countElements.forEach(element => {
    const targetValue = parseInt(element.getAttribute('data-count'));
    if (isNaN(targetValue)) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(element, targetValue);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
};

/**
 * Animate elements when they come into view
 * (Alternative to AOS if needed)
 */
export const initializeScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
};
