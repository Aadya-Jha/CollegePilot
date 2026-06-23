'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { X, Star, IndianRupee, Award, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  fees: number;
  overallRating: number;
  nirfRank?: number;
  description: string;
  highestPackage: string;
  averagePackage: string;
  topRecruiters: string[];
}

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges?search=&location=All&type=All&maxFees=1000000');
        const data = await res.json();
        setAllColleges(data);
        if (data.length >= 2) {
          setSelectedIds([data[0].id, data[1].id]);
        }
      } catch {
        toast.error('Failed to load colleges');
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const activeColleges = selectedIds
    .map(id => allColleges.find(c => c.id === id))
    .filter(Boolean) as College[];

  const availableColleges = allColleges.filter(c => !selectedIds.includes(c.id));

  const handleAdd = (idToAdd: string) => {
    if (selectedIds.length >= 3) {
      toast.error('Maximum 3 colleges allowed');
      return;
    }
    setSelectedIds(prev => [...prev, idToAdd]);
    toast.success('College added to comparison');
  };

  const handleRemove = (idToRemove: string) => {
    setSelectedIds(prev => prev.filter(id => id !== idToRemove));
    toast.info('College removed from comparison');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-slate-400">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Compare Colleges</h1>
          <p className="text-slate-500 text-sm mt-1">
            Analyze critical metrics side-by-side to make a data-backed decision.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-sm flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Add to Comparison:</span>
          {selectedIds.length < 3 ? (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAdd(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Choose a college...</option>
              {availableColleges.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          ) : (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Maximum 3 colleges reached
            </span>
          )}
        </div>

        {activeColleges.length === 0 ? (
          <Card className="border-dashed border-2 py-16 text-center">
            <CardContent>
              <p className="text-slate-400 font-medium">No colleges selected for comparison.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[220px] font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Parameters
                  </TableHead>
                  {activeColleges.map((college) => (
                    <TableHead key={college.id} className="p-6 min-w-[250px] relative border-l border-slate-100">
                      <div className="flex justify-between items-start gap-4">
                        <div className="font-bold text-slate-800 text-sm leading-tight pr-4">
                          {college.name}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(college.id)}
                          className="h-6 w-6 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full absolute top-4 right-4"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" /> {college.location}
                      </p>
                    </TableHead>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, idx) => (
                    <TableHead key={idx} className="bg-slate-50/40 border-l border-slate-100 p-6 text-center text-xs text-slate-400 italic">
                      Empty Slot
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">Overall Rating</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        {college.overallRating} <span className="text-slate-400 font-normal text-xs">/ 5</span>
                      </div>
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">NIRF Ranking</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4 font-semibold text-slate-800 text-sm">
                      {college.nirfRank ? (
                        <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded text-xs w-fit">
                          <Award className="h-3.5 w-3.5" /> Rank #{college.nirfRank}
                        </span>
                      ) : 'N/A'}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">Annual Fees</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4 font-bold text-slate-800 text-sm">
                      <div className="flex items-center text-slate-700">
                        <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                        {college.fees >= 100000 ? `${(college.fees / 100000).toFixed(1)} Lakh` : college.fees.toLocaleString('en-IN')}
                      </div>
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">Avg Package</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4 font-bold text-emerald-600 text-sm">
                      {college.averagePackage}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">Highest Package</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4 font-bold text-indigo-600 text-sm">
                      {college.highestPackage}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-bold text-slate-700 text-xs bg-slate-50/30">Top Recruiters</TableCell>
                  {activeColleges.map((college) => (
                    <TableCell key={college.id} className="border-l p-4">
                      <div className="flex flex-wrap gap-1">
                        {college.topRecruiters.slice(0, 3).map((comp, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-600 border px-2 py-0.5 rounded text-[10px] font-medium">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - activeColleges.length }).map((_, i) => <TableCell key={i} className="border-l bg-slate-50/10" />)}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}