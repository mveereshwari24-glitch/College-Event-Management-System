export type EventCategory = 
  | 'Technical Symposium' 
  | 'Workshop' 
  | 'Cultural Fest' 
  | 'Sports Day' 
  | 'Paper Presentation'
  | 'Coding Competition'
  | 'Seminar'
  | 'Other';

export interface CollegeEvent {
  id: string;
  title: string;
  category: EventCategory;
  department: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:30 AM - 04:30 PM"
  venue: string;
  description: string;
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorEmail: string;
  maxCapacity: number;
  registeredCount: number;
  entryFee: string;
  eligibility: string;
  tags: string[];
  bannerGradient: string;
  rules?: string[];
  schedule?: { time: string; activity: string }[];
  isFeatured?: boolean;
}

export interface StudentRegistration {
  id: string;
  ticketId: string;
  studentName: string;
  registerNumber: string;
  department: string;
  yearOfStudy: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  email: string;
  phone: string;
  eventId: string;
  eventName: string;
  registeredAt: string;
}

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Management Studies (MBA)',
  'Biotechnology'
] as const;

export const YEARS_OF_STUDY = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
] as const;
