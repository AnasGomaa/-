import Link from "next/link";
import { FaArrowRight, FaCrown } from "react-icons/fa";
import { settings, students } from "@/lib/sample-data";
import { rankedStudents, totalPoints } from "@/lib/scoring";

export default function HonorPage() {
  const ranked = rankedStudents(students);
  const top = ranked.slice(0, 3);

  return (
    <main className="min-h-screen bg-hero-mesh px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="chip mb-6">
          <FaArrowRight />
          العودة للرئيسية
        </Link>
        <section className="glass-panel rounded-[2rem] p-6">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-slate-500">{settings.className}</p>
              <h1 className="text-4xl font-medium text-royal-950">لوحة الشرف</h1>
            </div>
            <FaCrown className="text-5xl text-gold-500" />
          </div>
          <div className="grid items-end gap-4 md:grid-cols-3">
            {[top[1], top[0], top[2]].map((student, index) => (
              <article key={student.id} className="text-center">
                <div className="soft-card p-5">
                  <div className="text-5xl">{index === 1 ? "🥇" : index === 0 ? "🥈" : "🥉"}</div>
                  <img src={student.avatar} alt={student.name} className="mx-auto mt-4 h-24 w-24 rounded-[2rem] bg-royal-50" />
                  <h2 className="mt-4 text-xl font-medium">{student.name}</h2>
                  <p className="text-slate-500">{totalPoints(student)} نقطة</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {ranked.slice(3).map((student, index) => (
              <div key={student.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center gap-3">
                  <img src={student.avatar} alt="" className="h-12 w-12 rounded-2xl bg-royal-50" />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.code}</p>
                  </div>
                </div>
                <span className="chip">#{index + 4} | {totalPoints(student)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
