import Link from "next/link";
import { FaArrowLeft, FaChalkboardTeacher, FaCrown, FaGraduationCap, FaMagic } from "react-icons/fa";
import { settings, students } from "@/lib/sample-data";
import { rankedStudents, totalPoints } from "@/lib/scoring";

export default function Home() {
  const top = rankedStudents(students).slice(0, 3);

  return (
    <main className="min-h-screen overflow-hidden bg-hero-mesh">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-8 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-royal-600 font-bold text-white">
              {settings.logoText}
            </span>
            <span className="text-sm font-medium text-slate-600">{settings.schoolName}</span>
          </div>

          <div className="space-y-5">
            <span className="chip">
              <FaMagic className="text-gold-500" />
              تجربة صفية محفزة وذكية
            </span>
            <h1 className="max-w-3xl text-4xl font-medium leading-tight text-royal-950 md:text-6xl">
              {settings.className}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              منصة عربية أنيقة لإدارة Bonus وMinus، متابعة مستويات الطلاب، عرض لوحة الشرف، وتحويل التقدم اليومي إلى تجربة مشوقة وواضحة.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/teacher" className="primary-button">
              <FaChalkboardTeacher />
              دخول المعلم
              <FaArrowLeft />
            </Link>
            <Link href="/student" className="gold-button">
              <FaGraduationCap />
              دخول الطالب
              <FaArrowLeft />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel relative rounded-[2rem] p-5">
            <div className="absolute -left-4 top-10 hidden rounded-3xl bg-white px-4 py-3 shadow-xl md:block">
              <p className="text-xs text-slate-500">أفضل طالب</p>
              <p className="font-medium text-royal-950">{top[0].name}</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-royal-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-100">إجمالي طلاب الفصل</p>
                    <p className="text-4xl font-medium">{students.length}</p>
                  </div>
                  <FaCrown className="text-5xl text-gold-300" />
                </div>
                <div className="mt-6 h-3 rounded-full bg-white/20">
                  <div className="h-3 w-4/5 rounded-full bg-gold-300" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {top.map((student, index) => (
                  <div key={student.id} className="soft-card p-4 text-center">
                    <img src={student.avatar} alt="" className="mx-auto h-16 w-16 rounded-2xl bg-royal-50" />
                    <p className="mt-3 text-sm font-medium text-royal-950">{student.name}</p>
                    <p className="text-xs text-slate-500">{index + 1}# | {totalPoints(student)} نقطة</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-medium">نبض الفصل اليوم</p>
                  <span className="chip">Live</span>
                </div>
                <div className="space-y-3">
                  {["مشاركة جماعية", "واجبات مكتملة", "تحدي السرعة"].map((label, index) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{label}</span>
                        <span>{78 + index * 6}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-royal-600" style={{ width: `${78 + index * 6}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
