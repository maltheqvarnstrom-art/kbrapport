'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({
  placeholder = 'Søg',
  width = '240px'
}: {
  placeholder?: string;
  width?: string | number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: width,
      height: '36px',
      backgroundColor: isFocused ? '#FFFFFF' : '#F8FAFC',
      border: `1px solid ${isFocused ? '#2B3D5D' : '#E2E8F0'}`,
      borderRadius: '9999px',
      padding: '0 16px',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-inter), sans-serif',
      transition: 'all 0.2s ease',
    }}>
      <input 
        type="text" 
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          border: 'none',
          backgroundColor: 'transparent',
          outline: 'none',
          fontSize: '13px',
          color: '#1a1a1a',
          padding: 0,
          margin: 0,
          width: '100%'
        }}
      />
      <Search 
        size={18} 
        color="#2B3D5D" 
        strokeWidth={2.5} 
        style={{ marginLeft: '8px', flexShrink: 0 }} 
      />
    </div>
  );
}
