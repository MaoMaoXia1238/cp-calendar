import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS } from "@/types";
import { getPlatformIcon } from "./icons/PlatformIcons";

interface Props {
  platform: Platform;
  isActive: boolean;
  onToggle: () => void;
}

export default function FilterChip({ platform, isActive, onToggle }: Props) {
  const info = PLATFORMS.find((p) => p.id === platform);
  const Icon = getPlatformIcon(platform);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: isActive ? info?.bgColor || "rgba(255,255,255,0.1)" : "transparent",
        border: isActive ? `1px solid ${info?.color || "var(--border-subtle)"}` : "1px solid var(--border-subtle)",
        color: isActive ? info?.color || "var(--text-primary)" : "var(--text-secondary)",
      }}
    >
      <Icon size={14} />
      {info?.name || platform}
    </motion.button>
  );
}
