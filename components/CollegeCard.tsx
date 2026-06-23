import Link from 'next/link';
import { MapPin, Star, TrendingUp, IndianRupee } from 'lucide-react';

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
    nirfRank?: number;
  };
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const initials = college.name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  const feesDisplay = college.fees >= 100000
    ? `₹${(college.fees / 100000).toFixed(1)}L / yr`
    : `₹${college.fees.toLocaleString('en-IN')} / yr`;

  return (
    <Link href={`/colleges/${college.id}`}>
      <div className="bg-white border border-slate-200 rounded-xl p-5 border-l-4 border-l-blue-600 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col justify-between">
        
        {/* Top Row */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="h-11 w-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0">
              {initials || college.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex items-center gap-1 text-amber-600 text-sm font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {college.overallRating}
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1">
            {college.name}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span>{college.location}</span>
            <span>•</span>
            <span className={`font-medium ${college.type === 'Public' ? 'text-green-600' : 'text-orange-500'}`}>
              {college.type}
            </span>
            {college.nirfRank && (
              <>
                <span>•</span>
                <span className="text-slate-400">NIRF #{college.nirfRank}</span>
              </>
            )}
          </div>

          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {college.description}
          </p>
        </div>

        {/* Bottom Stats */}
        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Avg Fees</p>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-0.5">
              {feesDisplay}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Avg Package</p>
            <p className="text-sm font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              {college.averagePackage}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}