'use client';

import { useState } from 'react';

function getContrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65 ? '#000000' : '#ffffff';
}

export default function ColorSwatch({ color, height = '110px', width = '110px' }: { color: string; height?: string; width?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const textColor = getContrastColor(color);

  return (
    <div
      onClick={handleCopy}
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: '3px',
        border: color.toLowerCase() === '#ffffff' ? '1px solid #e8e8e8' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.1s ease',
        userSelect: 'none',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span
        style={{
          color: textColor,
          fontSize: '10px',
          fontWeight: 600,
          fontFamily: 'var(--font-inter), sans-serif',
          opacity: copied ? 0 : 0.6,
          transition: 'opacity 0.2s ease',
        }}
      >
        {color.toUpperCase()}
      </span>

      {copied && (
        <span
          style={{
            position: 'absolute',
            color: textColor,
            fontSize: '10px',
            fontWeight: 700,
            fontFamily: 'var(--font-fck-sans), sans-serif',
          }}
        >
          COPIED!
        </span>
      )}
    </div>
  );
}
