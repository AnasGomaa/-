"use client";

import { FaMinus, FaPlus, FaTrash, FaUserEdit } from "react-icons/fa";
import type { Student } from "@/types";
import { getLevel, totalPoints, xpProgress } from "@/lib/scoring";

type Props = {
  student: Student;
  rank: number;
  onBonus: (student: Student) => void;
  onMinus: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
};

export function StudentCard({ student, rank, onBonus, onMinus, onEdit, onDelete }: Props) {
  const total = totalPoints(student);
  const level = getLevel(total);

  return (
    <article className="soft-card p-4">
      <div className="flex items-start gap-3">
        <img src={student.avatar} alt={student.name} className="h-16 w-16 rounded-2xl bg-royal-50" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate font-medium text-royal-950">{student.name}</h3>
              <p className="text-xs text-slate-500">{student.code} | {student.grade}</p>
            </div>
            <span className="chip">#{rank}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span>{level.name}</span>
            <span>{total} نقطة</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-royal-600" style={{ width: `${xpProgress(total)}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-2xl bg-royal-50 p-2 text-royal-700">+{student.bonus}</div>
        <div className="rounded-2xl bg-rose-50 p-2 text-rose-700">-{student.minus}</div>
        <div className="rounded-2xl bg-gold-100 p-2 text-gold-700">{student.seatNumber ?? "بدون"}</div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        <button className="icon-button" aria-label="إضافة Bonus" onClick={() => onBonus(student)}>
          <FaPlus />
        </button>
        <button className="icon-button text-rose-600" aria-label="إضافة Minus" onClick={() => onMinus(student)}>
          <FaMinus />
        </button>
        <button className="icon-button" aria-label="تعديل الطالب" onClick={() => onEdit(student)}>
          <FaUserEdit />
        </button>
        <button className="icon-button text-rose-600" aria-label="حذف الطالب" onClick={() => onDelete(student.id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  );
}
