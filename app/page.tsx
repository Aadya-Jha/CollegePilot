// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FilterSidebar from '@/components/FilterSidebar';
import CollegeCard from '@/components/CollegeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Loader2 } from 'lucide-react';

export default function ListingPage() {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [maxFees, setMaxFees] = useState(400000);
  const [visibleCount, setVisibleCount] = useState(6);

  // Dynamic States for API Data
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded unique location categories for UI filters mapping
  const staticLocations = ['All','Mumbai', 'Pilani', 'Delhi', 'Tamil Nadu', 'Pune', 'Bengaluru'];

  // Connected Database API Trigger Fetch Hook
  useEffect(() => {
    const fetchFilteredColleges = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          search: searchQuery,
          location: selectedLocation,
          type: selectedType,
          maxFees: maxFees.toString(),
        });

        const response = await fetch(`/api/colleges?${queryParams.toString()}`);
        if (!response.ok) throw new Error('API network response error');
        
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Failed fetching matching records:', error);
      } finally {
        setLoading(false);
      }
    };

    // 300ms Debounce to prevent server hammering on fast typing
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredColleges();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedLocation, selectedType, maxFees]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedType('All');
    setMaxFees(400000);
    setVisibleCount(6);
  };

  const displayedColleges = colleges.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Top Search Hero Banner */}
        <section className="mb-12">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold tracking-wide uppercase text-blue-700 mb-3">
            College Discovery Platform
          </p>

          <h1 className="font-heading text-5xl md:text-6xl leading-tight text-slate-900 mb-4">
            Find the Right College
            <br />
            For Your Future
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mb-8 leading-relaxed">
            Explore colleges, compare fees and placements, and make
            informed admission decisions with reliable data from top
            institutions across India.
          </p>

          <div className="max-w-2xl">
            <Input
              type="text"
              placeholder="Search colleges, cities, courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="h-14 rounded-xl border-slate-300 bg-white text-base shadow-sm"
            />
          </div>
        </div>
        </section>

        {/* Two Column Workspace Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Component Block */}
          <FilterSidebar 
            selectedLocation={selectedLocation}
            setSelectedLocation={(val) => { setSelectedLocation(val); setVisibleCount(6); }}
            selectedType={selectedType}
            setSelectedType={(val) => { setSelectedType(val); setVisibleCount(6); }}
            maxFees={maxFees}
            setMaxFees={(val) => { setMaxFees(val); setVisibleCount(6); }}
            locations={staticLocations}
            onReset={handleReset}
          />

          {/* Results Output Canvas */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-800 font-bold">{colleges.length}</span> colleges matching your criteria
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : displayedColleges.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium mb-2">No colleges match your current filters.</p>
                <Button size="sm" variant="outline" onClick={handleReset}>Reset Search Settings</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedColleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Pagination Load Button */}
                {colleges.length > visibleCount && (
                  <div className="flex justify-center mt-10">
                    <Button 
                      variant="outline" 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="px-8 font-semibold border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      Load More Colleges
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}