import { AuthSession } from '../types';

export const DEMO_SESSION: AuthSession = {
  username: 'RA2111003010123',
  isPortal: true,
  isDemo: true,
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  profile: {
    name: 'Harshith Sai',
    regNo: 'RA2111003010123',
    batch: 'Batch 2 (2023)',
    semester: 'Semester 5',
    dept: 'Computing Technologies - School of Computing',
    section: 'Section B',
    mobile: '+91 98401 23456',
    program: 'B.Tech. Computer Science and Engineering with Specialization in AI & ML',
    institution: 'SRM Institute of Science and Technology, Kattankulathur'
  },
  attendance: [
    {
      code: '21CSE201J',
      title: 'Data Structures and Algorithms',
      category: 'Integrated',
      slot: 'A1 + AL1',
      conducted: 44,
      present: 40,
      absent: 4,
      percent: 90.9,
      isPortal: true
    },
    {
      code: '21CSE202J',
      title: 'Object Oriented Software Engineering',
      category: 'Theory',
      slot: 'B1',
      conducted: 38,
      present: 33,
      absent: 5,
      percent: 86.8,
      isPortal: true
    },
    {
      code: '21CSE204T',
      title: 'Database Management Systems',
      category: 'Theory',
      slot: 'C1',
      conducted: 42,
      present: 33,
      absent: 9,
      percent: 78.6,
      isPortal: true
    },
    {
      code: '21CSE205T',
      title: 'Operating Systems & System Architecture',
      category: 'Theory',
      slot: 'D1',
      conducted: 40,
      present: 28,
      absent: 12,
      percent: 70.0,
      isPortal: true
    },
    {
      code: '21CSE206P',
      title: 'Operating Systems Laboratory',
      category: 'Practical',
      slot: 'P12',
      conducted: 16,
      present: 15,
      absent: 1,
      percent: 93.8,
      isPortal: true
    },
    {
      code: '21MTH203T',
      title: 'Discrete Mathematics and Graph Theory',
      category: 'Theory',
      slot: 'E1',
      conducted: 45,
      present: 39,
      absent: 6,
      percent: 86.7,
      isPortal: true
    },
    {
      code: '21GNM101J',
      title: 'Professional Ethics and Human Values',
      category: 'Theory',
      slot: 'F1',
      conducted: 22,
      present: 20,
      absent: 2,
      percent: 90.9,
      isPortal: true
    },
    {
      code: '21LEH101T',
      title: 'German Language and Culture - Level I',
      category: 'Theory',
      slot: 'G1',
      conducted: 30,
      present: 24,
      absent: 6,
      percent: 80.0,
      isPortal: true
    }
  ],
  monthly: [
    { month: 'Jul-2024', present: 28, absent: 2 },
    { month: 'Aug-2024', present: 54, absent: 7 },
    { month: 'Sep-2024', present: 62, absent: 11 },
    { month: 'Oct-2024', present: 48, absent: 5 }
  ],
  marks: [
    {
      courseCode: '21CSE201J',
      title: 'Data Structures and Algorithms',
      type: 'Internal',
      performance: '91.5 / 100',
      totalMarkGot: 91.5,
      totalMaxMarks: 100,
      assessments: [
        { title: 'Cycle Test 1 (CT1)', marks: '22.5', total: '25', date: '2024-08-14' },
        { title: 'Cycle Test 2 (CT2)', marks: '24.0', total: '25', date: '2024-09-20' },
        { title: 'Surprise Test & Quiz', marks: '9.0', total: '10', date: '2024-09-05' },
        { title: 'Model Practical Examination', marks: '36.0', total: '40', date: '2024-10-10' }
      ]
    },
    {
      courseCode: '21CSE202J',
      title: 'Object Oriented Software Engineering',
      type: 'Internal',
      performance: '84.0 / 100',
      totalMarkGot: 84.0,
      totalMaxMarks: 100,
      assessments: [
        { title: 'Cycle Test 1 (CT1)', marks: '20.0', total: '25', date: '2024-08-15' },
        { title: 'Cycle Test 2 (CT2)', marks: '21.5', total: '25', date: '2024-09-22' },
        { title: 'Term Project / Case Study', marks: '18.0', total: '20', date: '2024-09-30' },
        { title: 'Assignment & Mini Lab', marks: '24.5', total: '30', date: '2024-10-05' }
      ]
    },
    {
      courseCode: '21CSE204T',
      title: 'Database Management Systems',
      type: 'Internal',
      performance: '76.0 / 100',
      totalMarkGot: 76.0,
      totalMaxMarks: 100,
      assessments: [
        { title: 'Cycle Test 1 (CT1)', marks: '18.0', total: '25', date: '2024-08-16' },
        { title: 'Cycle Test 2 (CT2)', marks: '19.0', total: '25', date: '2024-09-21' },
        { title: 'SQL Lab Assessment', marks: '14.0', total: '20', date: '2024-09-28' },
        { title: 'Model Theory Exam', marks: '25.0', total: '30', date: '2024-10-12' }
      ]
    },
    {
      courseCode: '21CSE205T',
      title: 'Operating Systems & System Architecture',
      type: 'Internal',
      performance: '68.5 / 100',
      totalMarkGot: 68.5,
      totalMaxMarks: 100,
      assessments: [
        { title: 'Cycle Test 1 (CT1)', marks: '16.0', total: '25', date: '2024-08-17' },
        { title: 'Cycle Test 2 (CT2)', marks: '17.5', total: '25', date: '2024-09-23' },
        { title: 'Surprise Test', marks: '7.0', total: '10', date: '2024-09-12' },
        { title: 'Model Examination', marks: '28.0', total: '40', date: '2024-10-14' }
      ]
    },
    {
      courseCode: '21MTH203T',
      title: 'Discrete Mathematics and Graph Theory',
      type: 'Internal',
      performance: '95.0 / 100',
      totalMarkGot: 95.0,
      totalMaxMarks: 100,
      assessments: [
        { title: 'Cycle Test 1 (CT1)', marks: '24.0', total: '25', date: '2024-08-18' },
        { title: 'Cycle Test 2 (CT2)', marks: '24.5', total: '25', date: '2024-09-24' },
        { title: 'Proof Submission & Quiz', marks: '10.0', total: '10', date: '2024-09-15' },
        { title: 'Model Exam', marks: '36.5', total: '40', date: '2024-10-15' }
      ]
    }
  ],
  courses: {
    '21CSE201J': {
      code: '21CSE201J',
      name: 'Data Structures and Algorithms',
      title: 'Data Structures and Algorithms',
      credits: '4',
      slot: 'A1, AL1',
      faculty: 'Dr. R. Senthamilselvan',
      room: 'TP 401',
      building: 'Tech Park (TP)',
      floor: '4th Floor',
      type: 'Integrated'
    },
    '21CSE202J': {
      code: '21CSE202J',
      name: 'Object Oriented Software Engineering',
      title: 'Object Oriented Software Engineering',
      credits: '4',
      slot: 'B1',
      faculty: 'Dr. Priya V',
      room: 'TP 402',
      building: 'Tech Park (TP)',
      floor: '4th Floor',
      type: 'Theory'
    },
    '21CSE204T': {
      code: '21CSE204T',
      name: 'Database Management Systems',
      title: 'Database Management Systems',
      credits: '3',
      slot: 'C1',
      faculty: 'Dr. Karthikeyan M',
      room: 'UB 704',
      building: 'University Building (UB)',
      floor: '7th Floor',
      type: 'Theory'
    },
    '21CSE205T': {
      code: '21CSE205T',
      name: 'Operating Systems & System Architecture',
      title: 'Operating Systems & System Architecture',
      credits: '3',
      slot: 'D1',
      faculty: 'Prof. Anitha S',
      room: 'TP 405',
      building: 'Tech Park (TP)',
      floor: '4th Floor',
      type: 'Theory'
    },
    '21CSE206P': {
      code: '21CSE206P',
      name: 'Operating Systems Laboratory',
      title: 'Operating Systems Laboratory',
      credits: '1.5',
      slot: 'P12',
      faculty: 'Prof. Anitha S / Lab Team',
      room: 'TP Lab 3',
      building: 'Tech Park (TP)',
      floor: '2nd Floor',
      type: 'Practical'
    },
    '21MTH203T': {
      code: '21MTH203T',
      name: 'Discrete Mathematics and Graph Theory',
      title: 'Discrete Mathematics and Graph Theory',
      credits: '4',
      slot: 'E1',
      faculty: 'Dr. S. Balamurugan',
      room: 'UB 602',
      building: 'University Building (UB)',
      floor: '6th Floor',
      type: 'Theory'
    },
    '21GNM101J': {
      code: '21GNM101J',
      name: 'Professional Ethics and Human Values',
      title: 'Professional Ethics and Human Values',
      credits: '2',
      slot: 'F1',
      faculty: 'Dr. Kavitha N',
      room: 'TP 301',
      building: 'Tech Park (TP)',
      floor: '3rd Floor',
      type: 'Theory'
    },
    '21LEH101T': {
      code: '21LEH101T',
      name: 'German Language and Culture - Level I',
      title: 'German Language and Culture - Level I',
      credits: '2',
      slot: 'G1',
      faculty: 'Ms. Andrea Fischer',
      room: 'BEL 203',
      building: 'Basic Engineering Lab (BEL)',
      floor: '2nd Floor',
      type: 'Theory'
    }
  },
  schedule: {
    'Day 1': {
      '08:00 - 08:50': {
        code: '21CSE201J',
        course: 'Data Structures and Algorithms',
        courseCode: '21CSE201J',
        courseTitle: 'Data Structures and Algorithms',
        name: 'Data Structures and Algorithms',
        slot: 'A1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 401',
        faculty: 'Dr. R. Senthamilselvan',
        time: '08:00 - 08:50',
        credits: '4',
        building: 'Tech Park',
        floor: '4th Floor'
      },
      '08:50 - 09:40': {
        code: '21CSE202J',
        course: 'Object Oriented Software Engineering',
        courseCode: '21CSE202J',
        courseTitle: 'Object Oriented Software Engineering',
        name: 'Object Oriented Software Engineering',
        slot: 'B1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 402',
        faculty: 'Dr. Priya V',
        time: '08:50 - 09:40',
        credits: '4',
        building: 'Tech Park',
        floor: '4th Floor'
      },
      '09:45 - 10:35': {
        code: '21CSE204T',
        course: 'Database Management Systems',
        courseCode: '21CSE204T',
        courseTitle: 'Database Management Systems',
        name: 'Database Management Systems',
        slot: 'C1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 704',
        faculty: 'Dr. Karthikeyan M',
        time: '09:45 - 10:35',
        credits: '3',
        building: 'University Building',
        floor: '7th Floor'
      },
      '10:40 - 11:30': {
        code: '21CSE205T',
        course: 'Operating Systems & System Architecture',
        courseCode: '21CSE205T',
        courseTitle: 'Operating Systems & System Architecture',
        name: 'Operating Systems & System Architecture',
        slot: 'D1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 405',
        faculty: 'Prof. Anitha S',
        time: '10:40 - 11:30',
        credits: '3',
        building: 'Tech Park',
        floor: '4th Floor'
      },
      '12:30 - 02:15': {
        code: '21CSE206P',
        course: 'Operating Systems Laboratory',
        courseCode: '21CSE206P',
        courseTitle: 'Operating Systems Laboratory',
        name: 'Operating Systems Laboratory',
        slot: 'P12',
        type: 'Practical',
        raw_type: 'Practical',
        room: 'TP Lab 3',
        faculty: 'Prof. Anitha S / Lab Team',
        time: '12:30 - 02:15',
        credits: '1.5',
        building: 'Tech Park',
        floor: '2nd Floor'
      }
    },
    'Day 2': {
      '08:00 - 08:50': {
        code: '21MTH203T',
        course: 'Discrete Mathematics and Graph Theory',
        courseCode: '21MTH203T',
        courseTitle: 'Discrete Mathematics and Graph Theory',
        name: 'Discrete Mathematics and Graph Theory',
        slot: 'E1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 602',
        faculty: 'Dr. S. Balamurugan',
        time: '08:00 - 08:50',
        credits: '4'
      },
      '08:50 - 09:40': {
        code: '21GNM101J',
        course: 'Professional Ethics and Human Values',
        courseCode: '21GNM101J',
        courseTitle: 'Professional Ethics and Human Values',
        name: 'Professional Ethics and Human Values',
        slot: 'F1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 301',
        faculty: 'Dr. Kavitha N',
        time: '08:50 - 09:40',
        credits: '2'
      },
      '09:45 - 10:35': {
        code: '21CSE201J',
        course: 'Data Structures and Algorithms',
        courseCode: '21CSE201J',
        courseTitle: 'Data Structures and Algorithms',
        name: 'Data Structures and Algorithms',
        slot: 'A1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 401',
        faculty: 'Dr. R. Senthamilselvan',
        time: '09:45 - 10:35',
        credits: '4'
      },
      '10:40 - 11:30': {
        code: '21LEH101T',
        course: 'German Language and Culture - Level I',
        courseCode: '21LEH101T',
        courseTitle: 'German Language and Culture - Level I',
        name: 'German Language and Culture - Level I',
        slot: 'G1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'BEL 203',
        faculty: 'Ms. Andrea Fischer',
        time: '10:40 - 11:30',
        credits: '2'
      },
      '12:30 - 01:20': {
        code: '21CSE202J',
        course: 'Object Oriented Software Engineering',
        courseCode: '21CSE202J',
        courseTitle: 'Object Oriented Software Engineering',
        name: 'Object Oriented Software Engineering',
        slot: 'B1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 402',
        faculty: 'Dr. Priya V',
        time: '12:30 - 01:20',
        credits: '4'
      }
    },
    'Day 3': {
      '08:00 - 08:50': {
        code: '21CSE204T',
        course: 'Database Management Systems',
        courseCode: '21CSE204T',
        courseTitle: 'Database Management Systems',
        name: 'Database Management Systems',
        slot: 'C1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 704',
        faculty: 'Dr. Karthikeyan M',
        time: '08:00 - 08:50',
        credits: '3'
      },
      '08:50 - 09:40': {
        code: '21CSE205T',
        course: 'Operating Systems & System Architecture',
        courseCode: '21CSE205T',
        courseTitle: 'Operating Systems & System Architecture',
        name: 'Operating Systems & System Architecture',
        slot: 'D1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 405',
        faculty: 'Prof. Anitha S',
        time: '08:50 - 09:40',
        credits: '3'
      },
      '09:45 - 10:35': {
        code: '21MTH203T',
        course: 'Discrete Mathematics and Graph Theory',
        courseCode: '21MTH203T',
        courseTitle: 'Discrete Mathematics and Graph Theory',
        name: 'Discrete Mathematics and Graph Theory',
        slot: 'E1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 602',
        faculty: 'Dr. S. Balamurugan',
        time: '09:45 - 10:35',
        credits: '4'
      },
      '12:30 - 02:15': {
        code: '21CSE201J',
        course: 'Data Structures Lab (AL1)',
        courseCode: '21CSE201J',
        courseTitle: 'Data Structures Lab',
        name: 'Data Structures Lab',
        slot: 'AL1',
        type: 'Practical',
        raw_type: 'Practical',
        room: 'TP Lab 1',
        faculty: 'Dr. R. Senthamilselvan',
        time: '12:30 - 02:15',
        credits: '4'
      }
    },
    'Day 4': {
      '08:00 - 08:50': {
        code: '21LEH101T',
        course: 'German Language and Culture - Level I',
        courseCode: '21LEH101T',
        courseTitle: 'German Language and Culture - Level I',
        name: 'German Language and Culture - Level I',
        slot: 'G1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'BEL 203',
        faculty: 'Ms. Andrea Fischer',
        time: '08:00 - 08:50',
        credits: '2'
      },
      '08:50 - 09:40': {
        code: '21CSE201J',
        course: 'Data Structures and Algorithms',
        courseCode: '21CSE201J',
        courseTitle: 'Data Structures and Algorithms',
        name: 'Data Structures and Algorithms',
        slot: 'A1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 401',
        faculty: 'Dr. R. Senthamilselvan',
        time: '08:50 - 09:40',
        credits: '4'
      },
      '09:45 - 10:35': {
        code: '21CSE202J',
        course: 'Object Oriented Software Engineering',
        courseCode: '21CSE202J',
        courseTitle: 'Object Oriented Software Engineering',
        name: 'Object Oriented Software Engineering',
        slot: 'B1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 402',
        faculty: 'Dr. Priya V',
        time: '09:45 - 10:35',
        credits: '4'
      },
      '10:40 - 11:30': {
        code: '21CSE204T',
        course: 'Database Management Systems',
        courseCode: '21CSE204T',
        courseTitle: 'Database Management Systems',
        name: 'Database Management Systems',
        slot: 'C1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 704',
        faculty: 'Dr. Karthikeyan M',
        time: '10:40 - 11:30',
        credits: '3'
      },
      '12:30 - 01:20': {
        code: '21MTH203T',
        course: 'Discrete Mathematics and Graph Theory',
        courseCode: '21MTH203T',
        courseTitle: 'Discrete Mathematics and Graph Theory',
        name: 'Discrete Mathematics and Graph Theory',
        slot: 'E1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'UB 602',
        faculty: 'Dr. S. Balamurugan',
        time: '12:30 - 01:20',
        credits: '4'
      }
    },
    'Day 5': {
      '08:00 - 08:50': {
        code: '21CSE205T',
        course: 'Operating Systems & System Architecture',
        courseCode: '21CSE205T',
        courseTitle: 'Operating Systems & System Architecture',
        name: 'Operating Systems & System Architecture',
        slot: 'D1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 405',
        faculty: 'Prof. Anitha S',
        time: '08:00 - 08:50',
        credits: '3'
      },
      '08:50 - 09:40': {
        code: '21GNM101J',
        course: 'Professional Ethics and Human Values',
        courseCode: '21GNM101J',
        courseTitle: 'Professional Ethics and Human Values',
        name: 'Professional Ethics and Human Values',
        slot: 'F1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 301',
        faculty: 'Dr. Kavitha N',
        time: '08:50 - 09:40',
        credits: '2'
      },
      '09:45 - 10:35': {
        code: '21CSE201J',
        course: 'Data Structures and Algorithms',
        courseCode: '21CSE201J',
        courseTitle: 'Data Structures and Algorithms',
        name: 'Data Structures and Algorithms',
        slot: 'A1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 401',
        faculty: 'Dr. R. Senthamilselvan',
        time: '09:45 - 10:35',
        credits: '4'
      },
      '10:40 - 11:30': {
        code: '21CSE202J',
        course: 'Object Oriented Software Engineering',
        courseCode: '21CSE202J',
        courseTitle: 'Object Oriented Software Engineering',
        name: 'Object Oriented Software Engineering',
        slot: 'B1',
        type: 'Theory',
        raw_type: 'Theory',
        room: 'TP 402',
        faculty: 'Dr. Priya V',
        time: '10:40 - 11:30',
        credits: '4'
      }
    }
  }
};

export const DEMO_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    text: 'SRM University End Semester Examination Schedule for Odd Semester 2024-25 has been released. Check Student Portal for Hall Ticket download.',
    image_url: null,
    files: [
      { name: 'End_Sem_Timetable_Odd24.pdf', url: '#' },
      { name: 'Exam_Guidelines_Do_and_Donts.pdf', url: '#' }
    ],
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'ann-2',
    text: 'Reminder: Minimum 75% attendance in each course is strictly mandatory to be eligible for End-Semester Examinations as per University Regulations.',
    image_url: null,
    files: [],
    created_at: new Date(Date.now() - 3600000 * 26).toISOString()
  },
  {
    id: 'ann-3',
    text: 'Cycle Test 2 (CT-2) Marks for all 3rd year Computing Technologies courses have been updated on Student Portal.',
    image_url: null,
    files: [],
    created_at: new Date(Date.now() - 3600000 * 52).toISOString()
  }
];

export const DEMO_PYQS = [
  {
    courseCode: '21CSE201J',
    courseName: 'Data Structures and Algorithms',
    examType: 'Cycle Test 1',
    year: '2023',
    slot: 'A1 / B1',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE201J_CT1_2023.pdf'
  },
  {
    courseCode: '21CSE201J',
    courseName: 'Data Structures and Algorithms',
    examType: 'Cycle Test 2',
    year: '2023',
    slot: 'A1 / B1',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE201J_CT2_2023.pdf'
  },
  {
    courseCode: '21CSE201J',
    courseName: 'Data Structures and Algorithms',
    examType: 'End Semester',
    year: '2023',
    slot: 'Regular',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE201J_ENDSEM_2023.pdf'
  },
  {
    courseCode: '21CSE202J',
    courseName: 'Object Oriented Software Engineering',
    examType: 'Cycle Test 1',
    year: '2023',
    slot: 'B1 / C1',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE202J_CT1_2023.pdf'
  },
  {
    courseCode: '21CSE204T',
    courseName: 'Database Management Systems',
    examType: 'Cycle Test 2',
    year: '2023',
    slot: 'C1 / D1',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE204T_CT2_2023.pdf'
  },
  {
    courseCode: '21CSE205T',
    courseName: 'Operating Systems',
    examType: 'Model Exam',
    year: '2023',
    slot: 'D1 / E1',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21CSE205T_MODEL_2023.pdf'
  },
  {
    courseCode: '21MTH203T',
    courseName: 'Discrete Mathematics',
    examType: 'End Semester',
    year: '2023',
    slot: 'Regular',
    url: 'https://raw.githubusercontent.com/srmentertainment/edx-pyq/main/21MTH203T_ENDSEM_2023.pdf'
  }
];
