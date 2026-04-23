'use client';

import { useState } from 'react';

/**
 * Utility to determine if text should be dark or light based on hex color
 */
function getContrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65 ? '#000000' : '#ffffff';
}

function ColorSwatch({ color, height = '110px' }: { color: string; height?: string }) {
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
        width: '110px',
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

export default function ColorsPage() {
  const row1 = ['#38b6ff', '#a3cf3d', '#ffde38', '#ffad38', '#ff8c69'];
  const row2 = ['#006b8f', '#6b8f00', '#8f7200', '#8f5200', '#8f2000'];
  const row3 = ['#000c40', '#2b3d5d', '#3b4d6d', '#6b7d9d', '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#000000'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* Row 1 + Row 2: primary swatches */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          {row1.map((color) => (
            <ColorSwatch key={color} color={color} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          {row2.map((color) => (
            <ColorSwatch key={color} color={color} height="36px" />
          ))}
        </div>
      </div>

      {/* Row 3: greyscale spectrum */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', paddingTop: '24px', borderTop: '1px solid #f0f0f0', flexWrap: 'wrap' }}>
        {row3.map((color) => (
          <ColorSwatch key={color} color={color} />
        ))}
      </div>

    </div>
  );
}
