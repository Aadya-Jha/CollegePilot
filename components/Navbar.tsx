import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white px-4 md:px-8" style={{ height: '72px' }}>
      <div className="flex h-full items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span>College<span className="text-blue-600">Pilot</span></span>
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

        {/* Right Side */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <LanguageToggle />
          <div id="google_translate_element" className="hidden" />
          <Link href="/saved" className="text-slate-600 hover:text-slate-900 transition-colors">
            Saved
          </Link>
          <Link href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}