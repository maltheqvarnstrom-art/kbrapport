'use client';

import { useState } from 'react';

const RATINGS = [
  { label: 'A', bg: '#3CB4E5' },
  { label: 'B+', bg: '#A3CF3D' },
  { label: 'B', bg: '#FCD12A' },
  { label: 'C+', bg: '#FCAE31' },
  { label: 'C', bg: '#FF8A5C' },
];

export default function RatingSelect() {
  const [active, setActive] = useState<string | null>('B+');

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {RATINGS.map((rating) => {
        const isActive = active === rating.label;
        
        return (
          <div
            key={rating.label}
            onClick={() => setActive(rating.label)}
            style={{
              width: '60px',
              height: '37px',
              backgroundColor: rating.bg,
              // Darken the text using a semi-transparent black overlay effect
              color: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'var(--font-inter), sans-serif',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s ease',
              // Dim the inactive ones so the active one stands out
              opacity: isActive ? 1 : 0.4,
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {rating.label}
          </div>
        );
      })}
    </div>
  );
}
