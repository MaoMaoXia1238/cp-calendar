import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { trpc } from "@/providers/trpc";
import type { Contest, Platform } from "@/types";

interface AppState {
  contests: Contest[];
  filteredContests: Contest[];
  selectedPlatforms: Set<Platform>;
  timezone: string;
  isLoading: boolean;
  lastUpdated: Date | null;
  togglePlatform: (platform: Platform) => void;
  setTimezone: (tz: string) => void;
  refresh: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<Platform>>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("selectedPlatforms");
        if (saved) {
          return new Set(JSON.parse(saved) as Platform[]);
        }
      }
      return new Set<Platform>([
        "codeforces",
        "leetcode",
        "atcoder",
        "luogu",
        "nowcoder",
      ]);
    }
  );

  const [timezone, setTimezoneState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return "UTC";
  });

  const utils = trpc.useUtils();
  const { data: contests = [], isLoading } = trpc.contest.list.useQuery();
  const refreshMutation = trpc.contest.refresh.useMutation({
    onSuccess: () => {
      utils.contest.list.invalidate();
    },
  });

  const filteredContests = contests.filter((c) =>
    selectedPlatforms.has(c.platform as Platform)
  );

  const togglePlatform = useCallback((platform: Platform) => {
    setSelectedPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) {
        next.delete(platform);
      } else {
        next.add(platform);
      }
      localStorage.setItem(
        "selectedPlatforms",
        JSON.stringify(Array.from(next))
      );
      return next;
    });
  }, []);

  const setTimezone = useCallback((tz: string) => {
    setTimezoneState(tz);
    localStorage.setItem("timezone", tz);
  }, []);

  const refresh = useCallback(() => {
    refreshMutation.mutate();
  }, [refreshMutation]);

  // Auto-refresh on mount
  useEffect(() => {
    refreshMutation.mutate();
    // Refresh every 5 minutes
    const interval = setInterval(() => {
      refreshMutation.mutate();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        contests: contests as Contest[],
        filteredContests: filteredContests as Contest[],
        selectedPlatforms,
        timezone,
        isLoading: isLoading || refreshMutation.isPending,
        lastUpdated: contests.length > 0 ? new Date() : null,
        togglePlatform,
        setTimezone,
        refresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
