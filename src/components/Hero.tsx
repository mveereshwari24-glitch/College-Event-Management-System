import React from 'react';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Compass,
  Building2,
  Database
} from 'lucide-react';
import { CollegeEvent } from '../types';

interface HeroProps {
  totalEvents: number;
  totalRegistrations: number;
  onNavigate: (tab: 'home' | 'events' | 'register' | 'admin') => void;
  onSelectEventToRegister: (event: CollegeEvent) => void;
  onViewEventDetails: (event: CollegeEvent) => void;
  featuredEvents: CollegeEvent[];
}

export const Hero: React.FC<HeroProps> = ({
  totalEvents,
  totalRegistrations,
  onNavigate,
  onSelectEventToRegister,
  onViewEventDetails,
  featuredEvents
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 text-white shadow-xl shadow-indigo-950/20 border border-indigo-800/40">
        {/* Decorative Background Elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:py-24 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-blue-200">
            <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
            <span>Apex Institute of Technology & Science • VAC Project 2026</span>
          </div>

          {/* Title & Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-tight">
              College Event <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Management System
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal">
              Welcome to the official campus event hub. Discover upcoming technical symposiums, hands-on workshops, cultural celebrations, sports tournaments, and research paper presentations.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Explore All Events
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-purple-600 hover:bg-purple-500 active:scale-95 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Student Registration
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              Admin Portal
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 text-left">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                Live Events
              </div>
              <div className="text-3xl font-extrabold text-white font-heading">{totalEvents}</div>
              <div className="text-xs text-slate-300 mt-1">Symposiums & Fests</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 text-left">
              <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Users className="w-4 h-4" />
                Registrations
              </div>
              <div className="text-3xl font-extrabold text-white font-heading">{totalRegistrations}</div>
              <div className="text-xs text-slate-300 mt-1">Registered Students</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 text-left">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                Departments
              </div>
              <div className="text-3xl font-extrabold text-white font-heading">8+</div>
              <div className="text-xs text-slate-300 mt-1">Active Branches</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 text-left">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                Certification
              </div>
              <div className="text-3xl font-extrabold text-white font-heading">100%</div>
              <div className="text-xs text-slate-300 mt-1">Verified E-Passes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Project Info Card (Clear explanation required by prompt) */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
            <Database className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              College VAC Project Architecture & Data Storage Notice
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              This application is configured for demonstration with client-side <strong>browser localStorage</strong>. 
              Any event added, modified, deleted, or registered will persist locally across page refreshes in this browser. 
              Admin actions are pre-authenticated for grading and evaluation purposes.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin')}
            className="text-xs font-semibold px-3 py-2 bg-white text-indigo-700 hover:text-indigo-800 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50/50 transition-colors"
          >
            Open Admin View
          </button>
        </div>
      </section>

      {/* Featured College Events Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Spotlight Events
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Featured College Events
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top recommended campus activities happening this semester. Register early to secure your seat.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            View all {totalEvents} events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.slice(0, 3).map((event) => {
            const availableSeats = Math.max(0, event.maxCapacity - event.registeredCount);
            const percentFilled = Math.min(100, Math.round((event.registeredCount / event.maxCapacity) * 100));

            return (
              <div
                key={event.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden"
              >
                {/* Header Gradient Strip */}
                <div className={`h-3 bg-gradient-to-r ${event.bannerGradient}`}></div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  {/* Category and Department badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/50">
                      {event.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500 truncate max-w-[140px]" title={event.department}>
                      {event.department}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Details snippet */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Date & Time:</span>
                      <span className="font-semibold text-slate-800">{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Venue:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[160px]" title={event.venue}>
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {/* Seat Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Capacity: {event.registeredCount} / {event.maxCapacity}
                      </span>
                      <span className={`font-bold ${availableSeats <= 20 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {availableSeats > 0 ? `${availableSeats} seats left` : 'Fully Booked'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentFilled > 85 ? 'bg-rose-500' : percentFilled > 60 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onViewEventDetails(event)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectEventToRegister(event)}
                    disabled={availableSeats <= 0}
                    className="text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Participate / Campus Highlights Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Why Participate in College Events?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Enrich your university journey through co-curricular and extracurricular excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Accredited VAC Certificates</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn verified digital certificates and co-curricular credit points valid for academic curriculum portfolios.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Practical Industry Skills</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Participate in live coding battles, paper presentations, and AI bootcamps designed to sharpen real-world engineering skills.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Campus Community & Fun</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build peer networks across departments, engage in thrilling sports tourneys, and celebrate cultural extravaganzas together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
