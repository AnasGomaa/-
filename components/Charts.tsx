"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip
} from "chart.js";
import { Bar, Line, Radar } from "react-chartjs-2";
import type { Student } from "@/types";
import { rankedStudents, totalPoints } from "@/lib/scoring";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Tooltip, Legend, Filler);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { family: "Cairo" }
      }
    }
  },
  scales: {
    x: { ticks: { font: { family: "Cairo" } }, grid: { display: false } },
    y: { ticks: { font: { family: "Cairo" } }, grid: { color: "rgba(148,163,184,.2)" } }
  }
};

export function ProgressChart({ students }: { students: Student[] }) {
  return (
    <div className="h-72">
      <Line
        options={options}
        data={{
          labels: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
          datasets: [
            {
              label: "متوسط النقاط",
              data: [32, 41, 47, 56, 68, Math.round(students.reduce((sum, item) => sum + totalPoints(item), 0) / students.length)],
              borderColor: "#1d4ed8",
              backgroundColor: "rgba(29,78,216,.12)",
              fill: true,
              tension: 0.42
            }
          ]
        }}
      />
    </div>
  );
}

export function PointsChart({ students }: { students: Student[] }) {
  const top = rankedStudents(students).slice(0, 7);
  return (
    <div className="h-72">
      <Bar
        options={options}
        data={{
          labels: top.map((student) => student.name),
          datasets: [
            { label: "Bonus", data: top.map((student) => student.bonus), backgroundColor: "#1d4ed8", borderRadius: 10 },
            { label: "Minus", data: top.map((student) => student.minus), backgroundColor: "#f59e0b", borderRadius: 10 }
          ]
        }}
      />
    </div>
  );
}

export function RankChart({ students }: { students: Student[] }) {
  const top = rankedStudents(students).slice(0, 6);
  return (
    <div className="h-72">
      <Radar
        options={{ ...options, scales: { r: { ticks: { display: false }, grid: { color: "rgba(148,163,184,.25)" } } } }}
        data={{
          labels: top.map((student) => student.name),
          datasets: [
            {
              label: "ترتيب الفصل",
              data: top.map((student) => totalPoints(student)),
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245,158,11,.18)",
              pointBackgroundColor: "#1d4ed8"
            }
          ]
        }}
      />
    </div>
  );
}
