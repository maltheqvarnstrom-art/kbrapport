'use client';

export default function UserAvatar({
  initials = 'MQ',
  size = 50
}: {
  initials?: string;
  size?: number;
}) {
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: '#2B3D5D',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        color: '#FFFFFF',
        letterSpacing: '0',
        transition: 'transform 0.1s ease',
        userSelect: 'none'
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      title="User Settings / Logout"
      onClick={() => alert("Open User Settings Menu")}
    >
      <style>{`.avatar-fck-override { font-size: 24px !important; }`}</style>
      <span className="header-fck avatar-fck-override">{initials}</span>
    </div>
  );
}
