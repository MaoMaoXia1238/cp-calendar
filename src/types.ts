export interface Contest {
  id: string;
  platform: "codeforces" | "leetcode" | "atcoder" | "luogu" | "nowcoder";
  name: string;
  url: string;
  startTime: Date;
  endTime: Date;
  duration: number;
}

export type Platform = Contest["platform"];

export interface PlatformInfo {
  id: Platform;
  name: string;
  chineseName: string;
  color: string;
  bgColor: string;
  url: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "codeforces",
    name: "Codeforces",
    chineseName: "Codeforces",
    color: "#1f8ac3",
    bgColor: "rgba(31, 138, 195, 0.15)",
    url: "https://codeforces.com/contests",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    chineseName: "力扣",
    color: "#ffa116",
    bgColor: "rgba(255, 161, 22, 0.15)",
    url: "https://leetcode.com/contest/",
  },
  {
    id: "atcoder",
    name: "AtCoder",
    chineseName: "AtCoder",
    color: "#ffffff",
    bgColor: "rgba(255, 255, 255, 0.10)",
    url: "https://atcoder.jp/contests/",
  },
  {
    id: "luogu",
    name: "Luogu",
    chineseName: "洛谷",
    color: "#5cadff",
    bgColor: "rgba(92, 173, 255, 0.15)",
    url: "https://www.luogu.com.cn/contest/list",
  },
  {
    id: "nowcoder",
    name: "NowCoder",
    chineseName: "牛客",
    color: "#25bb9b",
    bgColor: "rgba(37, 187, 155, 0.15)",
    url: "https://ac.nowcoder.com/acm/contest/vip-index",
  },
];
