'use client';

import { useState } from 'react';

interface TripleToggleProps {
  options: [string, string, string];
  onChange?: (active: string) => void;
  initialIndex?: number;
}

export default function TripleToggle({
  options = ['Observationer', 'Noter', 'Predictions'],
  onChange,
  initialIndex = 0
}: TripleToggleProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onChange) onChange(options[index]);
  };

  return (
    <div style={{
      display: 'inline-flex',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '9999px',
      padding: '3px',
      boxSizing: 'border-box',
      userSelect: 'none',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      {options.map((option, index) => (
        <div 
          key={option}
          onClick={() => handleClick(index)}
          style={{
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: activeIndex === index ? '#2B3D5D' : 'transparent',
            color: activeIndex === index ? '#FFFFFF' : '#64748B',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
