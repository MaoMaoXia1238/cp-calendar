import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Settings, Menu, X } from "lucide-react";
import { StarIcon } from "./icons/StarIcon";

const links = [
  { path: "/", label: "Home" },
  { path: "/calendar", label: "Calendar" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const active = (p: string) => location.pathname === p;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: "rgba(10, 14, 39, 0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-primary)" }}
          >
            <StarIcon size={18} />
            <span>CP Calendar</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="relative py-1 transition-colors duration-200"
                style={{
                  color: active(l.path) ? "var(--amber-gold)" : "var(--text-secondary)",
                  borderBottom: active(l.path) ? "2px solid var(--amber-gold)" : "2px solid transparent",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/settings"
              className="p-2 rounded-lg transition-all duration-300 hover:rotate-90"
              style={{ color: "var(--text-secondary)" }}
            >
              <Settings size={20} />
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setOpen(!open)}
              style={{ color: "var(--text-secondary)" }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(5, 7, 20, 0.95)", backdropFilter: "blur(20px)" }}
        >
          {[...links, { path: "/settings", label: "Settings" }].map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="text-2xl font-semibold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: active(l.path) ? "var(--amber-gold)" : "var(--text-primary)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
