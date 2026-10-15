import React, { useState, useEffect } from 'react';
import { 
  User, 
  Hash, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  GraduationCap, 
  Sparkles,
  RotateCcw,
  Send
} from 'lucide-react';
import { CollegeEvent, StudentRegistration, DEPARTMENTS, YEARS_OF_STUDY } from '../types';

interface RegistrationFormProps {
  events: CollegeEvent[];
  selectedEventId?: string;
  existingRegistrations: StudentRegistration[];
  onRegisterSuccess: (newRegistration: StudentRegistration) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  events,
  selectedEventId,
  existingRegistrations,
  onRegisterSuccess
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    registerNumber: '',
    department: DEPARTMENTS[0] as string,
    yearOfStudy: '3rd Year' as '1st Year' | '2nd Year' | '3rd Year' | '4th Year',
    email: '',
    phone: '',
    eventId: selectedEventId || (events[0]?.id || '')
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when selectedEventId changes from external trigger
  useEffect(() => {
    if (selectedEventId) {
      setFormData(prev => ({ ...prev, eventId: selectedEventId }));
    } else if (events.length > 0 && !formData.eventId) {
      setFormData(prev => ({ ...prev, eventId: events[0].id }));
    }
  }, [selectedEventId, events]);

  const selectedEvent = events.find(e => e.id === formData.eventId);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    setGeneralError(null);

    // Student Name
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    } else if (formData.studentName.trim().length < 3) {
      newErrors.studentName = 'Name must be at least 3 characters long';
    }

    // Register Number
    if (!formData.registerNumber.trim()) {
      newErrors.registerNumber = 'College Register / Roll Number is required';
    } else if (formData.registerNumber.trim().length < 4) {
      newErrors.registerNumber = 'Please enter a valid register number (e.g. 21CS042)';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. student@college.edu)';
    }

    // Phone Number
    const cleanedPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    } else if (cleanedPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    // Event Selection
    if (!formData.eventId) {
      newErrors.eventId = 'Please select a college event';
    }

    // Duplicate Check
    if (formData.eventId && formData.registerNumber) {
      const regNoNormalized = formData.registerNumber.trim().toUpperCase();
      const emailNormalized = formData.email.trim().toLowerCase();

      const duplicate = existingRegistrations.find(r => 
        r.eventId === formData.eventId && (
          r.registerNumber.trim().toUpperCase() === regNoNormalized ||
          r.email.trim().toLowerCase() === emailNormalized
        )
      );

      if (duplicate) {
        setGeneralError(
          `Duplicate Registration: A student with Register No "${duplicate.registerNumber}" or Email "${duplicate.email}" is already registered for "${duplicate.eventName}".`
        );
        newErrors.registerNumber = 'Already registered for this event';
        newErrors.email = 'Already registered for this event';
      }
    }

    // Capacity Check
    if (selectedEvent && selectedEvent.registeredCount >= selectedEvent.maxCapacity) {
      setGeneralError('Registration Closed: This event has reached its maximum seat capacity.');
      newErrors.eventId = 'Event is fully booked';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !generalError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate clean unique ticket ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `CP-2026-${randomCode}`;
      
      const newRegistration: StudentRegistration = {
        id: `reg-${Date.now()}`,
        ticketId,
        studentName: formData.studentName.trim(),
        registerNumber: formData.registerNumber.trim().toUpperCase(),
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        eventId: formData.eventId,
        eventName: selectedEvent ? selectedEvent.title : 'College Event',
        registeredAt: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setIsSubmitting(false);
      onRegisterSuccess(newRegistration);

      // Reset form
      setFormData({
        studentName: '',
        registerNumber: '',
        department: DEPARTMENTS[0],
        yearOfStudy: '3rd Year',
        email: '',
        phone: '',
        eventId: events[0]?.id || ''
      });
      setErrors({});
      setGeneralError(null);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      registerNumber: '',
      department: DEPARTMENTS[0],
      yearOfStudy: '3rd Year',
      email: '',
      phone: '',
      eventId: events[0]?.id || ''
    });
    setErrors({});
    setGeneralError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
        
        {/* Form Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-10 text-white relative">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>Official Student Enrollment Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Event Registration Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Complete the required details below to confirm your seat. Upon successful submission, an official digital Event Pass with a unique Ticket ID will be generated.
            </p>
          </div>

          <div className="absolute right-6 top-6 sm:right-10 sm:top-10 hidden sm:block opacity-20">
            <GraduationCap className="w-28 h-28" />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          
          {/* General Error Banner */}
          {generalError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-rose-800">Registration Error</h4>
                <p className="text-xs text-rose-700 leading-relaxed">{generalError}</p>
              </div>
            </div>
          )}

          {/* Section 1: Event Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 flex items-center justify-between">
              <span>
                Select Event <span className="text-rose-500">*</span>
              </span>
              {selectedEvent && (
                <span className="text-xs font-semibold text-blue-600">
                  {selectedEvent.date} • {selectedEvent.venue}
                </span>
              )}
            </label>

            <select
              value={formData.eventId}
              onChange={(e) => {
                setFormData({ ...formData, eventId: e.target.value });
                if (errors.eventId) setErrors({ ...errors, eventId: '' });
                setGeneralError(null);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                errors.eventId 
                  ? 'border-rose-400 focus:ring-rose-200 text-rose-900' 
                  : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 text-slate-900'
              }`}
            >
              <option value="" disabled>-- Choose an Event --</option>
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.category} - {evt.department})
                </option>
              ))}
            </select>
            {errors.eventId && (
              <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.eventId}
              </p>
            )}

            {/* Selected Event Preview Card */}
            {selectedEvent && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-blue-900">{selectedEvent.title}</span>
                  <div className="text-slate-600">
                    Coordinator: {selectedEvent.coordinatorName} ({selectedEvent.coordinatorPhone})
                  </div>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-blue-700 border border-blue-200 shadow-2xs">
                    {selectedEvent.maxCapacity - selectedEvent.registeredCount} Seats Available
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Student Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.studentName}
                  onChange={(e) => {
                    setFormData({ ...formData, studentName: e.target.value });
                    if (errors.studentName) setErrors({ ...errors, studentName: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.studentName 
                      ? 'border-rose-400 focus:ring-rose-200 text-rose-900' 
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 text-slate-900'
                  }`}
                />
              </div>
              {errors.studentName && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.studentName}
                </p>
              )}
            </div>

            {/* Register Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Register Number / Roll No <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. 21CS042 or 22IT019"
                  value={formData.registerNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, registerNumber: e.target.value.toUpperCase() });
                    if (errors.registerNumber) setErrors({ ...errors, registerNumber: '' });
                    setGeneralError(null);
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium uppercase bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.registerNumber 
                      ? 'border-rose-400 focus:ring-rose-200 text-rose-900' 
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 text-slate-900'
                  }`}
                />
              </div>
              {errors.registerNumber && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.registerNumber}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-slate-900"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year of Study */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Year of Study <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {YEARS_OF_STUDY.map((year) => (
                  <button
                    type="button"
                    key={year}
                    onClick={() => setFormData({ ...formData, yearOfStudy: year })}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      formData.yearOfStudy === year
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Student Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="e.g. rahul.sharma@apexcollege.edu"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                    setGeneralError(null);
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-rose-400 focus:ring-rose-200 text-rose-900' 
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 text-slate-900'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Contact Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-rose-400 focus:ring-rose-200 text-rose-900' 
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 text-slate-900'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 disabled:opacity-50 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Digital Ticket...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Registration
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
