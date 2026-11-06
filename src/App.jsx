import { useState } from "react";

import {
  Code2,
  Folder,
  Plus,
  ChevronDown,
  Play,
  Download,
  Search,
  Settings,
  FileCode2,
  MoreHorizontal,
  Eye,
  PanelLeft,
  Check,
  Palette,
} from "lucide-react";

// Theme Configuration
const themes = {
  midnight: {
    name: "Midnight Dark",
    vars: {
      "--bg": "#0c0e12",
      "--sidebar": "#0c0e12",
      "--panel": "#0c0e12",
      "--surface": "#15171d",
      "--hover": "#191c23",
      "--active": "#1d212a",
      "--border": "#22252c",
      "--text": "#e5e7eb",
      "--muted": "#9298a5",
      "--subtle": "#555b68",
      "--accent": "#ffffff",
      "--accent-text": "#000000",
      "--canvas": "#ffffff",
      "--canvas-text": "#111827",
      "--purple": "#c792ea",
      "--yellow": "#ffcb6b",
      "--red": "#f07178",
      "--green": "#c3e88d",
    },
  },

  github: {
    name: "GitHub Dark",
    vars: {
      "--bg": "#0d1117",
      "--sidebar": "#0d1117",
      "--panel": "#0d1117",
      "--surface": "#161b22",
      "--hover": "#21262d",
      "--active": "#21262d",
      "--border": "#30363d",
      "--text": "#e6edf3",
      "--muted": "#9198a1",
      "--subtle": "#6e7681",
      "--accent": "#238636",
      "--accent-text": "#ffffff",
      "--canvas": "#ffffff",
      "--canvas-text": "#111827",
      "--purple": "#d2a8ff",
      "--yellow": "#e3b341",
      "--red": "#ff7b72",
      "--green": "#7ee787",
    },
  },

  light: {
    name: "Light Pro",
    vars: {
      "--bg": "#f1f3f6",
      "--sidebar": "#f8f9fb",
      "--panel": "#fafbfc",
      "--surface": "#eef1f5",
      "--hover": "#e9edf2",
      "--active": "#e4eaf2",
      "--border": "#dce1e8",
      "--text": "#20242b",
      "--muted": "#596579",
      "--subtle": "#8490a2",
      "--accent": "#20242b",
      "--accent-text": "#ffffff",
      "--canvas": "#ffffff",
      "--canvas-text": "#111827",
      "--purple": "#7c3aed",
      "--yellow": "#a16207",
      "--red": "#dc2626",
      "--green": "#15803d",
    },
  },

  purple: {
    name: "Midnight Purple",
    vars: {
      "--bg": "#110e1b",
      "--sidebar": "#110e1b",
      "--panel": "#110e1b",
      "--surface": "#1b1628",
      "--hover": "#241d35",
      "--active": "#2b2240",
      "--border": "#302741",
      "--text": "#f0ebfa",
      "--muted": "#a49ab9",
      "--subtle": "#756987",
      "--accent": "#a78bfa",
      "--accent-text": "#160e25",
      "--canvas": "#ffffff",
      "--canvas-text": "#111827",
      "--purple": "#c4a7ff",
      "--yellow": "#fbbf70",
      "--red": "#ff8fa3",
      "--green": "#a3e6a3",
    },
  },
};

const sidebarItems = [
  { label: "My Projects", icon: Folder, active: true },
  { label: "Explore", icon: Search },
];

const recentProjects = ["Portfolio Website", "React Dashboard", "Landing Page"];

function App() {
  const [theme, setTheme] = useState("midnight");
  const [showThemes, setShowThemes] = useState(false);

  const currentTheme = themes[theme];

  return (
    <div
      style={currentTheme.vars}
      className="flex h-screen min-h-[500px] flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]"
    >
      {/* Header */}
      <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--sidebar)] px-5">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Code2 size={22} />
            <span className="text-[17px] font-semibold tracking-tight">
              CodeSpace
            </span>
          </div>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-3 text-sm text-[var(--muted)] sm:flex">
            <span>My Projects</span>
            <span>/</span>

            <span className="font-medium text-[var(--text)]">
              Untitled Project
            </span>

            <ChevronDown size={15} />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-1.5 text-xs text-[var(--muted)] md:flex">
            <Check size={14} />
            All changes saved
          </div>

          <button className="rounded-md p-2 text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text)]">
            <Download size={17} />
          </button>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="rounded-md p-2 text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text)]"
              title="Change Theme"
            >
              <Palette size={18} />
            </button>

            {showThemes && (
              <div className="absolute right-0 top-11 z-50 w-52 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl">
                <p className="px-2 py-2 text-[10px] font-semibold tracking-wider text-[var(--muted)]">
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
                        ? "bg-[var(--active)] text-[var(--text)]"
                        : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-[var(--border)]"
                      style={{ background: item.vars["--bg"] }}
                    />

                    {item.name}

                    {theme === key && <Check size={14} className="ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 rounded-md bg-[var(--accent)] px-3.5 py-2 text-xs font-semibold text-[var(--accent-text)] transition hover:opacity-85">
            <Play size={13} fill="currentColor" />
            Run
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--active)] text-xs font-semibold">
            OM
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-[230px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] md:flex">
          <div className="p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] py-2.5 text-xs transition hover:bg-[var(--hover)]">
              <Plus size={16} />
              New Project
            </button>
          </div>

          {/* Navigation */}
          <div className="px-3">
            <p className="mb-3 px-2 text-[10px] font-semibold tracking-wider text-[var(--subtle)]">
              WORKSPACE
            </p>

            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${
                    item.active
                      ? "bg-[var(--active)] text-[var(--text)]"
                      : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Recent Projects */}
          <div className="mt-8 px-3">
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[10px] font-semibold tracking-wider text-[var(--subtle)]">
                RECENT PROJECTS
              </p>

              <Plus size={15} className="text-[var(--muted)]" />
            </div>

            {recentProjects.map((project) => (
              <button
                key={project}
                className="mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text)]"
              >
                <FileCode2 size={16} />
                {project}
              </button>
            ))}
          </div>

          {/* Settings */}
          <div className="mt-auto border-t border-[var(--border)] p-3">
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text)]">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Workspace Toolbar */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
            <div className="flex items-center gap-3">
              <button className="text-[var(--muted)] transition hover:text-[var(--text)]">
                <PanelLeft size={17} />
              </button>

              <span className="text-sm font-medium">Untitled Project</span>

              <span className="rounded border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--muted)]">
                React
              </span>
            </div>

            <button className="text-[var(--muted)] hover:text-[var(--text)]">
              <MoreHorizontal size={19} />
            </button>
          </div>

          {/* Editor + Preview */}
          <div className="flex min-h-0 flex-1 flex-col gap-px overflow-auto bg-[var(--border)] lg:flex-row">
            {/* Code Editor */}
            <section className="flex min-h-[350px] min-w-0 flex-1 flex-col bg-[var(--panel)] lg:min-h-0">
              {/* Editor Header */}
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                <div className="flex items-center gap-2 text-xs">
                  <FileCode2 size={15} />
                  App.jsx
                  <span className="ml-1 text-[var(--muted)]">×</span>
                </div>

                <MoreHorizontal size={18} className="text-[var(--muted)]" />
              </div>

              {/* Code */}
              <div className="flex-1 overflow-auto bg-[var(--panel)] p-5 font-mono text-[13px] leading-[2]">
                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    1
                  </span>

                  <span>
                    <span className="text-[var(--purple)]">function</span>{" "}
                    <span className="text-[var(--yellow)]">App</span>() {"{"}
                  </span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    2
                  </span>

                  <span className="pl-5">
                    <span className="text-[var(--purple)]">return</span> (
                  </span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    3
                  </span>

                  <span className="pl-10">
                    {"<"}
                    <span className="text-[var(--red)]">div</span>
                    {">"}
                  </span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    4
                  </span>

                  <span className="pl-14">
                    {"<"}
                    <span className="text-[var(--red)]">h1</span>
                    {">"}
                    <span className="text-[var(--green)]">
                      Hello, CodeSpace!
                    </span>
                    {"</"}
                    <span className="text-[var(--red)]">h1</span>
                    {">"}
                  </span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    5
                  </span>

                  <span className="pl-10">
                    {"</"}
                    <span className="text-[var(--red)]">div</span>
                    {">"}
                  </span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    6
                  </span>

                  <span className="pl-5">);</span>
                </div>

                <div className="flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    7
                  </span>

                  <span>{"}"}</span>
                </div>

                <div className="mt-4 flex whitespace-pre">
                  <span className="w-10 shrink-0 pr-4 text-right text-[var(--subtle)]">
                    8
                  </span>

                  <span>
                    <span className="text-[var(--purple)]">export default</span>{" "}
                    <span className="text-[var(--yellow)]">App</span>;
                  </span>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="flex h-8 shrink-0 items-center justify-between border-t border-[var(--border)] px-4 text-[10px] text-[var(--muted)]">
                <div className="flex gap-4">
                  <span>Ln 1, Col 1</span>
                  <span>Spaces: 2</span>
                </div>

                <span>JavaScript JSX</span>
              </div>
            </section>

            {/* Preview */}
            <section className="flex min-h-[350px] min-w-0 flex-1 flex-col bg-[var(--panel)] lg:min-h-0">
              {/* Preview Header */}
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                <div className="flex items-center gap-2 text-xs">
                  <Eye size={16} />
                  Preview
                </div>

                <div className="flex items-center gap-3 text-[10px] text-[var(--muted)]">
                  localhost:3000
                  <MoreHorizontal size={18} />
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="flex-1 bg-[var(--surface)] p-4">
                <div className="flex h-full min-h-[250px] items-center justify-center rounded-md border border-black/5 bg-[var(--canvas)]">
                  <div className="text-center text-[var(--canvas-text)]">
                    <h1 className="text-3xl font-bold tracking-tight">
                      Hello, CodeSpace!
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      Your preview will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Status Bar */}
          <footer className="flex h-8 shrink-0 items-center justify-between border-t border-[var(--border)] bg-[var(--sidebar)] px-4 text-[10px] text-[var(--muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Ready
              </span>

              <span className="hidden sm:inline">CodeSpace Workspace</span>
            </div>

            <div className="flex gap-4">
              <span>UTF-8</span>
              <span>React</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
