'use client';

export default function RatingCard({
  grade = 'A',
  score = 5
}: {
  grade?: string;
  score?: number;
}) {
  return (
    <div style={{
      width: 'fit-content',
      minWidth: '60px',
      height: '30px',
      backgroundColor: '#38B1DA',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 12px',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '14px',
      userSelect: 'none',
      flexShrink: 0
    }}>
      <span style={{ fontWeight: 800, color: '#1A4D61' }}>{grade}</span>
      <span style={{ fontWeight: 600, color: 'rgba(26, 77, 97, 0.7)', marginLeft: '4px' }}>/ {score}</span>
    </div>
  );
}
