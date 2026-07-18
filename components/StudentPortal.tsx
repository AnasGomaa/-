"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaMedal, FaSearch, FaStar, FaTrophy } from "react-icons/fa";
import { settings, students } from "@/lib/sample-data";
import { getLevel, rankedStudents, totalPoints, xpProgress } from "@/lib/scoring";

export function StudentPortal() {
  const [search, setSearch] = useState("");
  const ranked = useMemo(() => rankedStudents(students), []);
  const filtered = useMemo(
    () => ranked.filter((student) => student.name.includes(search) || student.grade.includes(search)),
    [ranked, search]
  );

  return (
    <main className="min-h-screen bg-hero-mesh">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <header className="glass-panel mb-6 flex flex-col gap-4 rounded-[1.5rem] p-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600 font-bold text-white">{settings.logoText}</span>
            <div>
              <p className="font-medium text-royal-950">نتائج الطلاب</p>
              <p className="text-xs text-slate-500">{settings.className}</p>
            </div>
          </Link>
          <Link href="/" className="gold-button">
            <FaArrowRight />
            الرئيسية
          </Link>
        </header>

        <section className="glass-panel mb-6 rounded-[2rem] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-slate-500">قائمة مبسطة بدون أكواد أو كلمات مرور</p>
              <h1 className="mt-1 text-3xl font-medium text-royal-950">أسماء الطلاب والنتيجة النهائية</h1>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 md:w-80">
              <FaSearch className="text-slate-400" />
              <input
                className="w-full bg-transparent outline-none"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث باسم الطالب"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {filtered.map((student, index) => {
            const total = totalPoints(student);
            const level = getLevel(total);
            return (
              <motion.article
                key={student.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="soft-card p-4"
              >
                <div className="grid items-center gap-4 md:grid-cols-[72px_1fr_120px_120px_120px]">
                  <span className="chip w-fit">
                    <FaMedal className="text-gold-500" />
                    #{index + 1}
                  </span>
                  <div className="flex min-w-0 items-center gap-3">
                    <img src={student.avatar} alt="" className="h-14 w-14 rounded-2xl bg-royal-50" />
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-medium text-royal-950">{student.name}</h2>
                      <p className="text-sm text-slate-500">{student.grade}</p>
                    </div>
                  </div>
                  <Score label="Bonus" value={`+${student.bonus}`} tone="green" />
                  <Score label="Minus" value={`-${student.minus}`} tone="red" />
                  <Score label="النتيجة" value={total} tone="blue" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="chip">
                    <FaStar className="text-gold-500" />
                    {level.name}
                  </span>
                  <div className="h-3 flex-1 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-gradient-to-l from-gold-300 to-royal-600" style={{ width: `${xpProgress(total)}%` }} />
                  </div>
                  {index === 0 && (
                    <span className="chip">
                      <FaTrophy className="text-gold-500" />
                      الأول
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function Score({ label, value, tone }: { label: string; value: string | number; tone: "green" | "red" | "blue" }) {
  const toneClass = {
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-700",
    blue: "bg-royal-600 text-white"
  };

  return (
    <div className={`rounded-2xl px-4 py-3 text-center ${toneClass[tone]}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
}
