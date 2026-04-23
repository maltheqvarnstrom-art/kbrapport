'use client';

import Image from 'next/image';

export default function ReceiptCard() {
  return (
    <div style={{
      width: '347px',
      height: '577px',
      borderRadius: '16px', // Typically popups have slightly rounded corners, adjusting if SVG has them transparent
      overflow: 'hidden',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
      backgroundColor: '#FFFFFF',
      display: 'inline-block'
    }}>
      <Image 
        src="/Receipt.svg" 
        alt="Oprettet Spiller/Note Kvittering" 
        width={347} 
        height={577} 
        style={{ display: 'block' }}
        priority
      />
    </div>
  );
}
