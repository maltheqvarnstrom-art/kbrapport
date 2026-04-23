'use client';

import { 
  Users, Shield, Calendar, FileText, NotebookPen, TrendingUp, Lightbulb, LucideIcon 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const menuItems: MenuItem[] = [
  { id: 'spillere', label: 'Spillere', icon: Users, href: '/spillere' },
  { id: 'player-card', label: 'PLAYER CARD', icon: FileText, href: '/player-card' },
  { id: 'klubber', label: 'Klubber', icon: Shield, href: '/klubber' },
  { id: 'kampe', label: 'Kampe', icon: Calendar, href: '/kampe' },
  { id: 'rapporter', label: 'Rapporter', icon: FileText, href: '/rapporter' },
  { id: 'noter', label: 'Noter', icon: NotebookPen, href: '/noter' },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp, href: '/predictions' },
  { id: 'tips', label: 'Tips', icon: Lightbulb, href: '/tips' },
];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <div className="sidebar-panel">

      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Shield size={18} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="sidebar-brand-title">KB Rapport</p>
          <p className="sidebar-brand-sub">v 1.0</p>
        </div>
      </div>

      {/* Section label */}
      <p className="sidebar-section-label">Scouting</p>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <item.icon
                size={17}
                strokeWidth={isActive ? 2.2 : 1.7}
                className="sidebar-item-icon"
              />
              <span className="sidebar-item-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-avatar">F</div>
        <div>
          <p className="sidebar-user-name">FCK Scouting</p>
          <p className="sidebar-user-sub">scouting@fck.dk</p>
        </div>
      </div>

    </div>
  );
}
