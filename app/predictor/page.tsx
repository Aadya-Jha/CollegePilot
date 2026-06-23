'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sparkles, HelpCircle, GraduationCap, ArrowUpRight, AlertCircle,Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Course {
  name: string;
  cutoffRank: number;
  fees: number;
}

interface College {
  id: string;
  name: string;
  location: string;
  courses: Course[];
}

interface PredictionResult {
  collegeId: string;
  collegeName: string;
  location: string;
  courseName: string;
  cutoffRank: number;
  fees: number;
  chance: 'High Chance' | 'Medium Chance' | 'Dream Match';
}

export default function PredictorPage() {
  const { data: session } = useSession();
  const [rank, setRank] = useState<string>('');
  const [stream, setStream] = useState<string>('All');
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges?search=&location=All&type=All&maxFees=1000000');
        const data = await res.json();
        setColleges(data);
      } catch {
        toast.error('Failed to load college data');
      }
    };
    fetchColleges();
  }, []);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const userRank = parseInt(rank);

    if (isNaN(userRank) || userRank <= 0) {
      toast.error('Please enter a valid rank');
      return;
    }

    setLoading(true);
    const results: PredictionResult[] = [];

    colleges.forEach((college) => {
      college.courses?.forEach((course) => {
        const matchesStream = stream === 'All' || course.name.toLowerCase().includes(stream.toLowerCase());

        if (matchesStream) {
          let chance: 'High Chance' | 'Medium Chance' | 'Dream Match' | null = null;

          if (userRank <= course.cutoffRank * 0.85) {
            chance = 'High Chance';
          } else if (userRank <= course.cutoffRank) {
            chance = 'Medium Chance';
          } else if (userRank <= course.cutoffRank * 1.15) {
            chance = 'Dream Match';
          }

          if (chance) {
            results.push({
              collegeId: college.id,
              collegeName: college.name,
              location: college.location,
              courseName: course.name,
              cutoffRank: course.cutoffRank,
              fees: course.fees,
              chance,
            });
          }
        }
      });
    });

    results.sort((a, b) => a.cutoffRank - b.cutoffRank);
    setPredictions(results);
    setHasSearched(true);
    setLoading(false);

    if (results.length === 0) {
      toast.error('No colleges found for your rank');
    } else {
      toast.success(`Found ${results.length} colleges matching your rank!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Input Form */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-slate-200 shadow-sm h-fit sticky top-24">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-700" /> Rank Predictor
                </CardTitle>
                <CardDescription className="text-slate-500 text-xs">
                  Enter your rank to find matching colleges.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handlePredict} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Exam</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-semibold text-slate-700 outline-none">
                      <option>JEE Main / Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Your AIR Rank</label>
                    <Input
                      type="number"
                      placeholder="e.g., 4500"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-200 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Preferred Stream</label>
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-semibold text-slate-700 outline-none"
                    >
                      <option value="All">All Disciplines</option>
                      <option value="Computer">Computer Science</option>
                      <option value="Electronics">Electronics & Communication</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold"
                  >
                    {loading ? 'Predicting...' : 'Predict Colleges'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-2">
            {!hasSearched ? (
              <div className="bg-white border rounded-xl border-slate-200 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[350px]">
                <HelpCircle className="h-12 w-12 text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-700 text-base">Enter your rank to get started</h3>
                <p className="text-sm text-slate-400 max-w-sm mt-1">
                  Fill in your rank and stream on the left to see matching colleges.
                </p>
              </div>
            ) : predictions.length === 0 ? (
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-8 text-center shadow-sm flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-amber-500 mb-2" />
                <h3 className="font-bold text-amber-800 text-base">No Matches Found</h3>
                <p className="text-xs text-amber-600 max-w-md mt-1">
                  Try entering a different rank or changing the stream filter.
                </p>
              </div>
            ) : (
              <Card className="bg-white border-slate-200 shadow-sm overflow-x-auto">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-lg font-bold text-slate-800">
                    {predictions.length} Colleges Found
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Sorted by cutoff rank — best matches first.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold text-slate-700 text-xs">College</TableHead>
                        <TableHead className="font-bold text-slate-700 text-xs">Course</TableHead>
                        <TableHead className="font-bold text-slate-700 text-xs text-right">Cutoff Rank</TableHead>
                        <TableHead className="font-bold text-slate-700 text-xs text-center">Chance</TableHead>
                        <TableHead className="w-[40px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50">
                          <TableCell className="p-4">
                            <p className="font-bold text-slate-800 text-sm">{item.collegeName}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{item.location}</p>
                          </TableCell>
                          <TableCell className="p-4 text-sm font-medium text-slate-600">
                            {item.courseName}
                          </TableCell>
                          <TableCell className="p-4 text-right font-bold text-slate-700 text-sm">
                            {item.cutoffRank.toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell className="p-4 text-center">
                            <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              item.chance === 'High Chance'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : item.chance === 'Medium Chance'
                                ? 'bg-green-50 text-green-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {item.chance}
                            </span>
                          </TableCell>
                          <TableCell className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={async (e) => {
                                  e.preventDefault();
                                  if (!session) {
                                    toast.error('Please sign in to save colleges');
                                    return;
                                  }
                                  await fetch('/api/saved', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ collegeId: item.collegeId }),
                                  });
                                  toast.success('College saved!');
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-green-700 hover:bg-green-50 transition-colors"
                              >
                                <Bookmark className="h-4 w-4" />
                              </button>
                              <Link href={`/colleges/${item.collegeId}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-700 rounded-lg">
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}