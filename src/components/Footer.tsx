import { Github } from "lucide-react";
import { StarIcon } from "./icons/StarIcon";
import { PLATFORMS } from "@/types";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--midnight-deep)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-2 text-lg font-semibold mb-3"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--text-primary)",
              }}
            >
              <StarIcon size={16} />
              <span>CP Calendar</span>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              Never miss a contest again.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--text-tertiary)" }}
            >
              Platforms
            </h3>
            <div className="flex flex-col gap-2">
              {PLATFORMS.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[var(--amber-gold)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>

          {/* Open Source */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--text-tertiary)" }}
            >
              Open Source
            </h3>
            <a
              href="https://github.com/MaoMaoXia1238/cp-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--midnight-highlight)]"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-tertiary)",
          }}
        >
          Made with love for competitive programmers
        </div>
      </div>
    </footer>
  );
}
