import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Code2,
  ChevronDown,
  Download,
  Palette,
  Check,
  Play,
} from "lucide-react";

import { themes } from "../../data/themes";

function Header({ theme, setTheme }) {
  const [showThemes, setShowThemes] = useState(false);

  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-(--border) bg-(--sidebar) px-5">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <Code2 size={22} />

          <span className="text-[17px] font-semibold tracking-tight">
            CodeSpace
          </span>
        </Link>

        {/* Breadcrumb */}
        <div className="hidden items-center gap-3 text-sm text-(--muted) sm:flex">
          <Link to="/" className="transition hover:text-(--text)">
            My Projects
          </Link>

          <span>/</span>

          <span className="font-medium text-(--text)">Untitled Project</span>

          <ChevronDown size={15} />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Save Status */}
        <div className="hidden items-center gap-1.5 text-xs text-(--muted) md:flex">
          <Check size={14} />
          All changes saved
        </div>

        {/* Download */}
        <button className="rounded-md p-2 text-(--muted) transition hover:bg-(--hover) hover:text-(--text)">
          <Download size={17} />
        </button>

        {/* Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setShowThemes(!showThemes)}
            className="rounded-md p-2 text-(--muted) transition hover:bg-(--hover) hover:text-(--text)"
            title="Change Theme"
          >
            <Palette size={18} />
          </button>

          {showThemes && (
            <div className="absolute right-0 top-11 z-50 w-52 rounded-lg border border-(--border) bg-(--surface) p-2 shadow-2xl">
              <p className="px-2 py-2 text-[10px] font-semibold tracking-wider text-(--muted)">
                SELECT THEME
              </p>

              {Object.entries(themes).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setShowThemes(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${
                    theme === key
                      ? "bg-(--active) text-(--text)"
                      : "text-(--muted) hover:bg-(--hover) hover:text-(--text)"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-(--border)"
                    style={{ background: item.vars["--bg"] }}
                  />

                  {item.name}

                  {theme === key && <Check size={14} className="ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Run */}
        <button className="flex items-center gap-2 rounded-md bg-(--accent) px-3.5 py-2 text-xs font-semibold text-(--accent-text) transition hover:opacity-85">
          <Play size={13} fill="currentColor" />
          Run
        </button>

        {/* Profile */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--active) text-xs font-semibold">
          OM
        </div>
      </div>
    </header>
  );
}

export default Header;
