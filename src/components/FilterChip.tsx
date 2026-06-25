import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS } from "@/types";
import { getPlatformIcon } from "./icons/PlatformIcons";

interface FilterChipProps {
  platform: Platform;
  isActive: boolean;
  onToggle: () => void;
}

export default function FilterChip({
  platform,
  isActive,
  onToggle,
}: FilterChipProps) {
  const platformInfo = PLATFORMS.find((p) => p.id === platform);
  const PlatformIcon = getPlatformIcon(platform);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: isActive
          ? platformInfo?.bgColor || "rgba(255,255,255,0.1)"
          : "transparent",
        border: isActive
          ? `1px solid ${platformInfo?.color || "var(--border-subtle)"}`
          : "1px solid var(--border-subtle)",
        color: isActive
          ? platformInfo?.color || "var(--text-primary)"
          : "var(--text-secondary)",
      }}
    >
      <PlatformIcon size={14} />
      {platformInfo?.name || platform}
    </motion.button>
  );
}
