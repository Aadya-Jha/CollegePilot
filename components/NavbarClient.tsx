'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import LanguageToggle from './LanguageToggle';
import { toast } from 'sonner';

export default function NavbarClient() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success('Signed out successfully');
  };

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <div id="google_translate_element" className="hidden" />
      <LanguageToggle />
      
      {session ? (
        <>
          <Link href="/saved" className="text-slate-600 hover:text-slate-900 transition-colors">
            Saved
          </Link>
          <span className="text-slate-400 text-xs">Hi, {session.user?.name?.split(' ')[0]}</span>
          <button
            onClick={handleSignOut}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/saved" className="text-slate-600 hover:text-slate-900 transition-colors">
            Saved
          </Link>
          <Link href="/auth/signin" className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
            Sign In
          </Link>
        </>
      )}
    </div>
  );
}