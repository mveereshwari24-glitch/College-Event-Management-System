import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Building2, 
  GraduationCap, 
  QrCode, 
  Ticket as TicketIcon,
  ArrowRight
} from 'lucide-react';
import { StudentRegistration, CollegeEvent } from '../types';

interface RegistrationSuccessModalProps {
  registration: StudentRegistration | null;
  event?: CollegeEvent;
  onClose: () => void;
  onRegisterAnother: () => void;
  onViewInDashboard: () => void;
}

export const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({
  registration,
  event,
  onClose,
  onRegisterAnother,
  onViewInDashboard
}) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-20 cursor-pointer"
          aria-label="Close success dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 p-6 sm:p-8 text-white text-center space-y-3 relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5" />
              Registration Confirmed
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              You are Officially Registered!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
              Your college event pass has been generated. Please save or print this digital ticket for entry.
            </p>
          </div>
        </div>

        {/* Printable Ticket / Pass Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div 
            id="printable-pass"
            className="rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-b from-indigo-50/50 via-white to-purple-50/50 p-6 space-y-5 relative"
          >
            {/* College Watermark Badge */}
            <div className="flex items-center justify-between border-b border-indigo-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-heading">
                    Apex Institute of Technology & Science
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    Official Student Event Entry Pass
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Ticket ID
                </span>
                <span className="font-mono text-sm font-extrabold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                  {registration.ticketId}
                </span>
              </div>
            </div>

            {/* Event Name */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                Registered Event
              </span>
              <h3 className="text-lg font-bold font-heading text-slate-900 leading-tight">
                {registration.eventName}
              </h3>
            </div>

            {/* Student & Event Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-medium">Student Name</span>
                <span className="font-bold text-slate-800">{registration.studentName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-medium">Register Number</span>
                <span className="font-mono font-bold text-slate-800">{registration.registerNumber}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-medium">Department</span>
                <span className="font-semibold text-slate-800 truncate block" title={registration.department}>
                  {registration.department}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-medium">Year & Contact</span>
                <span className="font-semibold text-slate-800">
                  {registration.yearOfStudy} • {registration.phone}
                </span>
              </div>

              {event && (
                <>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-medium">Date & Time</span>
                    <span className="font-bold text-indigo-900">
                      {event.date} ({event.time})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-medium">Venue</span>
                    <span className="font-bold text-indigo-900 truncate block" title={event.venue}>
                      {event.venue}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Simulated Barcode / Security Strip */}
            <div className="pt-3 border-t border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Verified Digital E-Pass
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">
                    Issued: {registration.registeredAt}
                  </span>
                </div>
              </div>

              {/* Barcode Lines Simulation */}
              <div className="flex items-center gap-0.5 h-6 opacity-70">
                <span className="w-0.5 h-full bg-slate-900"></span>
                <span className="w-1 h-full bg-slate-900"></span>
                <span className="w-0.5 h-full bg-slate-900"></span>
                <span className="w-1.5 h-full bg-slate-900"></span>
                <span className="w-0.5 h-full bg-slate-900"></span>
                <span className="w-1 h-full bg-slate-900"></span>
                <span className="w-2 h-full bg-slate-900"></span>
                <span className="w-0.5 h-full bg-slate-900"></span>
                <span className="w-1 h-full bg-slate-900"></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handlePrint}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print / Save Pass (PDF)
              </button>

              <button
                onClick={onRegisterAnother}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                Register Another Student
              </button>
            </div>

            <button
              onClick={onViewInDashboard}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Registration in Admin Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
