'use client';

import { useState } from 'react';

const positions = [
  { x: 50, y: 9  },
  { x: 20, y: 23 }, { x: 50, y: 23 }, { x: 80, y: 23 },
  { x: 20, y: 38 }, { x: 50, y: 38 }, { x: 80, y: 38 },
  { x: 20, y: 54 }, { x: 50, y: 54 }, { x: 80, y: 54 },
  { x: 20, y: 69 }, { x: 50, y: 69 }, { x: 80, y: 69 },
  { x: 50, y: 88 }, // goalkeeper
];

export default function FootballPitch({ 
  states: externalStates, 
  onPositionClick: externalClick,
}: { 
  states?: number[], 
  onPositionClick?: (i: number) => void 
} = {}) {
  // Internal fallback state when used as uncontrolled (e.g. on Elements page)
  const [internalStates, setInternalStates] = useState<number[]>(positions.map(() => 0));

  const isControlled = externalStates !== undefined;
  const states = isControlled ? externalStates : internalStates;
  const handleClick = (i: number) => {
    if (isControlled && externalClick) {
      externalClick(i);
    } else {
      setInternalStates(prev => prev.map((s, idx) => idx === i ? (s + 1) % 5 : s));
    }
  };

  return (
    <div className="pitch">
      <div className="players" style={{ width: '100%', height: '100%' }}>
        {positions.map((pos, i) => (
          <div
            key={i}
            className="circle"
            data-state={states[i]}
            onClick={() => handleClick(i)}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
          />
        ))}
      </div>

      <svg className="goal-svg" viewBox="0 0 340 430" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="
            M 148,359 A 22,22 0 0 1 192,359
            M 80,430 L80,367 Q80,359 90,359 L250,359 Q260,359 260,367 L260,430
            M 125,430 L125,393 Q125,387 132,387 L208,387 Q215,387 215,393 L215,430
          " 
          fill="none" 
          stroke="rgba(255,255,255,0.25)" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
