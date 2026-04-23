'use client';

export default function TillidCard({
  score = 4.8,
  observations = 8,
  weightedAverage = 3.88,
  confidence = 0.63
}: {
  score?: number;
  observations?: number;
  weightedAverage?: number;
  confidence?: number;
}) {
  return (
    <div style={{
      width: '280px',
      height: 'auto',
      minHeight: '130px',
      backgroundColor: '#FFFFFF',
      borderRadius: '6px',
      border: '1px solid #E2E8F0',
      padding: '14px 18px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-inter), sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
          Tillidsnøjagtighed
        </span>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#A3CF3D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          fontWeight: 600,
          color: '#1a1a1a',
          lineHeight: 1
        }}>
          {score.toFixed(1)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '10px 0' }} />

      {/* Bottom Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 32px', 
        rowGap: '4px', 
        fontSize: '13px', 
        fontWeight: 400,
        color: '#1a1a1a',
        letterSpacing: '0',
        lineHeight: 1.2
      }}>
        <span>Observationer</span>
        <span style={{ textAlign: 'center' }}>{observations}</span>
        
        <span>Vægtet gennemsnit</span>
        <span style={{ textAlign: 'center' }}>{weightedAverage.toFixed(1)}</span>
        
        <span>Tillid</span>
        <span style={{ textAlign: 'center' }}>{confidence.toFixed(1)}</span>
      </div>
    </div>
  );
}
