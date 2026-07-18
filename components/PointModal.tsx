"use client";

import { useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import type { PointType, Student } from "@/types";

type Props = {
  student: Student | null;
  type: PointType;
  onClose: () => void;
  onSubmit: (points: number, reason: string) => void;
};

export function PointModal({ student, type, onClose, onSubmit }: Props) {
  const [points, setPoints] = useState(5);
  const [reason, setReason] = useState("");

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-royal-950/40 p-4 backdrop-blur-sm">
      <form
        className="glass-panel w-full max-w-md rounded-[1.5rem] p-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(points, reason || (type === "bonus" ? "إضافة نقاط إيجابية" : "خصم نقاط"));
          setReason("");
          setPoints(5);
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{type === "bonus" ? "إضافة Bonus" : "إضافة Minus"}</p>
            <h2 className="text-xl font-medium text-royal-950">{student.name}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="إغلاق">
            <FaTimes />
          </button>
        </div>
        <label className="mb-3 block text-sm font-medium">عدد النقاط</label>
        <input className="field" type="number" min={1} value={points} onChange={(event) => setPoints(Number(event.target.value))} />
        <label className="mb-3 mt-4 block text-sm font-medium">السبب</label>
        <textarea className="field min-h-28 resize-none" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="مثال: مشاركة مميزة في الحصة" />
        <button type="submit" className={type === "bonus" ? "primary-button mt-5 w-full" : "gold-button mt-5 w-full"}>
          {type === "bonus" ? <FaPlus /> : <FaMinus />}
          حفظ العملية
        </button>
      </form>
    </div>
  );
}
