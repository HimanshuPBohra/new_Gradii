"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollTextEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollTextEffect({ children, className = "" }: ScrollTextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Convert children to string and split into words
  const text = children?.toString() || "";
  const words = text.split(" ");
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Get the element's position relative to the viewport
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the top of the viewport
      // Normalized between 0 (element at bottom of viewport) and 1 (element at top of viewport)
      const progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Function to determine color for each word based on its position
  const getWordColor = (index: number) => {
    // Create a much more pronounced staggered effect
    const wordOffset = index * 0.08; // Significantly increased offset for more pronounced staggering
    const threshold = 0.1 + wordOffset; // Lower threshold to start transition earlier
    
    // Binary transition - either dark gray or white
    if (scrollProgress > threshold) {
      return "#FFFFFF"; // Pure white
    } else {
      return "#333333"; // Darker gray for better contrast
    }
  };
  
  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span 
          key={index}
          style={{ 
            color: getWordColor(index),
            transition: "color 0.3s ease",
            display: "inline-block",
            marginRight: "0.25em" // Add space between words
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}