import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Trophy, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/types";
import ContestCard from "@/components/ContestCard";
import CountdownTimer from "@/components/CountdownTimer";
import FilterChip from "@/components/FilterChip";
import { getPlatformIcon } from "@/components/icons/PlatformIcons";
import { StarIcon } from "@/components/icons/StarIcon";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const { filteredContests, selectedPlatforms, togglePlatform, isLoading } =
    useApp();

  const nextContest = useMemo(() => {
    if (filteredContests.length === 0) return null;
    const now = new Date();
    return filteredContests
      .filter((c) => new Date(c.startTime) > now)
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )[0];
  }, [filteredContests]);

  const upcomingContests = useMemo(() => {
    const now = new Date();
    return filteredContests
      .filter((c) => new Date(c.startTime) > now)
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 8);
  }, [filteredContests]);

  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredContests.forEach((c) => {
      counts[c.platform] = (counts[c.platform] || 0) + 1;
    });
    return counts;
  }, [filteredContests]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0a0e27 0%, #111842 40%, #0a0e27 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212, 162, 78, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <div
                className="p-4 rounded-full"
                style={{
                  background: "rgba(212, 162, 78, 0.1)",
                  border: "1px solid rgba(212, 162, 78, 0.3)",
                }}
              >
                <StarIcon size={32} />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              CP Calendar
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl max-w-2xl mx-auto"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              五大竞赛平台，一屏尽览。不再错过任何一场算法竞赛。
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center">
              <a
                href="/calendar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--amber-gold)",
                  color: "var(--midnight-base)",
                }}
              >
                <Trophy size={18} />
                查看竞赛日历
              </a>
            </motion.div>

            {/* Next contest countdown */}
            {nextContest && (
              <motion.div variants={fadeUp} className="pt-8">
                <p
                  className="text-sm mb-4 flex items-center justify-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Zap size={14} style={{ color: "var(--amber-gold)" }} />
                  下一场竞赛: {nextContest.name}
                </p>
                <CountdownTimer targetDate={nextContest.startTime} />
              </motion.div>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} style={{ color: "var(--text-tertiary)" }} />
          </motion.div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-16 px-4" style={{ background: "var(--midnight-base)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--text-primary)",
              }}
            >
              支持平台
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              自动聚合五大主流竞赛平台
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PLATFORMS.map((platform, i) => {
              const PlatformIcon = getPlatformIcon(platform.id);
              return (
                <motion.a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: "var(--midnight-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <PlatformIcon
                    size={28}
                    color={platform.color}
                  />
                  <div className="text-center">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {platform.name}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {platform.chineseName}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: platform.bgColor,
                      color: platform.color,
                    }}
                  >
                    {platformCounts[platform.id] || 0} 场
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Contests */}
      <section
        className="py-16 px-4"
        style={{ background: "var(--midnight-deep)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--text-primary)",
                }}
              >
                即将开始
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                {upcomingContests.length} 场 upcoming 竞赛
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <FilterChip
                  key={p.id}
                  platform={p.id}
                  isActive={selectedPlatforms.has(p.id)}
                  onToggle={() => togglePlatform(p.id)}
                />
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl h-36 animate-shimmer"
                  style={{ background: "var(--midnight-surface)" }}
                />
              ))}
            </div>
          ) : upcomingContests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingContests.map((contest, i) => (
                <ContestCard key={contest.id} contest={contest} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 rounded-xl"
              style={{
                background: "var(--midnight-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p style={{ color: "var(--text-secondary)" }}>
                暂无 upcoming 竞赛，请稍后刷新查看
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
