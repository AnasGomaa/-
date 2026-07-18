import type { Achievement, Student } from "@/types";

export function totalPoints(student: Student) {
  return student.bonus - student.minus;
}

export function rankedStudents(students: Student[]) {
  return [...students].sort((a, b) => totalPoints(b) - totalPoints(a));
}

export function getRank(studentId: string, students: Student[]) {
  return rankedStudents(students).findIndex((student) => student.id === studentId) + 1;
}

export function getLevel(points: number) {
  if (points >= 140) return { name: "Legend", current: 140, next: 160, number: 7 };
  if (points >= 115) return { name: "Master", current: 115, next: 140, number: 6 };
  if (points >= 90) return { name: "Level 5", current: 90, next: 115, number: 5 };
  if (points >= 65) return { name: "Level 4", current: 65, next: 90, number: 4 };
  if (points >= 40) return { name: "Level 3", current: 40, next: 65, number: 3 };
  if (points >= 20) return { name: "Level 2", current: 20, next: 40, number: 2 };
  return { name: "Level 1", current: 0, next: 20, number: 1 };
}

export function xpProgress(points: number) {
  const level = getLevel(points);
  return Math.min(100, Math.max(0, ((points - level.current) / (level.next - level.current)) * 100));
}

export function achievementsFor(student: Student, rank: number): Achievement[] {
  const total = totalPoints(student);
  return [
    {
      id: "a1",
      title: "طالب متميز",
      description: "وصل إلى 75 نقطة صافية أو أكثر",
      icon: "⭐",
      unlocked: total >= 75
    },
    {
      id: "a2",
      title: "عشرة بونص متتالية",
      description: "حافظ على سلسلة إيجابية من 10 مرات",
      icon: "🔥",
      unlocked: student.streak >= 10
    },
    {
      id: "a3",
      title: "نجم الأسبوع",
      description: "ضمن أفضل 3 طلاب في الفصل",
      icon: "🏆",
      unlocked: rank <= 3
    },
    {
      id: "a4",
      title: "الأكثر تطوراً",
      description: "حقق 20 نقطة أو أكثر هذا الأسبوع",
      icon: "🚀",
      unlocked: student.weeklyGain >= 20
    },
    {
      id: "a5",
      title: "شهر بلا Minus",
      description: "لم يحصل على أي خصم خلال الشهر",
      icon: "💯",
      unlocked: student.minus === 0
    }
  ];
}
