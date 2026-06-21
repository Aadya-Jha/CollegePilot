// src/components/CollegeCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, IndianRupee, ArrowRight } from 'lucide-react';

interface CollegeCardProps {
  college: {
    id: string;
    name: string;
    location: string;
    type: string;
    fees: number;
    overallRating: number;
    description: string;
    averagePackage: string;
  };
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between bg-white">
      <div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-slate-100 border flex items-center justify-center font-bold text-blue-600 text-lg flex-shrink-0">
              {college.name.substring(0, 2)}
            </div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {college.overallRating}
            </div>
          </div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight mt-3 group-hover:text-blue-600 transition-colors">
            {college.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 font-medium">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span>{college.location}</span>
            <span className="mx-1">•</span>
            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase">
              {college.type}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2 border-t border-dashed mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm py-1">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Avg Fees / Year</p>
              <p className="font-bold text-slate-700 flex items-center gap-0.5 mt-0.5">
                <IndianRupee className="h-3.5 w-3.5 text-slate-600" />
                {college.fees >= 100000 ? `${(college.fees / 100000).toFixed(2)} Lakh` : college.fees.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Avg Package</p>
              <p className="font-bold text-emerald-600 mt-0.5">
                {college.averagePackage}
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">
            {college.description}
          </p>
        </CardContent>
      </div>

      <CardFooter className="p-4 bg-slate-50 border-t flex justify-end gap-2">
        <Link href={`/colleges/${college.id}`} className="w-full">
          <Button size="sm" className="w-full text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all">
            View Deep Analytics <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}