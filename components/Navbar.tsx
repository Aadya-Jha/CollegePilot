// src/components/Navbar.tsx
import Link from 'next/link';
import { GraduationCap, GitCompare, Sparkles, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8 py-3">
      <div className="flex h-14 items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span>Edu<span className="text-blue-600">Discover</span></span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="flex items-center gap-1.5 hover:text-foreground transition-colors text-foreground">
            <Search className="h-4 w-4" />
            Find Colleges
          </Link>
          <Link href="/compare" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <GitCompare className="h-4 w-4" />
            Compare
          </Link>
          <Link href="/predictor" className="flex items-center gap-1.5 hover:text-foreground transition-colors text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100">
            <Sparkles className="h-4 w-4" />
            Predictor
          </Link>
        </div>
      </div>
    </nav>
  );
}