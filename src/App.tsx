/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  CalendarDays, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Plus,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { CollegeEvent, StudentRegistration, EventCategory } from './types';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { EventDetailsModal } from './components/EventDetailsModal';
import { RegistrationForm } from './components/RegistrationForm';
import { RegistrationSuccessModal } from './components/RegistrationSuccessModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AddEditEventModal } from './components/AddEditEventModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_EVENTS = 'college_event_mgmt_events_v1';
const STORAGE_KEY_REGISTRATIONS = 'college_event_mgmt_registrations_v1';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'events' | 'register' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);

  // Events & Registrations state initialized from localStorage with initial sample fallback
  const [events, setEvents] = useState<CollegeEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EVENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading events from localStorage:', e);
    }
    return INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading registrations from localStorage:', e);
    }
    return INITIAL_REGISTRATIONS;
  });

  // Save to localStorage whenever events or registrations change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events to localStorage:', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Error saving registrations to localStorage:', e);
    }
  }, [registrations]);

  // UI Interactive States
  const [selectedEventIdForForm, setSelectedEventIdForForm] = useState<string>(events[0]?.id || '');
  const [viewingDetailsEvent, setViewingDetailsEvent] = useState<CollegeEvent | null>(null);
  const [successRegistration, setSuccessRegistration] = useState<StudentRegistration | null>(null);
  
  // Admin modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CollegeEvent | null>(null);
  
  // Delete confirmation state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'event' | 'registration';
    item: any;
    title: string;
    message: string;
    itemName: string;
  }>({
    isOpen: false,
    type: 'event',
    item: null,
    title: '',
    message: '',
    itemName: ''
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Events Explorer Filter & Search State
  const [eventsSearchQuery, setEventsSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');

  // Filtered Events for Events Tab
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const q = eventsSearchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.department.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q);

      const matchesCategory = selectedCategoryTab === 'ALL' || evt.category === selectedCategoryTab;

      return matchesSearch && matchesCategory;
    });
  }, [events, eventsSearchQuery, selectedCategoryTab]);

  // Handler: Student clicks "Register Now" from Event Card or Hero
  const handleSelectEventToRegister = (event: CollegeEvent) => {
    setSelectedEventIdForForm(event.id);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Registration Form Submission
  const handleRegisterSuccess = (newReg: StudentRegistration) => {
    // 1. Add to registrations state
    setRegistrations((prev) => [newReg, ...prev]);

    // 2. Increment event's registeredCount
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === newReg.eventId
          ? { ...evt, registeredCount: evt.registeredCount + 1 }
          : evt
      )
    );

    // 3. Trigger digital ticket modal
    setSuccessRegistration(newReg);
    showToast(`Registration confirmed for ${newReg.studentName}! Your ticket ID is ${newReg.ticketId}.`, 'success');
  };

  // Handler: Save Event (Add or Edit) from Admin
  const handleSaveEvent = (savedEvent: CollegeEvent) => {
    const isEdit = events.some((e) => e.id === savedEvent.id);
    if (isEdit) {
      setEvents((prev) => prev.map((e) => (e.id === savedEvent.id ? savedEvent : e)));
      showToast(`Event "${savedEvent.title}" updated successfully!`, 'success');
    } else {
      setEvents((prev) => [savedEvent, ...prev]);
      showToast(`New event "${savedEvent.title}" created successfully!`, 'success');
    }
  };

  // Handler: Request Delete Event
  const handleDeleteEventClick = (event: CollegeEvent) => {
    setDeleteModalState({
      isOpen: true,
      type: 'event',
      item: event,
      title: 'Delete College Event?',
      message: 'Are you sure you want to delete this event? Students already registered will retain their records, but no further registrations will be accepted.',
      itemName: event.title
    });
  };

  // Handler: Request Delete Registration
  const handleDeleteRegistrationClick = (registration: StudentRegistration) => {
    setDeleteModalState({
      isOpen: true,
      type: 'registration',
      item: registration,
      title: 'Remove Student Registration?',
      message: 'Are you sure you want to remove this registration? The student pass will be revoked and capacity will be restored.',
      itemName: `${registration.studentName} (${registration.registerNumber})`
    });
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = () => {
    if (deleteModalState.type === 'event' && deleteModalState.item) {
      const eventToDelete = deleteModalState.item as CollegeEvent;
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
      showToast(`Event "${eventToDelete.title}" was deleted.`, 'info');
    } else if (deleteModalState.type === 'registration' && deleteModalState.item) {
      const regToDelete = deleteModalState.item as StudentRegistration;
      setRegistrations((prev) => prev.filter((r) => r.id !== regToDelete.id));

      // Decrement registeredCount on associated event
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === regToDelete.eventId
            ? { ...evt, registeredCount: Math.max(0, evt.registeredCount - 1) }
            : evt
        )
      );
      showToast(`Registration for ${regToDelete.studentName} was removed.`, 'info');
    }

    setDeleteModalState((prev) => ({ ...prev, isOpen: false, item: null }));
  };

  // Handler: Reset to Sample Data
  const handleResetDemoData = () => {
    if (window.confirm('Reset all events and registrations to original sample data? Custom additions will be replaced.')) {
      setEvents(INITIAL_EVENTS);
      setRegistrations(INITIAL_REGISTRATIONS);
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
      showToast('All events and registrations restored to default sample data.', 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold text-white ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-600' 
              : toastMessage.type === 'error'
              ? 'bg-rose-600'
              : 'bg-indigo-600'
          }`}>
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 p-1 rounded-md hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        totalEventsCount={events.length}
        totalRegistrationsCount={registrations.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* MODULE 1: HOME PAGE */}
        {activeTab === 'home' && (
          <Hero
            totalEvents={events.length}
            totalRegistrations={registrations.length}
            onNavigate={setActiveTab}
            onSelectEventToRegister={handleSelectEventToRegister}
            onViewEventDetails={(evt) => setViewingDetailsEvent(evt)}
            featuredEvents={events}
          />
        )}

        {/* MODULE 2: EVENTS EXPLORER */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Header & Search */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Campus Schedule 2026
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
                    Explore College Events
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select any event to view schedules, guidelines, or reserve your seat instantly.
                  </p>
                </div>

                <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
                  Showing {filteredEvents.length} of {events.length} events
                </div>
              </div>

              {/* Search input & Category Tabs */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search events by title, keyword, department, or venue..."
                    value={eventsSearchQuery}
                    onChange={(e) => setEventsSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
                  />
                  {eventsSearchQuery && (
                    <button
                      onClick={() => setEventsSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
                  {[
                    'ALL',
                    'Technical Symposium',
                    'Workshop',
                    'Cultural Fest',
                    'Sports Day',
                    'Paper Presentation',
                    'Coding Competition'
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategoryTab(category)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategoryTab === category
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {category === 'ALL' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Events Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No events matched "{eventsSearchQuery}" in category "{selectedCategoryTab}".
                </p>
                <button
                  onClick={() => {
                    setEventsSearchQuery('');
                    setSelectedCategoryTab('ALL');
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleSelectEventToRegister}
                    onViewDetails={(evt) => setViewingDetailsEvent(evt)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: STUDENT REGISTRATION */}
        {activeTab === 'register' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <RegistrationForm
              events={events}
              selectedEventId={selectedEventIdForForm}
              existingRegistrations={registrations}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </div>
        )}

        {/* MODULE 4 & 5: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="animate-in fade-in duration-150">
            <AdminDashboard
              events={events}
              registrations={registrations}
              onAddEventClick={() => {
                setEventToEdit(null);
                setIsAddEditModalOpen(true);
              }}
              onEditEventClick={(evt) => {
                setEventToEdit(evt);
                setIsAddEditModalOpen(true);
              }}
              onDeleteEventClick={handleDeleteEventClick}
              onDeleteRegistrationClick={handleDeleteRegistrationClick}
              onViewTicket={(reg) => setSuccessRegistration(reg)}
              onResetData={handleResetDemoData}
            />
          </div>
        )}

      </main>

      {/* MODAL: Event Details & Rules */}
      <EventDetailsModal
        event={viewingDetailsEvent}
        onClose={() => setViewingDetailsEvent(null)}
        onRegister={handleSelectEventToRegister}
      />

      {/* MODAL: Registration Success & Digital Pass */}
      <RegistrationSuccessModal
        registration={successRegistration}
        event={events.find((e) => e.id === successRegistration?.eventId)}
        onClose={() => setSuccessRegistration(null)}
        onRegisterAnother={() => {
          setSuccessRegistration(null);
          setActiveTab('register');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewInDashboard={() => {
          setSuccessRegistration(null);
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODAL: Add / Edit Event (Admin) */}
      <AddEditEventModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEventToEdit(null);
        }}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
      />

      {/* MODAL: Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.title}
        message={deleteModalState.message}
        itemName={deleteModalState.itemName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false, item: null }))}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
