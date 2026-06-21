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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-10 text-white mb-8 shadow-md">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Find Your Ideal College</h1>
          <p className="text-blue-100 mb-6 text-sm md:text-base max-w-2xl">
            Explore and filter through India's premier institutes based on cutting-edge parameters, fees, placements, and locations.
          </p>
          <div className="relative max-w-xl shadow-lg rounded-lg overflow-hidden">
            <Input 
              type="text" 
              placeholder="Search by college name, city or branch..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
              className="w-full bg-white text-black pl-4 pr-12 py-6 border-none focus-visible:ring-2 focus-visible:ring-blue-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Filter className="h-5 w-5" />
            </div>
          </div>
        </div>

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