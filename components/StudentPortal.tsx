"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBell, FaLock, FaMedal, FaRocket, FaSignInAlt, FaStar, FaTrophy } from "react-icons/fa";
import { notifications, settings, students, transactions } from "@/lib/sample-data";
import { achievementsFor, getLevel, getRank, totalPoints, xpProgress } from "@/lib/scoring";
import type { Student } from "@/types";

export function StudentPortal() {
  const [code, setCode] = useState("STU-1010");
  const [password, setPassword] = useState("123456");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  const rank = student ? getRank(student.id, students) : 0;
  const total = student ? totalPoints(student) : 0;
  const level = getLevel(total);
  const ownTransactions = useMemo(
    () => (student ? transactions.filter((item) => item.studentId === student.id) : []),
    [student]
  );
  const ownNotifications = useMemo(
    () => (student ? notifications.filter((item) => item.studentId === student.id) : []),
    [student]
  );

  function login(event: React.FormEvent) {
    event.preventDefault();
    const found = students.find((item) => item.code === code && item.password === password);
    if (!found) {
      setError("الكود أو كلمة المرور غير صحيحة");
      return;
    }
    setStudent(found);
    setError("");
  }

  if (!student) {
    return (
      <main className="grid min-h-screen place-items-center bg-hero-mesh px-4 py-8">
        <form onSubmit={login} className="glass-panel w-full max-w-md rounded-[2rem] p-6">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600 font-bold text-white">{settings.logoText}</span>
            <div>
              <p className="font-medium text-royal-950">دخول الطالب</p>
              <p className="text-xs text-slate-500">{settings.className}</p>
            </div>
          </Link>
          <div className="space-y-3">
            <label className="block text-sm font-medium">كود الطالب</label>
            <input className="field" value={code} onChange={(event) => setCode(event.target.value)} />
            <label className="block text-sm font-medium">كلمة المرور</label>
            <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
            <button className="primary-button w-full" type="submit">
              <FaSignInAlt />
              دخول آمن
            </button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <FaLock />
            الطالب يرى بياناته فقط عند ربط Firebase وقواعد الأمان.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hero-mesh">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <header className="glass-panel mb-6 flex flex-col gap-4 rounded-[1.5rem] p-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600 font-bold text-white">{settings.logoText}</span>
            <div>
              <p className="font-medium text-royal-950">لوحتي الشخصية</p>
              <p className="text-xs text-slate-500">{settings.className}</p>
            </div>
          </Link>
          <button className="gold-button" onClick={() => setStudent(null)}>تسجيل الخروج</button>
        </header>

        <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <motion.aside initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-5 text-center">
            <img src={student.avatar} alt={student.name} className="mx-auto h-36 w-36 rounded-[2rem] bg-royal-50" />
            <h1 className="mt-5 text-3xl font-medium text-royal-950">{student.name}</h1>
            <p className="mt-1 text-slate-500">{student.code} | {student.grade}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="الترتيب" value={`#${rank}`} />
              <Metric label="النقاط" value={total} />
              <Metric label="Bonus" value={student.bonus} />
              <Metric label="Minus" value={student.minus} />
            </div>
          </motion.aside>

          <div className="space-y-5">
            <section className="glass-panel rounded-[2rem] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">المستوى الحالي</p>
                  <h2 className="text-2xl font-medium text-royal-950">{level.name}</h2>
                </div>
                <FaRocket className="text-4xl text-gold-500" />
              </div>
              <div className="h-4 rounded-full bg-white/80">
                <motion.div initial={{ width: 0 }} animate={{ width: `${xpProgress(total)}%` }} className="h-4 rounded-full bg-gradient-to-l from-gold-300 to-royal-600" />
              </div>
              <p className="mt-3 text-sm text-slate-500">{Math.round(xpProgress(total))}% حتى المستوى التالي</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <Panel title="آخر العمليات">
                <div className="space-y-3">
                  {ownTransactions.length ? ownTransactions.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.type === "bonus" ? "Bonus" : "Minus"}</span>
                        <span className={item.type === "bonus" ? "text-emerald-600" : "text-rose-600"}>{item.points} نقطة</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{item.reason}</p>
                    </div>
                  )) : <p className="text-sm text-slate-500">لا توجد عمليات حديثة لهذا الطالب.</p>}
                </div>
              </Panel>

              <Panel title="الإشعارات">
                <div className="space-y-3">
                  {ownNotifications.length ? ownNotifications.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3">
                      <FaBell className="mt-1 text-gold-500" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.body}</p>
                      </div>
                    </div>
                  )) : <p className="text-sm text-slate-500">لا توجد إشعارات حالية.</p>}
                </div>
              </Panel>
            </section>

            <Panel title="إنجازاتي">
              <div className="grid gap-3 md:grid-cols-5">
                {achievementsFor(student, rank).map((achievement) => (
                  <motion.div key={achievement.id} whileHover={{ y: -4 }} className={`rounded-3xl border p-4 text-center ${achievement.unlocked ? "border-gold-300 bg-gold-100/80" : "border-slate-200 bg-white/60 opacity-70"}`}>
                    <div className="text-3xl">{achievement.icon}</div>
                    <p className="mt-2 text-sm font-medium">{achievement.title}</p>
                  </motion.div>
                ))}
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-medium text-royal-950">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-medium text-royal-950">
        {title === "إنجازاتي" ? <FaStar className="text-gold-500" /> : title === "آخر العمليات" ? <FaMedal className="text-royal-600" /> : <FaTrophy className="text-gold-500" />}
        {title}
      </h2>
      {children}
    </section>
  );
}
