import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  GraduationCap, 
  Eye, 
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  MapPin,
  Ticket,
  ChevronRight,
  KeyRound
} from 'lucide-react';
import { CollegeEvent, StudentRegistration, DEPARTMENTS } from '../types';

interface AdminDashboardProps {
  events: CollegeEvent[];
  registrations: StudentRegistration[];
  onAddEventClick: () => void;
  onEditEventClick: (event: CollegeEvent) => void;
  onDeleteEventClick: (event: CollegeEvent) => void;
  onDeleteRegistrationClick: (registration: StudentRegistration) => void;
  onViewTicket: (registration: StudentRegistration) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  registrations,
  onAddEventClick,
  onEditEventClick,
  onDeleteEventClick,
  onDeleteRegistrationClick,
  onViewTicket,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'events' | 'security'>('registrations');
  
  // Registration filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState('ALL');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [selectedYearFilter, setSelectedYearFilter] = useState('ALL');

  // Stats calculation
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  
  // Find most popular event
  const mostPopularEvent = useMemo(() => {
    if (events.length === 0) return null;
    return [...events].sort((a, b) => b.registeredCount - a.registeredCount)[0];
  }, [events]);

  // Filter registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !q ||
        reg.studentName.toLowerCase().includes(q) ||
        reg.registerNumber.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q) ||
        reg.ticketId.toLowerCase().includes(q);

      const matchEvent = selectedEventFilter === 'ALL' || reg.eventId === selectedEventFilter;
      const matchDept = selectedDeptFilter === 'ALL' || reg.department === selectedDeptFilter;
      const matchYear = selectedYearFilter === 'ALL' || reg.yearOfStudy === selectedYearFilter;

      return matchQuery && matchEvent && matchDept && matchYear;
    });
  }, [registrations, searchQuery, selectedEventFilter, selectedDeptFilter, selectedYearFilter]);

  // Export to CSV Functionality (Module 5)
  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert('No registrations available to export with the current filters.');
      return;
    }

    const headers = [
      'Ticket ID',
      'Student Name',
      'Register Number',
      'Department',
      'Year of Study',
      'Email',
      'Phone',
      'Event Name',
      'Registered At'
    ];

    const rows = filteredRegistrations.map(r => [
      `"${r.ticketId}"`,
      `"${r.studentName.replace(/"/g, '""')}"`,
      `"${r.registerNumber}"`,
      `"${r.department}"`,
      `"${r.yearOfStudy}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      `"${r.registeredAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `college_event_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Security Explanation */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Control Center • VAC Demo Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Administrator Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manage college events, oversee student enrollments, inspect digital event passes, and export registration reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onAddEventClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Event
            </button>

            <button
              onClick={onResetData}
              title="Restore initial sample events and registrations"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-purple-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>
      </div>

      {/* Admin Security & Demonstration Mode Notice (Required by prompt) */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <KeyRound className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <span className="font-bold text-amber-900 block text-sm">
            Admin Security & Architecture Notice (Academic Evaluation)
          </span>
          <p className="text-amber-800 leading-relaxed">
            In accordance with best security practices, this application does <strong>not expose a hardcoded public admin password</strong> in client code. 
            For this college Value Added Course (VAC) project demonstration, access is provided openly in <em>Demonstration Mode</em> with <strong>browser localStorage</strong> persistence.
            In an enterprise or production college environment, this portal should be secured with role-based authentication (RBAC) such as <strong>Firebase Authentication / Google Workspace SSO / JWT session tokens</strong> via a verified backend server.
          </p>
        </div>
      </div>

      {/* Overview Analytics Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Events */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Events</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">
            {totalEvents}
          </div>
          <div className="text-xs text-slate-500">Active Campus Events</div>
        </div>

        {/* Total Registrations */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Registrations</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">
            {totalRegistrations}
          </div>
          <div className="text-xs text-slate-500">Verified Students</div>
        </div>

        {/* Top Event */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Top Event</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-extrabold text-slate-900 font-heading truncate" title={mostPopularEvent?.title}>
            {mostPopularEvent ? mostPopularEvent.title.split(':')[0] : 'None'}
          </div>
          <div className="text-xs text-emerald-600 font-semibold">
            {mostPopularEvent ? `${mostPopularEvent.registeredCount} enrolled` : '0 students'}
          </div>
        </div>

        {/* Storage State */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Data Engine</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-heading">
            LocalStorage
          </div>
          <div className="text-xs text-indigo-600 font-semibold">Session Preserved</div>
        </div>

      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'registrations'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Student Registrations ({filteredRegistrations.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Manage Events ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            Project Architecture Guide
          </button>
        </div>
      </div>

      {/* TAB 1: REGISTRATIONS MANAGEMENT (Module 4 & 5) */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by student name, roll number (e.g. 21CS042), email, or ticket ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:border-purple-600 focus:outline-hidden focus:ring-2 focus:ring-purple-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* CSV Export Button */}
              <button
                onClick={exportToCSV}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-700" />
                Export CSV ({filteredRegistrations.length})
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              
              {/* Filter by Event */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter by Event
                </label>
                <select
                  value={selectedEventFilter}
                  onChange={(e) => setSelectedEventFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="ALL">All Events ({registrations.length})</option>
                  {events.map((evt) => (
                    <option key={evt.id} value={evt.id}>
                      {evt.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Department */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter by Department
                </label>
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="ALL">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Filter by Year of Study */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter by Year of Study
                </label>
                <select
                  value={selectedYearFilter}
                  onChange={(e) => setSelectedYearFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="ALL">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

            </div>
          </div>

          {/* Registrations List (Desktop Table & Mobile Cards) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {filteredRegistrations.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Registrations Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery || selectedEventFilter !== 'ALL' || selectedDeptFilter !== 'ALL'
                    ? 'No student registrations match your current filters. Try resetting the search or filter dropdowns.'
                    : 'No student has registered for any events yet. Register using the registration form.'}
                </p>
                {(searchQuery || selectedEventFilter !== 'ALL' || selectedDeptFilter !== 'ALL' || selectedYearFilter !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedEventFilter('ALL');
                      setSelectedDeptFilter('ALL');
                      setSelectedYearFilter('ALL');
                    }}
                    className="text-xs font-bold text-purple-600 hover:underline"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop View Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Ticket ID</th>
                        <th className="px-5 py-3.5">Student Name</th>
                        <th className="px-5 py-3.5">Roll No</th>
                        <th className="px-5 py-3.5">Department & Year</th>
                        <th className="px-5 py-3.5">Registered Event</th>
                        <th className="px-5 py-3.5">Contact Details</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-purple-700">
                            {reg.ticketId}
                          </td>
                          <td className="px-5 py-4 font-bold text-slate-900">
                            {reg.studentName}
                          </td>
                          <td className="px-5 py-4 font-mono font-semibold text-slate-700">
                            {reg.registerNumber}
                          </td>
                          <td className="px-5 py-4 space-y-0.5">
                            <span className="font-medium text-slate-800 block truncate max-w-[180px]" title={reg.department}>
                              {reg.department}
                            </span>
                            <span className="text-[11px] text-slate-500">{reg.yearOfStudy}</span>
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-700 max-w-[200px] truncate" title={reg.eventName}>
                            {reg.eventName}
                          </td>
                          <td className="px-5 py-4 text-slate-500 space-y-0.5">
                            <div className="text-[11px] truncate max-w-[160px]" title={reg.email}>{reg.email}</div>
                            <div className="text-[11px] font-mono">{reg.phone}</div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onViewTicket(reg)}
                                title="View Digital Pass"
                                className="p-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteRegistrationClick(reg)}
                                title="Delete Registration"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View Cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filteredRegistrations.map((reg) => (
                    <div key={reg.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {reg.ticketId}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{reg.studentName}</h4>
                          <span className="text-xs font-mono text-slate-500">{reg.registerNumber}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onViewTicket(reg)}
                            className="p-2 rounded-lg bg-slate-100 text-slate-700"
                            title="View E-Pass"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteRegistrationClick(reg)}
                            className="p-2 rounded-lg bg-rose-50 text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1 text-slate-700">
                        <div className="font-semibold text-blue-900 line-clamp-1">{reg.eventName}</div>
                        <div className="text-slate-500">{reg.department} • {reg.yearOfStudy}</div>
                        <div className="text-slate-500">{reg.email} • {reg.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: EVENTS MANAGEMENT (Module 4) */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-slate-900">
              Campus Events Catalog ({events.length})
            </h3>
            <button
              onClick={onAddEventClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div 
                key={evt.id}
                className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div className={`h-2.5 bg-gradient-to-r ${evt.bannerGradient}`}></div>
                
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {evt.category}
                    </span>
                    <span className="text-xs font-semibold text-blue-600">
                      {evt.registeredCount} / {evt.maxCapacity} Enrolled
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h4 className="text-base font-bold font-heading text-slate-900 line-clamp-1">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {evt.description}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1 text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onEditEventClick(evt)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteEventClick(evt)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROJECT ARCHITECTURE & GUIDE */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              College VAC Project Specification
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              System Architecture & Implementation Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Technical overview designed for academic presentation, project viva, and source code evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Frontend Stack
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Constructed using <strong>React 19, TypeScript, and Tailwind CSS</strong>. 
                Features interactive dynamic form validation, duplicate registration prevention, responsive layout for phones, tablets, and laptops, and dynamic PDF/print-ready student pass generation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
              <h4 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Demo Data Engine (LocalStorage)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Events and student registrations are preserved in <strong>browser localStorage</strong>. 
                Data persists across page reloads in the same browser. Examiners can click <em>Reset Demo Data</em> at any time to restore the default sample dataset.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
              <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Admin Security Architecture
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than using an insecure hardcoded client-side password, this app uses a dedicated <em>Academic Demonstration Portal</em> with full event CRUD and registration management. 
                To transition to production, the admin endpoints should be protected with Firebase Auth or OAuth2 JWT tokens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Reports & Data Export
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Administrators can filter by department, year of study, and specific events, then instantly generate and download a compliant <strong>.CSV spreadsheet</strong> for college record keeping and attendance.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
