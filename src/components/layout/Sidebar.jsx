import { Link } from "react-router-dom";

import { Folder, Plus, Search, Settings, FileCode2 } from "lucide-react";

const recentProjects = ["Portfolio Website", "React Dashboard", "Landing Page"];

function Sidebar() {
  return (
    <aside className="hidden w-57.5 shrink-0 flex-col border-r border-(--border) bg-(--sidebar) md:flex">
      {/* New Project */}
      <div className="p-4">
        <Link
          to="/editor"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-(--border) bg-(--surface) py-2.5 text-xs transition hover:bg-(--hover)"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-3">
        <p className="mb-3 px-2 text-[10px] font-semibold tracking-wider text-(--subtle)">
          WORKSPACE
        </p>

        <Link
          to="/"
          className="mb-1 flex w-full items-center gap-3 rounded-md bg-(--active) px-3 py-2.5 text-left text-xs text-(--text) transition"
        >
          <Folder size={16} />
          My Projects
        </Link>

        <button className="mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-(--muted) transition hover:bg-(--hover) hover:text-(--text)">
          <Search size={16} />
          Explore
        </button>
      </div>

      {/* Recent Projects */}
      <div className="mt-8 px-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold tracking-wider text-(--subtle)">
            RECENT PROJECTS
          </p>

          <Plus size={15} className="text-(--muted)" />
        </div>

        {recentProjects.map((project) => (
          <button
            key={project}
            className="mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-(--muted) transition hover:bg-(--hover) hover:text-(--text)"
          >
            <FileCode2 size={16} />
            {project}
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="mt-auto border-t border-(--border) p-3">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-(--muted) transition hover:bg-(--hover) hover:text-(--text)">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
