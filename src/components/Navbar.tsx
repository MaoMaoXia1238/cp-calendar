import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Settings, Menu, X } from "lucide-react";
import { StarIcon } from "./icons/StarIcon";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/calendar", label: "Calendar" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: "rgba(10, 14, 39, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text-primary)",
            }}
          >
            <StarIcon size={18} />
            <span>CP Calendar</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative py-1 transition-colors duration-200"
                style={{
                  color: isActive(link.path)
                    ? "var(--amber-gold)"
                    : "var(--text-secondary)",
                  borderBottom: isActive(link.path)
                    ? "2px solid var(--amber-gold)"
                    : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              to="/settings"
              className="p-2 rounded-lg transition-all duration-300 hover:rotate-90"
              style={{ color: "var(--text-secondary)" }}
            >
              <Settings size={20} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text-secondary)" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          style={{
            background: "rgba(5, 7, 20, 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isActive(link.path)
                  ? "var(--amber-gold)"
                  : "var(--text-primary)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-semibold transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text-primary)",
            }}
          >
            Settings
          </Link>
        </div>
      )}
    </>
  );
}
