import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Users, 
  Tag, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { CollegeEvent } from '../types';

interface EventCardProps {
  event: CollegeEvent;
  onRegister: (event: CollegeEvent) => void;
  onViewDetails: (event: CollegeEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  onViewDetails
}) => {
  const availableSeats = Math.max(0, event.maxCapacity - event.registeredCount);
  const fillPercentage = Math.min(100, Math.round((event.registeredCount / event.maxCapacity) * 100));
  const isSoldOut = availableSeats === 0;

  // Category Color mapping
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Technical Symposium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Workshop':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Cultural Fest':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Sports Day':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Paper Presentation':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Coding Competition':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400/80 transition-all duration-200 overflow-hidden group">
      
      {/* Decorative Top Accent */}
      <div className={`h-2.5 bg-gradient-to-r ${event.bannerGradient}`}></div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Category & Department Header */}
        <div className="flex items-start justify-between gap-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadge(event.category)}`}>
            {event.category}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[150px]" title={event.department}>
              {event.department}
            </span>
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 flex-1">
          <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Meta Info: Date, Time, Venue */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100/90 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-900">{event.date}</span>
            <span className="text-slate-300">•</span>
            <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-slate-700 truncate">{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-slate-700 truncate font-medium" title={event.venue}>
              {event.venue}
            </span>
          </div>
        </div>

        {/* Available Registration Information */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              Registration Status:
            </span>
            <span className={`font-bold ${isSoldOut ? 'text-rose-600' : availableSeats <= 25 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {isSoldOut ? 'Registration Closed (Full)' : `${availableSeats} Seats Remaining`}
            </span>
          </div>

          {/* Capacity Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                fillPercentage >= 95 ? 'bg-rose-500' : fillPercentage >= 75 ? 'bg-amber-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{event.registeredCount} Students Enrolled</span>
            <span>Total Capacity: {event.maxCapacity}</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2.5">
        <button
          onClick={() => onViewDetails(event)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-white rounded-xl border border-slate-200 transition-colors text-center cursor-pointer"
        >
          Event Details
        </button>

        <button
          onClick={() => onRegister(event)}
          disabled={isSoldOut}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl text-center shadow-xs transition-all cursor-pointer ${
            isSoldOut
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 shadow-blue-500/20'
          }`}
        >
          {isSoldOut ? 'Sold Out' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};
