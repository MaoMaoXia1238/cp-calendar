import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  targetDate: Date | string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden h-14 w-16 sm:w-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-bold tabular-nums"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-primary)" }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs mt-1 uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: Props) {
  const [tl, setTl] = useState(() => getTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const t = setInterval(() => setTl(getTimeLeft(new Date(targetDate))), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div
      className="inline-flex items-center gap-3 sm:gap-4 rounded-2xl px-6 sm:px-8 py-5"
      style={{
        background: "rgba(17, 24, 66, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <Digit value={tl.days} label="Days" />
      <span className="text-2xl sm:text-3xl font-bold pb-5" style={{ color: "var(--amber-gold)" }}>:</span>
      <Digit value={tl.hours} label="Hours" />
      <span className="text-2xl sm:text-3xl font-bold pb-5" style={{ color: "var(--amber-gold)" }}>:</span>
      <Digit value={tl.minutes} label="Mins" />
      <span className="text-2xl sm:text-3xl font-bold pb-5" style={{ color: "var(--amber-gold)" }}>:</span>
      <Digit value={tl.seconds} label="Secs" />
    </div>
  );
}
