import { Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { Contest } from "@/types";
import { PLATFORMS } from "@/types";
import { getPlatformIcon } from "./icons/PlatformIcons";

interface Props {
  contest: Contest;
  index?: number;
}

export default function ContestCard({ contest, index = 0 }: Props) {
  const platform = PLATFORMS.find((p) => p.id === contest.platform);
  const PlatformIcon = getPlatformIcon(contest.platform);

  const fmtDate = (d: Date) =>
    new Date(d).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const fmtDuration = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="rounded-xl p-5 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(17,24,66,0.9) 0%, rgba(10,14,39,0.95) 100%)",
        border: `1px solid ${platform?.bgColor || "var(--border-subtle)"}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            background: platform?.bgColor || "rgba(255,255,255,0.1)",
            color: platform?.color || "#fff",
          }}
        >
          <PlatformIcon size={14} />
          {platform?.name || contest.platform}
        </span>
        <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
          <Calendar size={12} />
          {fmtDate(contest.startTime)}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-3 line-clamp-2" style={{ color: "var(--text-primary)" }}>
        {contest.name}
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-tertiary)" }}>
          <Clock size={12} />
          {fmtDuration(contest.duration)}
        </span>
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 transition-colors hover:underline"
          style={{ color: "var(--amber-gold)" }}
        >
          Go to Contest
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}
