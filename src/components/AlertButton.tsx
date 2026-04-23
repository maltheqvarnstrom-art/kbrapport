'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function AlertButton({
  initialHasAlert = false,
  size = 36
}: {
  initialHasAlert?: boolean;
  size?: number;
}) {
  // We use state here just to let the user click it and test the color change
  const [hasAlert, setHasAlert] = useState(initialHasAlert);

  return (
    <div 
      onClick={() => setHasAlert(!hasAlert)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: hasAlert ? '#F64545' : '#2B3D5D',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        padding: 0,
        userSelect: 'none'
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      title={hasAlert ? "New notifications!" : "No new notifications"}
    >
      <Bell size={size * 0.55} color="#FFFFFF" strokeWidth={2.5} />
    </div>
  );
}
