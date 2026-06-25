import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
  X,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  parseISO,
} from "date-fns";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/types";
import ContestCard from "@/components/ContestCard";

export default function CalendarPage() {
  const { filteredContests } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const m = searchParams.get("month");
    return m ? parseISO(m) : new Date();
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const d = searchParams.get("date");
    return d ? parseISO(d) : new Date();
  });
  const [view, setView] = useState<"month" | "list">(() => {
    return (searchParams.get("view") as "month" | "list") || "month";
  });

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("month", format(currentMonth, "yyyy-MM"));
    params.set("view", view);
    if (selectedDate) {
      params.set("date", format(selectedDate, "yyyy-MM-dd"));
    }
    setSearchParams(params, { replace: true });
  }, [currentMonth, selectedDate, view]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 1,
    });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Contests by date
  const contestsByDate = useMemo(() => {
    const map: Record<string, typeof filteredContests> = {};
    filteredContests.forEach((c) => {
      const dateKey = format(new Date(c.startTime), "yyyy-MM-dd");
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(c);
    });
    return map;
  }, [filteredContests]);

  const selectedDateContests = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return (contestsByDate[key] || []).sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, [selectedDate, contestsByDate]);

  const listContests = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return filteredContests
      .filter((c) => {
        const d = new Date(c.startTime);
        return d >= monthStart && d <= monthEnd;
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }, [filteredContests, currentMonth]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedDate) return;
      switch (e.key) {
        case "ArrowLeft":
          setSelectedDate(new Date(selectedDate.getTime() - 86400000));
          break;
        case "ArrowRight":
          setSelectedDate(new Date(selectedDate.getTime() + 86400000));
          break;
        case "ArrowUp":
          setSelectedDate(new Date(selectedDate.getTime() - 7 * 86400000));
          break;
        case "ArrowDown":
          setSelectedDate(new Date(selectedDate.getTime() + 7 * 86400000));
          break;
        case "t":
        case "T":
          setSelectedDate(new Date());
          setCurrentMonth(new Date());
          break;
        case "Escape":
          setSelectedDate(null);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDate]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--midnight-highlight)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ChevronLeft size={20} />
          </button>
          <h1
            className="text-2xl font-bold min-w-[200px] text-center"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text-primary)",
            }}
          >
            {format(currentMonth, "yyyy年 M月")}
          </h1>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--midnight-highlight)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => {
              setCurrentMonth(new Date());
              setSelectedDate(new Date());
            }}
            className="ml-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: "var(--midnight-surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                view === "month" ? "var(--midnight-surface)" : "transparent",
              color:
                view === "month"
                  ? "var(--amber-gold)"
                  : "var(--text-secondary)",
              border: `1px solid ${view === "month" ? "var(--amber-gold)" : "var(--border-subtle)"}`,
            }}
          >
            <CalendarDays size={16} />
            月视图
          </button>
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                view === "list" ? "var(--midnight-surface)" : "transparent",
              color:
                view === "list"
                  ? "var(--amber-gold)"
                  : "var(--text-secondary)",
              border: `1px solid ${view === "list" ? "var(--amber-gold)" : "var(--border-subtle)"}`,
            }}
          >
            <List size={16} />
            列表
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "month" ? (
          <motion.div
            key="month"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* Calendar Grid */}
            <div className="flex-1">
              {/* Week headers */}
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium py-2 uppercase tracking-wider"
                    style={{
                      color: "var(--text-tertiary)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  const dateKey = format(day, "yyyy-MM-dd");
                  const dayContests = contestsByDate[dateKey] || [];
                  const isSelected = selectedDate
                    ? isSameDay(day, selectedDate)
                    : false;
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isTodayDate = isToday(day);

                  return (
                    <motion.button
                      key={dateKey}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01 }}
                      onClick={() => setSelectedDate(day)}
                      className="relative min-h-[80px] sm:min-h-[100px] p-1.5 rounded-lg text-left transition-all duration-200 flex flex-col"
                      style={{
                        background: isSelected
                          ? "rgba(212, 162, 78, 0.05)"
                          : "transparent",
                        border: isSelected
                          ? "1px solid var(--amber-gold)"
                          : "1px solid var(--border-subtle)",
                        opacity: isCurrentMonth ? 1 : 0.4,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isTodayDate
                              ? "var(--amber-gold)"
                              : isCurrentMonth
                                ? "var(--text-primary)"
                                : "var(--text-tertiary)",
                          }}
                        >
                          {format(day, "d")}
                        </span>
                        {isTodayDate && (
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--amber-gold)" }}
                          />
                        )}
                      </div>

                      {/* Contest dots */}
                      {dayContests.length > 0 && (
                        <div className="flex flex-wrap gap-0.5 mt-auto">
                          {dayContests.slice(0, 3).map((c, ci) => {
                            const p = PLATFORMS.find(
                              (pl) => pl.id === c.platform
                            );
                            return (
                              <div
                                key={ci}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: p?.color || "#fff",
                                }}
                              />
                            );
                          })}
                          {dayContests.length > 3 && (
                            <span
                              className="text-[8px]"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              +{dayContests.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar - day detail */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-80 xl:w-96"
              >
                <div
                  className="rounded-xl p-4 sticky top-20"
                  style={{
                    background: "var(--midnight-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--text-primary)",
                      }}
                    >
                      {format(selectedDate, "yyyy-MM-dd EEEE")}
                    </h3>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="p-1 rounded-lg hover:bg-[var(--midnight-highlight)] transition-colors"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {selectedDateContests.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateContests.map((contest) => (
                        <ContestCard key={contest.id} contest={contest} />
                      ))}
                    </div>
                  ) : (
                    <p
                      className="text-center py-8"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      当天暂无竞赛
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {listContests.length > 0 ? (
              <div className="space-y-3 max-w-3xl">
                {listContests.map((contest, i) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    index={i}
                  />
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
                  本月暂无竞赛
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
