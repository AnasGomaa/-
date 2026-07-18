export type Role = "admin" | "teacher" | "student";

export type Student = {
  id: string;
  name: string;
  code: string;
  password: string;
  grade: string;
  avatar: string;
  seatNumber?: string;
  bonus: number;
  minus: number;
  streak: number;
  weeklyGain: number;
};

export type PointType = "bonus" | "minus";

export type PointTransaction = {
  id: string;
  studentId: string;
  studentName: string;
  teacherName: string;
  points: number;
  type: PointType;
  reason: string;
  createdAt: string;
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stock: number;
  grantedTo: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type SchoolSettings = {
  schoolName: string;
  className: string;
  logoText: string;
  primaryColor: string;
  accentColor: string;
  academicYear: string;
};

export type Notification = {
  id: string;
  studentId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};
