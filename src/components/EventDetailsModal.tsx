import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Users, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  FileText, 
  ListOrdered,
  ArrowRight
} from 'lucide-react';
import { CollegeEvent } from '../types';

interface EventDetailsModalProps {
  event: CollegeEvent | null;
  onClose: () => void;
  onRegister: (event: CollegeEvent) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onRegister
}) => {
  if (!event) return null;

  const availableSeats = Math.max(0, event.maxCapacity - event.registeredCount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner header */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${event.bannerGradient} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
              <span>{event.category}</span>
              <span>•</span>
              <span>{event.department}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-snug">
              {event.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-100 max-w-xl opacity-90">
              {event.eligibility}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Key Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Event Date</span>
                <span className="font-semibold text-slate-900">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Timing</span>
                <span className="font-semibold text-slate-900">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Venue</span>
                <span className="font-semibold text-slate-900">{event.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Seats Availability</span>
                <span className="font-semibold text-slate-900">
                  {event.registeredCount} / {event.maxCapacity} ({availableSeats} seats open)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Event Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Guidelines & Rules
              </h4>
              <ul className="space-y-1.5 pl-1">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule / Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-indigo-600" />
                Event Program Schedule
              </h4>
              <div className="space-y-2 border-l-2 border-indigo-200 pl-3">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <span className="font-semibold text-indigo-700">{item.time}</span>
                    <p className="text-slate-600">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Contact Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 text-xs">
            <span className="font-bold text-slate-900 block">Faculty / Staff Coordinator:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-medium truncate">{event.coordinatorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{event.coordinatorPhone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span className="truncate">{event.coordinatorEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRegister(event);
            }}
            disabled={availableSeats <= 0}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            {availableSeats > 0 ? (
              <>
                Proceed to Registration
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              'Event Fully Booked'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
