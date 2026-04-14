'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Database, 
  LayoutDashboard, 
  BrainCog 
} from 'lucide-react';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-48 bg-white border-r border-[#e8e1da] flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 pb-8 flex justify-center w-full">
        <Link href="/" className="flex items-center justify-center">
          <div className="relative h-12 w-12">
            <Image 
              src="/logo.png" 
              alt="FCK Logo" 
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <Link 
          href="/spillere" 
          className={`block px-4 py-2 text-sm transition-colors ${
            pathname.startsWith('/spillere') 
              ? 'text-[#003d88] font-bold' 
              : 'text-slate-400 font-medium hover:text-slate-600'
          }`}
        >
          Spillere
        </Link>
        <Link 
          href="/klubber" 
          className={`block px-4 py-2 text-sm transition-colors ${
            pathname.startsWith('/klubber') 
              ? 'text-[#003d88] font-bold' 
              : 'text-slate-400 font-medium hover:text-slate-600'
          }`}
        >
          Klubber
        </Link>
        <Link 
          href="/noter" 
          className={`block px-4 py-2 text-sm transition-colors ${
            pathname.startsWith('/noter') 
              ? 'text-[#003d88] font-bold' 
              : 'text-slate-400 font-medium hover:text-slate-600'
          }`}
        >
          Noter
        </Link>
        <Link 
          href="/predictions" 
          className={`block px-4 py-2 text-sm transition-colors ${
            pathname.startsWith('/predictions') 
              ? 'text-[#003d88] font-bold' 
              : 'text-slate-400 font-medium hover:text-slate-600'
          }`}
        >
          Forudsigelser
        </Link>
      </nav>

      {/* User Info (moved from TopNav or mirrored here if desired, but we can just keep bottom spacing clean) */}
      <div className="p-6 border-t border-[#e8e1da]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#003d88] flex items-center justify-center text-white font-bold text-sm shrink-0">
            MQ
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-sm font-semibold text-slate-900 truncate">Malthe</p>
            <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-wider">U6-U9</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
