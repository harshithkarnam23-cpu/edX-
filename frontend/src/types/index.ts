export interface StudentProfile {
  name: string;
  regNo: string;
  batch: string;
  semester: string;
  dept: string;
  section: string;
  mobile: string;
  program: string;
  institution?: string;
  avatarUrl?: string;
}

export interface AttendanceCourse {
  code: string;
  title: string;
  category: string;
  slot: string;
  conducted: number;
  absent: number;
  present?: number;
  percent: number;
  isPortal?: boolean;
}

export interface MonthlyAttendance {
  month: string;
  present: number;
  absent: number;
}

export interface AssessmentItem {
  title: string;
  marks: string;
  total: string;
  date?: string;
}

export interface MarkItem {
  courseCode: string;
  title: string;
  type: string;
  performance: string;
  assessments: AssessmentItem[];
  totalMarkGot: number | null;
  totalMaxMarks: number | null;
  subjectId?: string | null;
  status?: string;
}

export interface TimetableSlot {
  code: string;
  course: string;
  courseCode: string;
  courseTitle: string;
  name: string;
  slot: string;
  type: string;
  raw_type: string;
  room: string;
  faculty: string;
  time: string;
  credits?: string;
  building?: string;
  floor?: string;
}

export type TimetableSchedule = Record<string, Record<string, TimetableSlot>>;

export interface CourseInfo {
  code: string;
  name: string;
  title: string;
  credits: string;
  slot: string;
  faculty: string;
  room: string;
  building?: string;
  floor?: string;
  type: string;
}

export interface AnnouncementFile {
  name: string;
  url: string;
}

export interface Announcement {
  id: string | null;
  text: string;
  image_url: string | null;
  files: AnnouncementFile[];
  created_at: string | null;
}

export interface AuthSession {
  username: string;
  isPortal: boolean;
  cookies?: Record<string, string>;
  profile: StudentProfile;
  attendance: AttendanceCourse[];
  monthly?: MonthlyAttendance[];
  marks: MarkItem[];
  schedule: TimetableSchedule;
  courses: Record<string, CourseInfo>;
  lastUpdated: string;
  isDemo?: boolean;
}

export type NavigationTab = 
  | 'dashboard'
  | 'attendance'
  | 'timetable'
  | 'marks'
  | 'pyq'
  | 'announcements'
  | 'profile';

export type ThemeMode = 'light' | 'dark' | 'system';
