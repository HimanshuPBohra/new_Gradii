"use client";
import { useEffect, useRef, useState } from 'react';

const ScrollSection = () => {
  const textContent = "Traditional wealth management is broken & you need a better way to manage your money. Using unbiased data driven";
  const additionalContent = "decisions, we ensure your investment journey is successful so you can focus on what matters most to you";
  
  const textWords = textContent.split(' ');
  const additionalWords = additionalContent.split(' ');
  const sectionRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Add custom styles for the animation
    const style = document.createElement('style');
    style.innerHTML = `
      .word-reveal {
        display: inline-block;
        transition: color 0.5s ease;
        font-weight: 700;
      }
      .word-gray {
        color: rgba(255, 255, 255, 0.2);
      }
      .word-white {
        color: rgba(255, 255, 255, 1);
      }
    `;
    document.head.appendChild(style);
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has been scrolled through the viewport
      // Adjusted to start the effect later - when section is more visible
      const scrollProgress = 1 - ((rect.top + (rect.height * 0.4)) / windowHeight);
      setScrollPosition(Math.max(0, Math.min(1, scrollProgress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);
  
  // Get word class based on scroll position - only two states: gray or white
  const getWordClass = (index : number) => {
    // Calculate total number of words to ensure proper distribution
    const totalWords = textWords.length + additionalWords.length;
    
    // Create a more evenly distributed staggered effect
    // Ensure the last words also get triggered by using a smaller increment
    const wordThreshold = 0.5 + (index * (0.4 / totalWords));
    
    // Binary color change - either gray or white
    return scrollPosition > wordThreshold ? 'word-white' : 'word-gray';
  };
  
  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-black px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight">
          {textWords.map((word, index) => (
            <span 
              key={index} 
              className={`word-reveal mr-2 mb-2 ${getWordClass(index)}`}
            >
              {word}
            </span>
          ))}
          {' '}
          {additionalWords.map((word, index) => (
            <span 
              key={`add-${index}`} 
              className={`word-reveal mr-2 mb-2 ${getWordClass(textWords.length + index)}`}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default ScrollSection;