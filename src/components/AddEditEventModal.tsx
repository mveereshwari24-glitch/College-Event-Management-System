import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Save, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Users, 
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import { CollegeEvent, EventCategory, DEPARTMENTS } from '../types';

interface AddEditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CollegeEvent) => void;
  eventToEdit: CollegeEvent | null;
}

const CATEGORIES: EventCategory[] = [
  'Technical Symposium',
  'Workshop',
  'Cultural Fest',
  'Sports Day',
  'Paper Presentation',
  'Coding Competition',
  'Seminar',
  'Other'
];

export const AddEditEventModal: React.FC<AddEditEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  eventToEdit
}) => {
  const [formData, setFormData] = useState<Partial<CollegeEvent>>({
    title: '',
    category: 'Technical Symposium',
    department: DEPARTMENTS[0],
    date: '2026-11-15',
    time: '09:30 AM - 04:30 PM',
    venue: '',
    description: '',
    coordinatorName: '',
    coordinatorPhone: '',
    coordinatorEmail: '',
    maxCapacity: 150,
    registeredCount: 0,
    entryFee: 'Free',
    eligibility: 'All College Students',
    tags: ['Campus', 'Academic'],
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
    isFeatured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eventToEdit) {
      setFormData(eventToEdit);
    } else {
      setFormData({
        title: '',
        category: 'Technical Symposium',
        department: DEPARTMENTS[0],
        date: '2026-11-15',
        time: '09:30 AM - 04:30 PM',
        venue: '',
        description: '',
        coordinatorName: '',
        coordinatorPhone: '',
        coordinatorEmail: '',
        maxCapacity: 150,
        registeredCount: 0,
        entryFee: 'Free',
        eligibility: 'All College Students',
        tags: ['Campus', 'Academic'],
        bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
        isFeatured: false
      });
    }
    setErrors({});
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title?.trim()) errs.title = 'Event title is required';
    if (!formData.venue?.trim()) errs.venue = 'Venue location is required';
    if (!formData.description?.trim()) errs.description = 'Description is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.coordinatorName?.trim()) errs.coordinatorName = 'Coordinator name is required';
    if (!formData.maxCapacity || formData.maxCapacity <= 0) errs.maxCapacity = 'Capacity must be greater than 0';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const eventId = eventToEdit ? eventToEdit.id : `evt-${Date.now()}`;
    const registeredCount = eventToEdit ? eventToEdit.registeredCount : 0;

    // Pick aesthetic gradient based on category
    let gradient = formData.bannerGradient || 'from-blue-600 via-indigo-600 to-purple-700';
    if (formData.category === 'Workshop') gradient = 'from-purple-600 via-violet-600 to-indigo-700';
    if (formData.category === 'Cultural Fest') gradient = 'from-pink-600 via-purple-600 to-indigo-800';
    if (formData.category === 'Sports Day') gradient = 'from-blue-600 via-cyan-600 to-emerald-600';
    if (formData.category === 'Paper Presentation') gradient = 'from-indigo-700 via-purple-700 to-pink-600';
    if (formData.category === 'Coding Competition') gradient = 'from-blue-700 via-indigo-600 to-teal-600';

    const fullEvent: CollegeEvent = {
      id: eventId,
      title: formData.title!.trim(),
      category: formData.category as EventCategory,
      department: formData.department || DEPARTMENTS[0],
      date: formData.date || '2026-11-20',
      time: formData.time || '10:00 AM - 04:00 PM',
      venue: formData.venue!.trim(),
      description: formData.description!.trim(),
      coordinatorName: formData.coordinatorName!.trim(),
      coordinatorPhone: formData.coordinatorPhone?.trim() || '+91 98450 11223',
      coordinatorEmail: formData.coordinatorEmail?.trim() || 'events@apexcollege.edu',
      maxCapacity: Number(formData.maxCapacity),
      registeredCount,
      entryFee: formData.entryFee || 'Free',
      eligibility: formData.eligibility || 'All College Students',
      tags: formData.tags || ['College', 'VAC Event'],
      bannerGradient: gradient,
      isFeatured: !!formData.isFeatured
    };

    onSave(fullEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-7 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-blue-100 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Admin Event Manager
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {eventToEdit ? 'Edit College Event' : 'Add New College Event'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Event Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. NextGen Robotics & IoT Exhibition"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                errors.title ? 'border-rose-400' : 'border-slate-300'
              } focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-100`}
            />
            {errors.title && <p className="text-xs text-rose-600">{errors.title}</p>}
          </div>

          {/* Category & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Host Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Date (YYYY-MM-DD)</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Time</label>
              <input
                type="text"
                placeholder="09:30 AM - 04:30 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Max Capacity <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="10"
                max="5000"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 100 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:border-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Venue Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Block B, Ground Floor Auditorium"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                errors.venue ? 'border-rose-400' : 'border-slate-300'
              } focus:border-blue-600 focus:outline-hidden`}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Provide a detailed summary of the event, eligibility, key tracks, and highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                errors.description ? 'border-rose-400' : 'border-slate-300'
              } focus:border-blue-600 focus:outline-hidden`}
            ></textarea>
          </div>

          {/* Coordinator Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-900 block">Event Coordinator Contact</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Coordinator Name"
                  value={formData.coordinatorName}
                  onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.coordinatorPhone}
                  onChange={(e) => setFormData({ ...formData, coordinatorPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Coordinator Email"
                  value={formData.coordinatorEmail}
                  onChange={(e) => setFormData({ ...formData, coordinatorEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Mark as Featured Event (Highlights on the Home Page)
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {eventToEdit ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
