import React from 'react';
import { GraduationCap, Sparkles, Heart, Github, ExternalLink, Calendar, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'events' | 'register' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: College Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-bold text-white font-heading block">
                  Apex Institute
                </span>
                <span className="text-xs text-slate-400">
                  of Technology & Science
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering student innovation, leadership, and technical prowess through regular national symposiums, hackathons, and cultural fests.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>University Campus Road, Tech Valley</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>events@apexcollege.edu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('events')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Upcoming College Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('register')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Event Registration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Administrator Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Event Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Technical Symposium</li>
              <li>• AI & Machine Learning Workshop</li>
              <li>• Annual Cultural Fest</li>
              <li>• Sports & Athletics Championship</li>
              <li>• National Paper Presentation</li>
              <li>• Inter-Department Coding Competition</li>
            </ul>
          </div>

          {/* Col 4: Project Info */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              VAC Mini Project 2026
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Developed as a demonstration project for <strong>College Value Added Course (VAC)</strong> on Modern Web Application Development.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-700/80 pt-2">
              Tech: React, TypeScript, Tailwind CSS, LocalStorage
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 College Event Management System. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for College VAC Project Presentation & Academic Evaluation
          </p>
        </div>
      </div>
    </footer>
  );
};
