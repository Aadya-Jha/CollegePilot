// src/app/colleges/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, Star, MapPin, Building, Award, 
  TrendingUp, Briefcase, GraduationCap, DollarSign, CheckCircle2, Loader2 
} from 'lucide-react';

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the individual college data along with nested relations from our backend endpoint
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch('/api/colleges');
        if (!response.ok) throw new Error('Network response failure');
        const allColleges = await response.json();
        
        // Find matching college based on dynamic route param ID
        const match = allColleges.find((c: any) => c.id === params.id);
        setCollege(match || null);
      } catch (error) {
        console.error('Error loading deep analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCollegeDetails();
    }
  }, [params.id]);

  // Loading Spinner Guard
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-green-700 animate-spin" />
        </div>
      </div>
    );
  }

  // Fallback view if item isn't in database
  if (!college) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2">College Data Not Found</h2>
          <p className="text-slate-500 mb-4">The institute you are looking for does not exist in our database.</p>
          <Button onClick={() => router.push('/')}>Return to Discovery Hub</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <Navbar />

      {/* Breadcrumb Navigation Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" /> Back to Search
            </Button>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-500 truncate">{college.name}</span>
        </div>
      </div>

      {/* Main Hero Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white text-indigo-950 flex items-center justify-center font-black text-2xl md:text-3xl shadow-xl flex-shrink-0 border-2 border-indigo-400">
              {college.name.substring(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase">
                  {college.type} Institute
                </span>
                {college.nirfRank && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Award className="h-3 w-3" /> NIRF Rank: #{college.nirfRank}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-slate-300 text-sm font-medium">
                <p className="flex items-center gap-1"><MapPin className="h-4 w-4 text-indigo-400" /> {college.location}</p>
              </div>
            </div>
          </div>
          
          {/* Main Scoring Metric block */}
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center gap-4 w-full md:w-auto shadow-inner">
            <div className="bg-amber-500 text-slate-950 h-12 w-12 rounded-xl flex flex-col items-center justify-center font-black text-xl shadow-lg">
              {college.overallRating}
            </div>
            <div>
              <div className="flex text-amber-400 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(college.overallRating) ? 'fill-current' : 'text-slate-600'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Container Control Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl w-full justify-start overflow-x-auto gap-1 shadow-sm h-auto flex-wrap">
            <TabsTrigger value="overview" className="rounded-lg py-2.5 px-4 font-semibold text-sm data-[state=active]:bg-slate-100 data-[state=active]:text-green-700">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-lg py-2.5 px-4 font-semibold text-sm data-[state=active]:bg-slate-100 data-[state=active]:text-green-700">Courses & Cutoffs</TabsTrigger>
            <TabsTrigger value="placements" className="rounded-lg py-2.5 px-4 font-semibold text-sm data-[state=active]:bg-slate-100 data-[state=active]:text-green-700">Placements Analytics</TabsTrigger>
          </TabsList>

          {/* TAB CONTENT: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm">
                <CardHeader><CardTitle className="text-lg font-bold text-slate-800">About the Institute</CardTitle></CardHeader>
                <CardContent className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                  <p>{college.description}</p>
                  <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Campus Type</p>
                        <p className="font-semibold text-slate-700">{college.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Average Fees</p>
                        <p className="font-semibold text-slate-700">₹{(college.fees / 100000).toFixed(2)} Lakh / year</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm h-fit">
                <CardHeader><CardTitle className="text-lg font-bold text-slate-800">Instant Highlights</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {['AICTE Approved', 'NBA Accredited Campus', 'Top Tier Infrastructure', 'Excellent Corporate Links'].map((item, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB CONTENT: COURSES */}
          <TabsContent value="courses" className="outline-none">
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">Offered Programs & Admission Standards</CardTitle>
                <CardDescription>Tuition structures and closing thresholds calculated on recent intake rounds.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold text-slate-700">Specialization Branch</TableHead>
                        <TableHead className="font-bold text-slate-700">Duration</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">Annual Fees</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">JEE Cutoff Rank</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {college.courses?.map((course: any, idx: number) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50">
                          <TableCell className="font-semibold text-slate-800">{course.name}</TableCell>
                          <TableCell className="text-slate-500 text-sm">{course.duration}</TableCell>
                          <TableCell className="text-right font-medium text-slate-700">₹{course.fees.toLocaleString('en-IN')}</TableCell>
                          <TableCell className="text-right font-bold text-green-700 bg-green-50/30">{course.cutoffRank.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB CONTENT: PLACEMENTS */}
          <TabsContent value="placements" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Average Compensation Package</CardTitle>
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-800 tracking-tight">{college.averagePackage}</div>
                  <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" /> Steady growth over prior assessment cycle
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Peak Domestic Offer</CardTitle>
                  <Briefcase className="h-5 w-5 text-indigo-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-indigo-600 tracking-tight">{college.highestPackage}</div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Secured within premium engineering and core streams</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader><CardTitle className="text-base font-bold text-slate-800">Prominent Recruiting Partners</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2.5">
                  {college.topRecruiters?.map((company: string, i: number) => (
                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}