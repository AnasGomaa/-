"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string | number;
  hint: string;
  icon: IconType;
  tone?: "blue" | "gold" | "green" | "red";
};

const toneClass = {
  blue: "bg-royal-50 text-royal-700",
  gold: "bg-gold-100 text-gold-700",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-rose-50 text-rose-700"
};

export function StatsCard({ label, value, hint, icon: Icon, tone = "blue" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="soft-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-medium text-royal-950">{value}</p>
        </div>
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${toneClass[tone]}`}>
          <Icon />
        </span>
      </div>
      <p className="mt-4 text-xs text-slate-500">{hint}</p>
    </motion.div>
  );
}
