'use client';

export default function TypographyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '640px' }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inter Branding</p>
        {[
          { label: 'Header Big', class: 'header-big', desc: 'Semi Bold 20px / -5% Tracking' },
          { label: 'Menu Bold', class: 'menu-bold', desc: 'Semi Bold 16px / -5% Tracking' },
          { label: 'Menu Regular', class: 'menu-regular', desc: 'Regular 16px / -5% Tracking' },
          { label: 'Header Small', class: 'header-small', desc: 'Medium 14px / -5% Tracking' },
          { label: 'Brødtekst', class: 'brodtekst', desc: 'Regular 12px / -5% Tracking' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontSize: '10px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
            <span className={item.class}>{item.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FCK Identity</p>
        {[
          { label: 'Header FCK', class: 'header-fck', desc: 'FCK Sans Bold 12px / 0% Tracking' },
          { label: 'Brødtekst FCK', class: 'brodtekst-fck', desc: 'FCK Serif Bold 12px / 0% Tracking' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontSize: '10px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
            <span className={item.class}>{item.desc}</span>
          </div>
        ))}
      </div>



    </div>
  );
}
