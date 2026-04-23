'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const designMenuItems = [
    { label: 'Spillere', href: '/spillere' },
    { label: 'Player Card', href: '/player-card' },
    { label: 'Design elementer', href: '/elements' },
    { label: 'Farvepalette', href: '/colors' },
    { label: 'Typografi', href: '/typography' },
  ];

  return (
    <div className="ds-root">
      {/* Left sidebar — minimal text links */}
      <aside className="ds-sidebar">
        {designMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`ds-nav-link ${pathname === item.href ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <main className="ds-main">
        {children}
      </main>
    </div>
  );
}
