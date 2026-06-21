// src/components/FilterSidebar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal } from 'lucide-react';

interface FilterSidebarProps {
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  maxFees: number;
  setMaxFees: (val: number) => void;
  locations: string[];
  onReset: () => void;
}

export default function FilterSidebar({
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  maxFees,
  setMaxFees,
  locations,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit sticky top-24 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" /> Filters
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset} 
          className="text-xs text-blue-600 hover:text-blue-700 h-auto p-0"
        >
          Clear All
        </Button>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">State/Region</label>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
        >
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      {/* College Classification Filter */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">College Type</label>
        <div className="flex gap-2">
          {['All', 'Public', 'Private'].map((type) => (
            <Button
              key={type}
              type="button"
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              className="flex-1 text-xs"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Maximum Fees Slider Range */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Annual Fees</label>
          <span className="text-xs font-bold text-blue-600">₹{(maxFees / 100000).toFixed(1)}L</span>
        </div>
        <Slider 
          min={50000} 
          max={400000} 
          step={10000} 
          value={[maxFees]} 
          onValueChange={(val) => setMaxFees(val[0])}
          className="py-2"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
          <span>₹50K</span>
          <span>₹4L+</span>
        </div>
      </div>
    </div>
  );
}