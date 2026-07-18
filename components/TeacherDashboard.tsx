"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaAward,
  FaBell,
  FaChartLine,
  FaCog,
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaGift,
  FaLock,
  FaMedal,
  FaMinusCircle,
  FaPlusCircle,
  FaSearch,
  FaSignInAlt,
  FaStar,
  FaTrash,
  FaTrophy,
  FaUpload,
  FaUserEdit,
  FaUsers
} from "react-icons/fa";
import { PointsChart, ProgressChart, RankChart } from "@/components/Charts";
import { PointModal } from "@/components/PointModal";
import { StatsCard } from "@/components/StatsCard";
import { exportStudentsToExcel, exportTransactionsToPdf } from "@/lib/exporters";
import { rewards as baseRewards, settings, students as baseStudents, transactions as baseTransactions } from "@/lib/sample-data";
import { achievementsFor, rankedStudents, totalPoints } from "@/lib/scoring";
import type { PointTransaction, PointType, Reward, Student } from "@/types";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: FaChartLine },
  { id: "students", label: "الطلاب", icon: FaUsers },
  { id: "history", label: "السجل", icon: FaBell },
  { id: "honor", label: "الشرف", icon: FaTrophy },
  { id: "rewards", label: "المكافآت", icon: FaGift },
  { id: "settings", label: "الإعدادات", icon: FaCog }
] as const;

type Tab = (typeof tabs)[number]["id"];

export function TeacherDashboard() {
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);
  const [teacherCode, setTeacherCode] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [students, setStudents] = useState(baseStudents);
  const [transactions, setTransactions] = useState(baseTransactions);
  const [rewards, setRewards] = useState(baseRewards);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [pointType, setPointType] = useState<PointType>("bonus");
  const [editing, setEditing] = useState<Student | null>(null);

  const ranked = useMemo(() => rankedStudents(students), [students]);
  const filteredStudents = useMemo(
    () => ranked.filter((student) => `${student.name} ${student.code} ${student.grade}`.includes(search)),
    [ranked, search]
  );
  const totalBonus = students.reduce((sum, item) => sum + item.bonus, 0);
  const totalMinus = students.reduce((sum, item) => sum + item.minus, 0);
  const best = ranked[0];
  const lowest = ranked[ranked.length - 1];

  function openPoint(student: Student, type: PointType) {
    setSelected(student);
    setPointType(type);
  }

  function submitPoint(points: number, reason: string) {
    if (!selected) return;
    setStudents((current) =>
      current.map((student) =>
        student.id === selected.id
          ? {
              ...student,
              bonus: pointType === "bonus" ? student.bonus + points : student.bonus,
              minus: pointType === "minus" ? student.minus + points : student.minus,
              streak: pointType === "bonus" ? student.streak + 1 : 0,
              weeklyGain: pointType === "bonus" ? student.weeklyGain + points : Math.max(0, student.weeklyGain - points)
            }
          : student
      )
    );
    const tx: PointTransaction = {
      id: crypto.randomUUID(),
      studentId: selected.id,
      studentName: selected.name,
      teacherName: "أ. أحمد رمضان",
      points,
      type: pointType,
      reason,
      createdAt: new Date().toISOString()
    };
    setTransactions((current) => [tx, ...current]);
    setSelected(null);
  }

  function saveStudent(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const payload: Student = {
      id: editing?.id ?? crypto.randomUUID(),
      name,
      code: editing?.code ?? `STU-${Date.now().toString().slice(-5)}`,
      password: editing?.password ?? "123456",
      grade: String(formData.get("grade") || editing?.grade || "الفصل"),
      avatar: String(formData.get("avatar") || `https://api.dicebear.com/9.x/notionists/svg?seed=${Date.now()}`),
      seatNumber: String(formData.get("seatNumber") ?? ""),
      bonus: editing?.bonus ?? 0,
      minus: editing?.minus ?? 0,
      streak: editing?.streak ?? 0,
      weeklyGain: editing?.weeklyGain ?? 0
    };
    setStudents((current) => (editing ? current.map((item) => (item.id === editing.id ? payload : item)) : [payload, ...current]));
    setEditing(null);
  }

  function unlockTeacher(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (teacherCode === "1370") {
      setIsTeacherUnlocked(true);
      setTeacherError("");
      return;
    }
    setTeacherError("الرمز غير صحيح");
  }

  if (!isTeacherUnlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-hero-mesh px-4 py-8">
        <form onSubmit={unlockTeacher} className="glass-panel w-full max-w-md rounded-[2rem] p-6">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600 font-bold text-white">{settings.logoText}</span>
            <div>
              <p className="font-medium text-royal-950">دخول المعلم</p>
              <p className="text-xs text-slate-500">اكتب رمز المعلم لفتح لوحة التحكم</p>
            </div>
          </Link>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <FaLock className="text-gold-500" />
            رمز المعلم
          </label>
          <input
            className="field text-center text-2xl tracking-[0.4em]"
            inputMode="numeric"
            maxLength={4}
            type="password"
            value={teacherCode}
            onChange={(event) => setTeacherCode(event.target.value.replace(/\D/g, ""))}
            placeholder="••••"
          />
          {teacherError && <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{teacherError}</p>}
          <button className="primary-button mt-5 w-full" type="submit">
            <FaSignInAlt />
            فتح لوحة المعلم
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hero-mesh">
      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
        <header className="glass-panel sticky top-4 z-30 mb-6 rounded-[1.5rem] p-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600 font-bold text-white">{settings.logoText}</span>
              <div>
                <p className="font-medium text-royal-950">{settings.className}</p>
                <p className="text-xs text-slate-500">لوحة تحكم المعلم | {settings.academicYear}</p>
              </div>
            </Link>
            <nav className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm transition ${
                      activeTab === tab.id ? "bg-royal-600 text-white shadow-lg shadow-royal-600/20" : "bg-white/70 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                  <StatsCard label="عدد الطلاب" value={students.length} hint="طالب مسجل في الفصل" icon={FaUsers} />
                  <StatsCard label="مجموع البونص" value={totalBonus} hint="نقاط إيجابية مكتسبة" icon={FaPlusCircle} tone="green" />
                  <StatsCard label="مجموع الماينص" value={totalMinus} hint="نقاط تحتاج متابعة" icon={FaMinusCircle} tone="red" />
                  <StatsCard label="أفضل طالب" value={best.name} hint={`${totalPoints(best)} نقطة صافية`} icon={FaTrophy} tone="gold" />
                  <StatsCard label="أقل طالب" value={lowest.name} hint={`${totalPoints(lowest)} نقطة صافية`} icon={FaChartLine} />
                  <StatsCard label="عدد الجوائز" value={rewards.length} hint="جوائز قابلة للمنح" icon={FaGift} tone="gold" />
                </div>
                <div className="grid gap-5 xl:grid-cols-3">
                  <Panel title="تطور الطلاب"><ProgressChart students={students} /></Panel>
                  <Panel title="توزيع النقاط"><PointsChart students={students} /></Panel>
                  <Panel title="ترتيب الفصل"><RankChart students={students} /></Panel>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
                <Panel title={editing ? "تعديل طالب" : "إضافة طالب"}>
                  <form action={saveStudent} className="space-y-3">
                    <input className="field" name="name" placeholder="اسم الطالب" defaultValue={editing?.name} required />
                    <input className="field" name="grade" placeholder="الفصل أو الصف" defaultValue={editing?.grade ?? "2 إعدادي"} />
                    <input className="field" name="seatNumber" placeholder="رقم الجلوس اختياري" defaultValue={editing?.seatNumber} />
                    <input className="field" name="avatar" placeholder="رابط الصورة اختياري" defaultValue={editing?.avatar} />
                    <div className="grid grid-cols-2 gap-2">
                      <button className="primary-button" type="submit">{editing ? "حفظ التعديل" : "إضافة الطالب"}</button>
                      <button className="gold-button" type="button" onClick={() => setEditing(null)}>مسح</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <button className="icon-button w-full" type="button" aria-label="استيراد Excel"><FaUpload /></button>
                      <button className="icon-button w-full" type="button" onClick={() => exportStudentsToExcel(students)} aria-label="تصدير Excel"><FaFileExcel /></button>
                      <button className="icon-button w-full" type="button" onClick={() => exportTransactionsToPdf(transactions)} aria-label="تصدير PDF"><FaFilePdf /></button>
                    </div>
                  </form>
                </Panel>
                <div className="space-y-4">
                  <div className="glass-panel flex items-center gap-3 rounded-[1.5rem] p-3">
                    <FaSearch className="text-slate-400" />
                    <input className="w-full bg-transparent outline-none" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث سريع باسم الطالب" />
                  </div>
                  <div className="glass-panel overflow-hidden rounded-[1.5rem]">
                    <div className="grid grid-cols-[56px_1fr_90px_90px_100px_160px] gap-3 border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 max-lg:hidden">
                      <span>الترتيب</span>
                      <span>اسم الطالب</span>
                      <span>Bonus</span>
                      <span>Minus</span>
                      <span>النتيجة</span>
                      <span>إجراءات</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {filteredStudents.map((student) => {
                        const rank = ranked.findIndex((item) => item.id === student.id) + 1;
                        const finalScore = totalPoints(student);
                        return (
                          <div key={student.id} className="grid items-center gap-3 px-4 py-4 lg:grid-cols-[56px_1fr_90px_90px_100px_160px]">
                            <span className="chip w-fit">#{rank}</span>
                            <div className="flex min-w-0 items-center gap-3">
                              <img src={student.avatar} alt="" className="h-11 w-11 rounded-2xl bg-royal-50" />
                              <div className="min-w-0">
                                <p className="truncate font-medium text-royal-950">{student.name}</p>
                                <p className="text-xs text-slate-500">{student.grade}</p>
                              </div>
                            </div>
                            <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-700">+{student.bonus}</span>
                            <span className="rounded-2xl bg-rose-50 px-3 py-2 text-center text-sm font-medium text-rose-700">-{student.minus}</span>
                            <span className="rounded-2xl bg-royal-600 px-3 py-2 text-center text-sm font-medium text-white">{finalScore}</span>
                            <div className="flex gap-2">
                              <button className="icon-button" aria-label="إضافة Bonus" onClick={() => openPoint(student, "bonus")}><FaPlusCircle /></button>
                              <button className="icon-button text-rose-600" aria-label="إضافة Minus" onClick={() => openPoint(student, "minus")}><FaMinusCircle /></button>
                              <button className="icon-button" aria-label="تعديل الطالب" onClick={() => setEditing(student)}><FaUserEdit /></button>
                              <button className="icon-button text-rose-600" aria-label="حذف الطالب" onClick={() => setStudents((current) => current.filter((item) => item.id !== student.id))}><FaTrash /></button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <Panel title="سجل العمليات">
                <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                  <FaSearch className="text-slate-400" />
                  <input className="w-full bg-transparent outline-none" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث في السجل باسم الطالب أو السبب" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-right text-sm">
                    <thead className="text-slate-500">
                      <tr className="border-b border-slate-200">
                        <th className="py-3 font-medium">التاريخ والوقت</th>
                        <th className="py-3 font-medium">المعلم</th>
                        <th className="py-3 font-medium">الطالب</th>
                        <th className="py-3 font-medium">النوع</th>
                        <th className="py-3 font-medium">النقاط</th>
                        <th className="py-3 font-medium">السبب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions
                        .filter((item) => `${item.studentName} ${item.reason} ${item.teacherName}`.includes(search))
                        .map((item) => (
                          <tr key={item.id} className="border-b border-slate-100">
                            <td className="py-3">{new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</td>
                            <td className="py-3">{item.teacherName}</td>
                            <td className="py-3">{item.studentName}</td>
                            <td className="py-3"><span className="chip">{item.type === "bonus" ? "Bonus" : "Minus"}</span></td>
                            <td className="py-3">{item.points}</td>
                            <td className="py-3">{item.reason}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}

            {activeTab === "honor" && <HonorBoard students={ranked} />}

            {activeTab === "rewards" && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {rewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} onGrant={() => setRewards((current) => current.map((item) => item.id === reward.id ? { ...item, stock: Math.max(0, item.stock - 1), grantedTo: [...item.grantedTo, best.id] } : item))} />
                ))}
              </div>
            )}

            {activeTab === "settings" && (
              <Panel title="إعدادات المنصة">
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="field" defaultValue={settings.schoolName} aria-label="اسم المدرسة" />
                  <input className="field" defaultValue={settings.className} aria-label="اسم الفصل" />
                  <input className="field" defaultValue={settings.logoText} aria-label="الشعار" />
                  <input className="field" defaultValue={settings.academicYear} aria-label="العام الدراسي" />
                  <input className="field h-14" type="color" defaultValue={settings.primaryColor} aria-label="لون المنصة" />
                  <input className="field h-14" type="color" defaultValue={settings.accentColor} aria-label="اللون الذهبي" />
                </div>
                <button className="primary-button mt-5">حفظ الإعدادات</button>
              </Panel>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
      <PointModal student={selected} type={pointType} onClose={() => setSelected(null)} onSubmit={submitPoint} />
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-[1.5rem] p-5">
      <h2 className="mb-4 text-xl font-medium text-royal-950">{title}</h2>
      {children}
    </section>
  );
}

function HonorBoard({ students }: { students: Student[] }) {
  const topThree = students.slice(0, 3);
  return (
    <div className="space-y-6">
      <div className="grid items-end gap-4 md:grid-cols-3">
        {[topThree[1], topThree[0], topThree[2]].map((student, visualIndex) => {
          const medal = visualIndex === 1 ? "🥇" : visualIndex === 0 ? "🥈" : "🥉";
          const height = visualIndex === 1 ? "h-44" : visualIndex === 0 ? "h-36" : "h-28";
          return (
            <motion.div key={student.id} whileHover={{ y: -8 }} className="text-center">
              <div className="soft-card mb-3 p-5">
                <div className="text-4xl">{medal}</div>
                <img src={student.avatar} alt={student.name} className="mx-auto mt-3 h-20 w-20 rounded-3xl bg-royal-50" />
                <p className="mt-3 font-medium">{student.name}</p>
                <p className="text-sm text-slate-500">{totalPoints(student)} نقطة</p>
              </div>
              <div className={`${height} rounded-t-[2rem] bg-gradient-to-b from-gold-300 to-royal-600 shadow-glass`} />
            </motion.div>
          );
        })}
      </div>
      <Panel title="الإنجازات المتحركة">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {achievementsFor(students[0], 1).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-3xl border p-4 ${achievement.unlocked ? "border-gold-300 bg-gold-100/80" : "border-slate-200 bg-white/70"}`}
            >
              <div className="text-3xl">{achievement.icon}</div>
              <p className="mt-3 font-medium">{achievement.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RewardCard({ reward, onGrant }: { reward: Reward; onGrant: () => void }) {
  return (
    <article className="soft-card p-5">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-100 text-2xl text-gold-700">
        {reward.icon === "FaBookOpen" ? <FaAward /> : reward.icon === "FaStar" ? <FaStar /> : reward.icon === "FaGift" ? <FaGift /> : <FaMedal />}
      </div>
      <h3 className="mt-4 font-medium text-royal-950">{reward.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{reward.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="chip">المخزون {reward.stock}</span>
        <span className="chip">مُنحت {reward.grantedTo.length}</span>
      </div>
      <button className="primary-button mt-4 w-full" onClick={onGrant}>
        <FaDownload />
        منح للأفضل
      </button>
    </article>
  );
}
