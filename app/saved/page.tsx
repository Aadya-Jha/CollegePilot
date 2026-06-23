'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CollegeCard from '@/components/CollegeCard';
import { toast } from 'sonner';
import { Bookmark } from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  fees: number;
  overallRating: number;
  description: string;
  averagePackage: string;
  nirfRank?: number;
}

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Please sign in to view saved colleges');
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      const fetchSaved = async () => {
        try {
          const res = await fetch('/api/saved');
          const data = await res.json();
          setColleges(data);
        } catch {
          toast.error('Failed to load saved colleges');
        } finally {
          setLoading(false);
        }
      };
      fetchSaved();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Saved Colleges</h1>
          <p className="text-slate-500 text-sm">Colleges you've bookmarked for later.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-slate-400">Loading...</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-16 text-center">
            <Bookmark className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium mb-1">No saved colleges yet</p>
            <p className="text-slate-400 text-sm">Click the bookmark icon on any college card to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}