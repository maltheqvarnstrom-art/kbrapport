'use client';

import { useState } from 'react';

export default function SelectButton({ 
  label = '2016', 
  defaultActive = false 
}: { 
  label?: string; 
  defaultActive?: boolean;
}) {
  const [isActive, setIsActive] = useState(defaultActive);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '30px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '12px',
        fontWeight: isActive ? 700 : 400,
        letterSpacing: '0',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? '#2B3D5D' : '#F8FAFC',
        color: isActive ? '#FFFFFF' : '#CBD5E1',
        userSelect: 'none',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {label}
    </div>
  );
}
