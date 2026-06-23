import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import NavbarClient from './NavbarClient';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white px-4 md:px-8" style={{ height: '72px' }}>
      <div className="flex h-full items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <GraduationCap className="h-6 w-6 text-green-700" />
          <span>College<span className="text-green-700">Pilot</span></span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Colleges
          </Link>
          <Link href="/compare" className="hover:text-slate-900 transition-colors">
            Compare
          </Link>
          <Link href="/predictor" className="hover:text-slate-900 transition-colors">
            Predictor
          </Link>
        </div>

        {/* Right Side - Client Component for session */}
        <NavbarClient />

      </div>
    </nav>
  );
}