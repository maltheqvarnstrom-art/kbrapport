'use client';

import { useState } from 'react';

interface ViewToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  onToggle?: (active: 'left' | 'right') => void;
  initial?: 'left' | 'right';
}

export default function ViewToggle({
  leftLabel = 'Hub',
  rightLabel = 'Analyse',
  onToggle,
  initial = 'left'
}: ViewToggleProps) {
  const [active, setActive] = useState<'left' | 'right'>(initial);

  const handleToggle = (side: 'left' | 'right') => {
    setActive(side);
    if (onToggle) onToggle(side);
  };

  return (
    <div style={{
      display: 'inline-flex',
      width: '180px',
      height: '32px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '9999px',
      padding: '2px',
      boxSizing: 'border-box',
      userSelect: 'none',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      <div 
        onClick={() => handleToggle('left')}
        style={{
          flex: 1,
          height: '100%',
          borderRadius: '9999px',
          backgroundColor: active === 'left' ? '#2B3D5D' : 'transparent',
          color: active === 'left' ? '#FFFFFF' : '#2B3D5D',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 12px'
        }}
      >
        {leftLabel}
      </div>
      <div 
        onClick={() => handleToggle('right')}
        style={{
          flex: 1,
          height: '100%',
          borderRadius: '9999px',
          backgroundColor: active === 'right' ? '#2B3D5D' : 'transparent',
          color: active === 'right' ? '#FFFFFF' : '#2B3D5D',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 12px'
        }}
      >
        {rightLabel}
      </div>
    </div>
  );
}
