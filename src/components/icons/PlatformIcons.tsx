import type { Platform } from "@/types";

interface IconProps {
  size?: number;
  className?: string;
}

export function CodeforcesIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5S3 20.328 3 19.5V9c0-.828.672-1.5 1.5-1.5zM9 4.5c.828 0 1.5.672 1.5 1.5v13.5c0 .828-.672 1.5-1.5 1.5S7.5 20.328 7.5 19.5V6c0-.828.672-1.5 1.5-1.5zM13.5 10.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5S12 20.328 12 19.5V12c0-.828.672-1.5 1.5-1.5zM18 6c.828 0 1.5.672 1.5 1.5v12c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-12c0-.828.672-1.5 1.5-1.5z" />
    </svg>
  );
}

export function LeetCodeIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 00-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.876l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.835-1.452l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM5.429 13.11l4.347-4.361c.195-.195.449-.292.703-.292s.508.097.703.292l2.697 2.606c.514.514 1.385.497 1.9-.038.536-.536.554-1.387.039-1.902l-2.609-2.636a5.065 5.065 0 00-3.49-1.441c-1.329 0-2.593.536-3.489 1.441l-4.347 4.361c-.98.981-1.494 2.337-1.494 3.835 0 1.437.473 2.825 1.384 3.898l-1.384 1.415c-.514.514-.496 1.365.039 1.901.268.267.628.403.987.403s.72-.136.988-.403l1.427-1.458a5.076 5.076 0 002.981 1.001c1.329 0 2.593-.536 3.489-1.441l2.697-2.606c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.552-1.9-.038l-2.697 2.606c-.195.195-.449.292-.703.292s-.508-.097-.703-.292l-4.347-4.361c-.466-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824z" />
    </svg>
  );
}

export function AtCoderIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2L2 19h20L12 2zm0 3.5L17.5 17h-11L12 5.5z" />
    </svg>
  );
}

export function LuoguIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}

export function NowCoderIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L18.5 8 12 11.25 5.5 8 12 4.5zM4 9.22l7 3.5v6.56l-7-3.5V9.22zm9 10.06v-6.56l7-3.5v6.56l-7 3.5z" />
    </svg>
  );
}

export function getPlatformIcon(platform: string) {
  switch (platform) {
    case "codeforces":
      return CodeforcesIcon;
    case "leetcode":
      return LeetCodeIcon;
    case "atcoder":
      return AtCoderIcon;
    case "luogu":
      return LuoguIcon;
    case "nowcoder":
      return NowCoderIcon;
    default:
      return CodeforcesIcon;
  }
}
