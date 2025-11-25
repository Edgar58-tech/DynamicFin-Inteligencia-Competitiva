import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  suffix = '', 
  decimals = 0 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value.toString());
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <span>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};