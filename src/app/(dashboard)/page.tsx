'use client';

import FootballPitch from "@/components/FootballPitch";
import ViewToggle from "@/components/ViewToggle";
import ColorSwatch from "@/components/ColorSwatch";
import { Bell, ChevronRight, Search } from "lucide-react";

export default function DashboardPage() {
  const row1 = ['#38b6ff', '#a3cf3d', '#ffde38', '#ffad38', '#ff8c69'];
  const row2 = ['#006b8f', '#6b8f00', '#8f7200', '#8f5200', '#8f2000'];
  const row3 = ['#000c40', '#2b3d5d', '#3b4d6d', '#6b7d9d', '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#000000'];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '360px 240px 1fr', 
      gap: '48px', 
      padding: '0 24px',
      maxHeight: '100vh',
      overflow: 'hidden'
    }}>

      {/* Column 1: Design Elements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Design Elementer</p>
          <FootballPitch />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ViewToggle />
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', color: '#666' }}>
            <Bell size={20} />
            <ChevronRight size={20} />
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Column 2: Color Palette */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Farvepalette</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
              {row1.map(c => <ColorSwatch key={c} color={c} width="100%" height="80px" />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginTop: '4px' }}>
              {row2.map(c => <ColorSwatch key={c} color={c} width="100%" height="24px" />)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '24px' }}>
            {row3.map(c => <ColorSwatch key={c} color={c} width="100%" height="44px" />)}
          </div>
        </div>
      </div>

      {/* Column 3: Typography & Tokens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', overflowY: 'auto', paddingRight: '12px' }} className="hide-scrollbar">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Typografi</p>
              {[
                { label: 'Header Big', class: 'header-big', desc: '20px' },
                { label: 'Menu Bold', class: 'menu-bold', desc: '16px' },
                { label: 'Header Small', class: 'header-small', desc: '14px' },
                { label: 'Brødtekst', class: 'brodtekst', desc: '12px' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                  <span className={item.class} style={{ fontSize: 'inherit' }}>{item.desc}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>FCK Identity</p>
              {[
                { label: 'Header FCK', class: 'header-fck', desc: 'Bold 12px' },
                { label: 'Brødtekst FCK', class: 'brodtekst-fck', desc: 'Bold 12px' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                  <span className={item.class}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tokens */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Identity Tokens</p>
            {[
              { name: 'Primary Navy', value: '#2B3D5D', color: '#2b3d5d', light: false },
              { name: 'Secondary Blue', value: '#3B4D6D', color: '#3b4d6d', light: false },
              { name: 'Pure White', value: '#FFFFFF', color: '#ffffff', light: true },
              { name: 'Light Grey', value: '#F8FAFC', color: '#f8fafc', light: true },
              { name: 'Border Grey', value: '#E2E8F0', color: '#e2e8f0', light: true },
            ].map((token) => (
              <div key={token.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: token.color,
                  borderRadius: '4px',
                  border: token.light ? '1px solid #eee' : 'none',
                }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>{token.name}</span>
                  <span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace' }}>{token.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
