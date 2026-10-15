import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  CalendarDays,
  UserCheck,
  Home
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'events' | 'register' | 'admin';
  setActiveTab: (tab: 'home' | 'events' | 'register' | 'admin') => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  totalEventsCount: number;
  totalRegistrationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  totalEventsCount,
  totalRegistrationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'events' | 'register' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & College Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Logo Placeholder */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 border-2 border-white rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-slate-900" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                College Event Management System
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Apex Institute of Technology & Science
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                  VAC Project
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'text-blue-700 bg-blue-50 shadow-xs border border-blue-200/60'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'events'
                  ? 'text-blue-700 bg-blue-50 shadow-xs border border-blue-200/60'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Events
              <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-bold">
                {totalEventsCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'register'
                  ? 'text-purple-700 bg-purple-50 shadow-xs border border-purple-200/60'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-100/70'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Register
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'text-purple-700 bg-purple-50 shadow-xs border border-purple-200/60'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-100/70'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
              <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full font-bold">
                {totalRegistrationsCount}
              </span>
            </button>
          </nav>

          {/* Quick Action Button & Admin Mode Badge */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('register')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              Register Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </span>
          </button>
          <button
            onClick={() => handleNavClick('events')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'events' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Events
            </span>
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-bold">
              {totalEventsCount}
            </span>
          </button>
          <button
            onClick={() => handleNavClick('register')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'register' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Register
            </span>
            <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-bold">
              Open
            </span>
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'admin' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Admin Dashboard
            </span>
            <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-bold">
              {totalRegistrationsCount} reg
            </span>
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full py-2.5 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xs"
            >
              Register for an Event
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
