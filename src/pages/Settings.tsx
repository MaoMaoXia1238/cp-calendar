import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Globe,
  Clock,
  Eye,
  Github,
  Check,
  Database,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/types";
import { getPlatformIcon } from "@/components/icons/PlatformIcons";
import { StarIcon } from "@/components/icons/StarIcon";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const TIMEZONES = [
  { value: "auto", label: "自动 (浏览器默认)" },
  { value: "UTC", label: "UTC" },
  { value: "Asia/Shanghai", label: "Asia/Shanghai (北京/上海)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (东京)" },
  { value: "Asia/Seoul", label: "Asia/Seoul (首尔)" },
  { value: "America/New_York", label: "America/New_York (纽约)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (洛杉矶)" },
  { value: "Europe/London", label: "Europe/London (伦敦)" },
  { value: "Europe/Paris", label: "Europe/Paris (巴黎)" },
  { value: "Europe/Berlin", label: "Europe/Berlin (柏林)" },
  { value: "Europe/Moscow", label: "Europe/Moscow (莫斯科)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (新加坡)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (迪拜)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (悉尼)" },
  { value: "Asia/Hong_Kong", label: "Asia/Hong_Kong (香港)" },
  { value: "Asia/Taipei", label: "Asia/Taipei (台北)" },
  { value: "America/Toronto", label: "America/Toronto (多伦多)" },
  { value: "America/Vancouver", label: "America/Vancouver (温哥华)" },
  { value: "Asia/Bangkok", label: "Asia/Bangkok (曼谷)" },
  { value: "Asia/Jakarta", label: "Asia/Jakarta (雅加达)" },
];

export default function SettingsPage() {
  const {
    selectedPlatforms,
    togglePlatform,
    timezone,
    setTimezone,
    isLoading,
    lastUpdated,
    refresh,
    contests,
  } = useApp();

  const [timeFormat, setTimeFormat] = useState<"24h" | "12h">(() => {
    return (localStorage.getItem("timeFormat") as "24h" | "12h") || "24h";
  });
  const [defaultView, setDefaultView] = useState<"home" | "calendar">(() => {
    return (localStorage.getItem("defaultView") as "home" | "calendar") || "home";
  });
  const [refreshStatus, setRefreshStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");

  useEffect(() => {
    localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    localStorage.setItem("defaultView", defaultView);
  }, [defaultView]);

  const handleRefresh = () => {
    setRefreshStatus("loading");
    refresh();
    setTimeout(() => {
      setRefreshStatus("success");
      setTimeout(() => setRefreshStatus("idle"), 2000);
    }, 1500);
  };

  const allSelected = selectedPlatforms.size === PLATFORMS.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Title */}
        <motion.div variants={cardVariants}>
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text-primary)",
            }}
          >
            设置
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            自定义你的竞赛日历体验
          </p>
        </motion.div>

        {/* Platform Filters */}
        <motion.div
          variants={cardVariants}
          className="rounded-xl p-6"
          style={{
            background: "var(--midnight-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-semibold flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Eye size={18} style={{ color: "var(--amber-gold)" }} />
              平台显示
            </h2>
            <button
              onClick={() => {
                PLATFORMS.forEach((p) => {
                  if (!allSelected && !selectedPlatforms.has(p.id)) {
                    togglePlatform(p.id);
                  }
                  if (allSelected) {
                    togglePlatform(p.id);
                  }
                });
              }}
              className="text-sm transition-colors hover:underline"
              style={{ color: "var(--amber-gold)" }}
            >
              {allSelected ? "取消全选" : "全选"}
            </button>
          </div>

          <div className="space-y-3">
            {PLATFORMS.map((platform) => {
              const PlatformIcon = getPlatformIcon(platform.id);
              const isActive = selectedPlatforms.has(platform.id);

              return (
                <div
                  key={platform.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <PlatformIcon
                      size={20}
                      color={platform.color}
                    />
                    <div>
                      <div
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {platform.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {platform.chineseName}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePlatform(platform.id)}
                    className="relative w-12 h-6 rounded-full transition-all duration-200"
                    style={{
                      background: isActive
                        ? platform.color
                        : "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
                      style={{
                        background: "#fff",
                        left: isActive ? "26px" : "2px",
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Timezone */}
        <motion.div
          variants={cardVariants}
          className="rounded-xl p-6"
          style={{
            background: "var(--midnight-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            className="text-lg font-semibold flex items-center gap-2 mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            <Globe size={18} style={{ color: "var(--amber-gold)" }} />
            时区设置
          </h2>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={{
              background: "var(--midnight-base)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Time Format & Default View */}
        <motion.div
          variants={cardVariants}
          className="rounded-xl p-6"
          style={{
            background: "var(--midnight-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            className="text-lg font-semibold flex items-center gap-2 mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            <Clock size={18} style={{ color: "var(--amber-gold)" }} />
            显示偏好
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span style={{ color: "var(--text-secondary)" }}>时间格式</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
                {(["24h", "12h"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setTimeFormat(format)}
                    className="px-4 py-1.5 text-sm font-medium transition-all"
                    style={{
                      background:
                        timeFormat === format
                          ? "var(--amber-gold)"
                          : "var(--midnight-base)",
                      color:
                        timeFormat === format
                          ? "var(--midnight-base)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {format === "24h" ? "24小时制" : "12小时制"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: "var(--text-secondary)" }}>默认页面</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
                {(["home", "calendar"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setDefaultView(view)}
                    className="px-4 py-1.5 text-sm font-medium transition-all"
                    style={{
                      background:
                        defaultView === view
                          ? "var(--amber-gold)"
                          : "var(--midnight-base)",
                      color:
                        defaultView === view
                          ? "var(--midnight-base)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {view === "home" ? "首页" : "日历"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          variants={cardVariants}
          className="rounded-xl p-6"
          style={{
            background: "var(--midnight-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            className="text-lg font-semibold flex items-center gap-2 mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            <Database size={18} style={{ color: "var(--amber-gold)" }} />
            数据管理
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                缓存了 {contests.length} 场竞赛
              </p>
              {lastUpdated && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  上次更新: {lastUpdated.toLocaleString("zh-CN")}
                </p>
              )}
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshStatus === "loading"}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
              style={{
                background: "var(--amber-gold)",
                color: "var(--midnight-base)",
              }}
            >
              {refreshStatus === "loading" ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : refreshStatus === "success" ? (
                <Check size={16} />
              ) : (
                <RefreshCw size={16} />
              )}
              {refreshStatus === "loading"
                ? "刷新中..."
                : refreshStatus === "success"
                  ? "已更新"
                  : "立即刷新"}
            </button>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          variants={cardVariants}
          className="rounded-xl p-6"
          style={{
            background: "var(--midnight-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{
                background: "rgba(212, 162, 78, 0.1)",
              }}
            >
              <StarIcon size={20} />
            </div>
            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--text-primary)",
                }}
              >
                CP Calendar
              </h2>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                v1.0.0
              </p>
            </div>
          </div>

          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            自动聚合洛谷、牛客、Codeforces、LeetCode、AtCoder
            五大平台竞赛信息，让你不再错过任何一场算法竞赛。
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {PLATFORMS.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors hover:opacity-80"
                style={{
                  background: p.bgColor,
                  color: p.color,
                }}
              >
                {p.name}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/MaoMaoXia1238/cp-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:underline"
            style={{ color: "var(--amber-gold)" }}
          >
            <Github size={16} />
            在 GitHub 上查看源码
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
