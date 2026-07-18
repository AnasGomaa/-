import type { Notification, PointTransaction, Reward, SchoolSettings, Student } from "@/types";

export const settings: SchoolSettings = {
  schoolName: "مدرسة الريادة الحديثة",
  className: "الصف الثاني الإعدادي - فصل الإبداع",
  logoText: "BM",
  primaryColor: "#1d4ed8",
  accentColor: "#f59e0b",
  academicYear: "2026 / 2027"
};

export const students: Student[] = [
  { id: "s1", name: "آدم محمود", code: "STU-1001", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=adam", seatNumber: "14", bonus: 84, minus: 6, streak: 10, weeklyGain: 18 },
  { id: "s2", name: "ليان أحمد", code: "STU-1002", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=layan", seatNumber: "09", bonus: 93, minus: 4, streak: 14, weeklyGain: 23 },
  { id: "s3", name: "يوسف كريم", code: "STU-1003", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=youssef", seatNumber: "22", bonus: 66, minus: 15, streak: 4, weeklyGain: 8 },
  { id: "s4", name: "مريم خالد", code: "STU-1004", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=mariam", seatNumber: "03", bonus: 77, minus: 2, streak: 9, weeklyGain: 16 },
  { id: "s5", name: "عمر مصطفى", code: "STU-1005", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=omar", seatNumber: "18", bonus: 55, minus: 20, streak: 1, weeklyGain: 5 },
  { id: "s6", name: "جنى سامي", code: "STU-1006", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=jana", seatNumber: "06", bonus: 88, minus: 0, streak: 12, weeklyGain: 20 },
  { id: "s7", name: "سليم طارق", code: "STU-1007", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=salim", seatNumber: "27", bonus: 42, minus: 11, streak: 3, weeklyGain: 7 },
  { id: "s8", name: "نوران علي", code: "STU-1008", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=nouran", seatNumber: "11", bonus: 72, minus: 8, streak: 6, weeklyGain: 10 },
  { id: "s9", name: "حمزة وليد", code: "STU-1009", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=hamza", seatNumber: "25", bonus: 61, minus: 13, streak: 2, weeklyGain: 12 },
  { id: "s10", name: "تالا أشرف", code: "STU-1010", password: "123456", grade: "2 إعدادي", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=tala", seatNumber: "01", bonus: 96, minus: 3, streak: 11, weeklyGain: 21 }
];

export const transactions: PointTransaction[] = [
  { id: "t1", studentId: "s10", studentName: "تالا أشرف", teacherName: "أ. أحمد رمضان", points: 8, type: "bonus", reason: "مشاركة ممتازة في حل المسألة", createdAt: "2026-07-17T08:15:00.000Z" },
  { id: "t2", studentId: "s6", studentName: "جنى سامي", teacherName: "أ. أحمد رمضان", points: 5, type: "bonus", reason: "تسليم الواجب قبل الموعد", createdAt: "2026-07-17T09:30:00.000Z" },
  { id: "t3", studentId: "s5", studentName: "عمر مصطفى", teacherName: "أ. أحمد رمضان", points: 3, type: "minus", reason: "نسيان الكراسة", createdAt: "2026-07-17T10:10:00.000Z" },
  { id: "t4", studentId: "s2", studentName: "ليان أحمد", teacherName: "أ. منى حسن", points: 10, type: "bonus", reason: "شرح فكرة لزملائها", createdAt: "2026-07-16T11:05:00.000Z" },
  { id: "t5", studentId: "s3", studentName: "يوسف كريم", teacherName: "أ. منى حسن", points: 2, type: "minus", reason: "تأخير عن بداية الحصة", createdAt: "2026-07-16T12:20:00.000Z" },
  { id: "t6", studentId: "s1", studentName: "آدم محمود", teacherName: "أ. أحمد رمضان", points: 7, type: "bonus", reason: "تحسن واضح في الاختبار القصير", createdAt: "2026-07-15T08:50:00.000Z" }
];

export const rewards: Reward[] = [
  { id: "r1", title: "إعفاء من واجب", description: "يستخدمها الطالب مرة واحدة خلال الأسبوع", icon: "FaBookOpen", stock: 8, grantedTo: ["s2"] },
  { id: "r2", title: "نجمة ذهبية", description: "تظهر بجانب اسم الطالب في لوحة الشرف", icon: "FaStar", stock: 15, grantedTo: ["s10", "s6"] },
  { id: "r3", title: "شهادة تقدير", description: "شهادة رقمية قابلة للطباعة", icon: "FaAward", stock: 6, grantedTo: [] },
  { id: "r4", title: "هدية الفصل", description: "مكافأة شهرية لأفضل تطور", icon: "FaGift", stock: 3, grantedTo: ["s4"] }
];

export const notifications: Notification[] = [
  { id: "n1", studentId: "s10", title: "بونص جديد", body: "حصلت على 8 نقاط بسبب مشاركة ممتازة.", read: false, createdAt: "2026-07-17T08:15:00.000Z" },
  { id: "n2", studentId: "s5", title: "تنبيه نقاط", body: "تم خصم 3 نقاط. يمكنك التعويض في النشاط القادم.", read: false, createdAt: "2026-07-17T10:10:00.000Z" }
];
