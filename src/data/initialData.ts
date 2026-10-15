import { CollegeEvent, StudentRegistration } from '../types';

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 'evt-tech-symposium',
    title: 'TechNovation 2026: National Technical Symposium',
    category: 'Technical Symposium',
    department: 'Computer Science & Engineering',
    date: '2026-11-05',
    time: '09:00 AM - 04:30 PM',
    venue: 'Sir C.V. Raman Main Auditorium & Lab Complex',
    description: 'A prestigious inter-college technical festival featuring technical debates, poster exhibits, project showcases, and innovation challenges with distinguished industry dignitaries.',
    coordinatorName: 'Dr. K. Rajesh (Associate Prof.)',
    coordinatorPhone: '+91 98451 22340',
    coordinatorEmail: 'technovation@apexcollege.edu',
    maxCapacity: 250,
    registeredCount: 184,
    entryFee: 'Free Entry',
    eligibility: 'All Engineering & Technology Undergraduates',
    tags: ['Symposium', 'Innovation', 'Project Expo', 'Networking'],
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
    isFeatured: true,
    rules: [
      'College ID card is mandatory at the registration counter.',
      'Participants must assemble at the auditorium by 08:45 AM.',
      'Certificates of merit will be awarded to top performers.',
      'Professional decorum must be maintained during keynote talks.'
    ],
    schedule: [
      { time: '09:00 AM - 10:00 AM', activity: 'Inaugural Address & Lighting of Lamp' },
      { time: '10:15 AM - 01:00 PM', activity: 'Technical Tracks & Project Display' },
      { time: '01:00 PM - 02:00 PM', activity: 'Networking Lunch' },
      { time: '02:00 PM - 03:45 PM', activity: 'Technical Panel Discussion & Finale' },
      { time: '04:00 PM - 04:30 PM', activity: 'Valedictory & Prize Distribution' }
    ]
  },
  {
    id: 'evt-ai-workshop',
    title: 'AI and Machine Learning Hands-on Workshop',
    category: 'Workshop',
    department: 'Artificial Intelligence & Data Science',
    date: '2026-11-12',
    time: '09:30 AM - 03:30 PM',
    venue: 'Turing Advanced Computing Lab (Block B, 3rd Floor)',
    description: 'An intensive, hands-on workshop guiding students through neural networks, computer vision algorithms, and deploying real-world predictive ML models to the cloud.',
    coordinatorName: 'Prof. Ananya Roy & Er. Vikram Verma',
    coordinatorPhone: '+91 97120 44589',
    coordinatorEmail: 'aiworkshops@apexcollege.edu',
    maxCapacity: 100,
    registeredCount: 88,
    entryFee: '₹100 (Includes Software Kit & Certificate)',
    eligibility: 'Open to 2nd, 3rd, and 4th Year Engineering Students',
    tags: ['Machine Learning', 'Deep Learning', 'Python', 'Hands-on'],
    bannerGradient: 'from-purple-600 via-violet-600 to-indigo-700',
    isFeatured: true,
    rules: [
      'Bring your own personal laptop with Python 3.10+ installed.',
      'Jupyter Notebook and Google Colab accounts should be active.',
      'Workshop kit and pre-configured code repositories will be provided.',
      '100% attendance is mandatory for receiving the VAC Certificate.'
    ],
    schedule: [
      { time: '09:30 AM - 11:00 AM', activity: 'Session 1: ML Math, Regression & Classification' },
      { time: '11:15 AM - 01:00 PM', activity: 'Session 2: Hands-on Deep Learning with PyTorch' },
      { time: '01:00 PM - 01:45 PM', activity: 'Lunch Break' },
      { time: '01:45 PM - 03:30 PM', activity: 'Session 3: Model Deployment & Live API Demo' }
    ]
  },
  {
    id: 'evt-cultural-fest',
    title: 'Tarang 2026: Annual Inter-College Cultural Fest',
    category: 'Cultural Fest',
    department: 'Management Studies (MBA)',
    date: '2026-11-20',
    time: '03:00 PM - 09:30 PM',
    venue: 'Central Open Air Amphitheatre & Lawn Plaza',
    description: 'The premier college cultural extravaganza of music, dance, theatrical performance, photography, and live fusion concert celebrating campus talent and diversity.',
    coordinatorName: 'Dr. P. Meenakshi & Student Lead Arjun Nair',
    coordinatorPhone: '+91 99882 11200',
    coordinatorEmail: 'tarangfest@apexcollege.edu',
    maxCapacity: 1200,
    registeredCount: 940,
    entryFee: 'Free with Registered Student Pass',
    eligibility: 'All College Students & Faculty Members',
    tags: ['Music', 'Dance Battle', 'Drama', 'Concert'],
    bannerGradient: 'from-pink-600 via-purple-600 to-indigo-800',
    isFeatured: true,
    rules: [
      'Digital Event Pass generated from this portal is required for campus admission.',
      'Gate entry closes strictly at 05:00 PM.',
      'Participants in group dance must submit track audio in pen drive before 01:00 PM.',
      'Strict campus discipline and anti-ragging policies apply.'
    ],
    schedule: [
      { time: '03:00 PM - 04:30 PM', activity: 'Solo Vocal & Folk Fusion Competition' },
      { time: '04:30 PM - 06:00 PM', activity: 'Inter-College Western & Eastern Dance Battles' },
      { time: '06:15 PM - 07:15 PM', activity: 'Theatrical Skit & Fashion Symphony' },
      { time: '07:30 PM - 09:30 PM', activity: 'Live Celebrity Band & DJ Concert' }
    ]
  },
  {
    id: 'evt-sports-day',
    title: 'Sprint & Surge: Annual Inter-Department Sports Day',
    category: 'Sports Day',
    department: 'Mechanical Engineering',
    date: '2026-11-27',
    time: '07:30 AM - 05:00 PM',
    venue: 'University Olympic Sports Complex & Main Track',
    description: 'The annual inter-department sports championship featuring 100m sprint, 4x100m relay, Football, Volleyball, Badminton, Table Tennis, and Tug-of-War.',
    coordinatorName: 'Coach R. Balaji (Director of Physical Education)',
    coordinatorPhone: '+91 94432 99012',
    coordinatorEmail: 'sports@apexcollege.edu',
    maxCapacity: 400,
    registeredCount: 310,
    entryFee: 'Free',
    eligibility: 'All Registered Undergraduates & Postgraduates',
    tags: ['Athletics', 'Football', 'Relay', 'Championship'],
    bannerGradient: 'from-blue-600 via-cyan-600 to-emerald-600',
    isFeatured: false,
    rules: [
      'Sports uniform and proper running spikes/shoes are mandatory.',
      'Each student can participate in a maximum of 2 individual track events and 1 team event.',
      'Assemble at Main Track area by 07:15 AM for march past.'
    ],
    schedule: [
      { time: '07:30 AM - 08:30 AM', activity: 'Athletic March Past & Lighting of Torch' },
      { time: '08:45 AM - 12:30 PM', activity: 'Track Heats, Long Jump & Badminton Prelims' },
      { time: '12:30 PM - 01:30 PM', activity: 'Lunch & Hydration Break' },
      { time: '01:30 PM - 04:30 PM', activity: 'Relay Finals, Tug of War & Football Final' },
      { time: '04:30 PM - 05:00 PM', activity: 'Rolling Trophy & Medal Distribution' }
    ]
  },
  {
    id: 'evt-paper-presentation',
    title: 'InnovateX: National Level Paper Presentation Contest',
    category: 'Paper Presentation',
    department: 'Electronics & Communication Engineering',
    date: '2026-12-03',
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall 2 & Digital Conference Room (Block C)',
    description: 'Present your research ideas, review papers, and prototype findings in VLSI, IoT, Renewable Energy, 5G Communications, and Smart Infrastructure before expert academic juries.',
    coordinatorName: 'Dr. S. Sundar & Dr. Nandini Menon',
    coordinatorPhone: '+91 98402 33119',
    coordinatorEmail: 'innovatex@apexcollege.edu',
    maxCapacity: 80,
    registeredCount: 54,
    entryFee: 'Free',
    eligibility: 'UG and PG Engineering Students',
    tags: ['Research', 'IEEE Format', 'Presentation', 'Publication'],
    bannerGradient: 'from-indigo-700 via-purple-700 to-pink-600',
    isFeatured: false,
    rules: [
      'Manuscript must strictly adhere to the standard IEEE two-column conference format.',
      'Presentation duration: 8 minutes presentation + 2 minutes jury Q&A.',
      'Selected high-impact papers will be forwarded for publication.'
    ],
    schedule: [
      { time: '10:00 AM - 10:30 AM', activity: 'Introduction to Jury & Keynote on Research Ethics' },
      { time: '10:30 AM - 01:00 PM', activity: 'Oral Paper Presentation Track 1 (IoT & Hardware)' },
      { time: '01:00 PM - 01:45 PM', activity: 'Lunch Break' },
      { time: '01:45 PM - 03:30 PM', activity: 'Track 2 (AI, Signals & Green Energy)' },
      { time: '03:30 PM - 04:00 PM', activity: 'Best Paper Award Ceremony' }
    ]
  },
  {
    id: 'evt-coding-competition',
    title: 'ByteBattles: 4-Hour Inter-Department Coding Competition',
    category: 'Coding Competition',
    department: 'Information Technology',
    date: '2026-12-08',
    time: '01:30 PM - 05:30 PM',
    venue: 'Alan Turing Software Lab 4 (Block A)',
    description: 'Speed coding, algorithmic problem solving, dynamic programming challenges, and bug hunting under tight countdown constraints on the college competitive portal.',
    coordinatorName: 'Prof. Harish K. & Er. Divya S.',
    coordinatorPhone: '+91 98845 00912',
    coordinatorEmail: 'bytebattles@apexcollege.edu',
    maxCapacity: 120,
    registeredCount: 104,
    entryFee: 'Free',
    eligibility: 'Students of any branch with passion for coding',
    tags: ['Algorithms', 'Data Structures', 'Competitive Coding', 'Leaderboard'],
    bannerGradient: 'from-blue-700 via-indigo-600 to-teal-600',
    isFeatured: true,
    rules: [
      'Supported languages: C++, Java, Python, and JavaScript.',
      'External browsing, AI assistant tabs, and phone usage will lead to automatic disqualification.',
      'Tie-breakers will be resolved based on submission time and code execution complexity.'
    ],
    schedule: [
      { time: '01:30 PM - 01:45 PM', activity: 'Login & System Environment Verification' },
      { time: '01:45 PM - 03:00 PM', activity: 'Round 1: Rapid Algorithmic Warm-up (5 Problems)' },
      { time: '03:15 PM - 05:00 PM', activity: 'Round 2: Hard Dynamic Programming & Optimization' },
      { time: '05:00 PM - 05:30 PM', activity: 'Live Leaderboard Unveiling & Cash Prize Award' }
    ]
  }
];

export const INITIAL_REGISTRATIONS: StudentRegistration[] = [
  {
    id: 'reg-001',
    ticketId: 'CP-2026-8910',
    studentName: 'Aarav Sharma',
    registerNumber: '21CS042',
    department: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    email: 'aarav.sharma21@apexcollege.edu',
    phone: '+91 98765 43210',
    eventId: 'evt-tech-symposium',
    eventName: 'TechNovation 2026: National Technical Symposium',
    registeredAt: '2026-10-10 10:30 AM'
  },
  {
    id: 'reg-002',
    ticketId: 'CP-2026-8911',
    studentName: 'Priya Sundaram',
    registerNumber: '22AI018',
    department: 'Artificial Intelligence & Data Science',
    yearOfStudy: '2nd Year',
    email: 'priya.sundaram@apexcollege.edu',
    phone: '+91 98112 33455',
    eventId: 'evt-ai-workshop',
    eventName: 'AI and Machine Learning Hands-on Workshop',
    registeredAt: '2026-10-11 02:15 PM'
  },
  {
    id: 'reg-003',
    ticketId: 'CP-2026-8912',
    studentName: 'Rohan Deshmukh',
    registerNumber: '20ME077',
    department: 'Mechanical Engineering',
    yearOfStudy: '4th Year',
    email: 'rohan.d@apexcollege.edu',
    phone: '+91 94560 98711',
    eventId: 'evt-sports-day',
    eventName: 'Sprint & Surge: Annual Inter-Department Sports Day',
    registeredAt: '2026-10-12 11:45 AM'
  },
  {
    id: 'reg-004',
    ticketId: 'CP-2026-8913',
    studentName: 'Kavya Ranganathan',
    registerNumber: '23EC031',
    department: 'Electronics & Communication Engineering',
    yearOfStudy: '1st Year',
    email: 'kavya.r@apexcollege.edu',
    phone: '+91 97721 88990',
    eventId: 'evt-cultural-fest',
    eventName: 'Tarang 2026: Annual Inter-College Cultural Fest',
    registeredAt: '2026-10-13 04:20 PM'
  },
  {
    id: 'reg-005',
    ticketId: 'CP-2026-8914',
    studentName: 'Mohammed Tariq',
    registerNumber: '21IT055',
    department: 'Information Technology',
    yearOfStudy: '3rd Year',
    email: 'tariq.it21@apexcollege.edu',
    phone: '+91 98452 77123',
    eventId: 'evt-coding-competition',
    eventName: 'ByteBattles: 4-Hour Inter-Department Coding Competition',
    registeredAt: '2026-10-14 09:10 AM'
  },
  {
    id: 'reg-006',
    ticketId: 'CP-2026-8915',
    studentName: 'Sneha Patel',
    registerNumber: '22CS089',
    department: 'Computer Science & Engineering',
    yearOfStudy: '2nd Year',
    email: 'sneha.patel@apexcollege.edu',
    phone: '+91 99001 22334',
    eventId: 'evt-paper-presentation',
    eventName: 'InnovateX: National Level Paper Presentation Contest',
    registeredAt: '2026-10-14 01:50 PM'
  }
];
