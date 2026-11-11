import { NavLink } from "react-router-dom";

import { Folder, Plus, Search, Settings, FileCode2 } from "lucide-react";

import { useProjects } from "../../hooks/useProjects";

function Sidebar() {
  const { projects, openCreateProjectModal } = useProjects();

  // Latest 5 projects, newest first
  const recentProjects = [...projects].reverse().slice(0, 5);

  return (
    <aside className="hidden w-57.5 shrink-0 flex-col border-r border-(--border) bg-(--sidebar) md:flex">
      {/* New Project */}
      <div className="p-4">
        <button
          type="button"
          onClick={openCreateProjectModal}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-(--border) bg-(--surface) py-2.5 text-xs transition hover:bg-(--hover)"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Navigation */}
      <div className="px-3">
        <p className="mb-3 px-2 text-[10px] font-semibold tracking-wider text-(--subtle)">
          WORKSPACE
        </p>

        {/* NavLink: active highlight sirf "/" pe, editor mein nahi */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${
              isActive
                ? "bg-(--active) text-(--text)"
                : "text-(--muted) hover:bg-(--hover) hover:text-(--text)"
            }`
          }
        >
          <Folder size={16} />
          My Projects
        </NavLink>

        {/* Explore: feature abhi bana nahi, isliye disabled */}
        <button
          type="button"
          disabled
          title="Coming soon"
          className="mb-1 flex w-full cursor-not-allowed items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-(--subtle)"
        >
          <Search size={16} />
          Explore
          <span className="ml-auto rounded border border-(--border) px-1.5 py-0.5 text-[9px]">
            Soon
          </span>
        </button>
      </div>

      {/* Recent Projects */}
      <div className="mt-8 px-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold tracking-wider text-(--subtle)">
            RECENT PROJECTS
          </p>

          <span className="text-[10px] text-(--muted)">{projects.length}</span>
        </div>

        {recentProjects.map((project) => (
          <NavLink
            key={project.id}
            to={`/editor/${project.id}`}
            className={({ isActive }) =>
              `mb-1 flex w-full items-center gap-3 truncate rounded-md px-3 py-2.5 text-xs transition ${
                isActive
                  ? "bg-(--active) text-(--text)"
                  : "text-(--muted) hover:bg-(--hover) hover:text-(--text)"
              }`
            }
          >
            <FileCode2 size={16} className="shrink-0" />
            <span className="truncate">{project.name}</span>
          </NavLink>
        ))}

        {projects.length === 0 && (
          <p className="px-3 py-2 text-xs text-(--subtle)">
            No recent projects
          </p>
        )}
      </div>

      {/* Settings: abhi dead hai, disabled rakha */}
      <div className="mt-auto border-t border-(--border) p-3">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex w-full cursor-not-allowed items-center gap-3 rounded-md px-3 py-2.5 text-xs text-(--subtle)"
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
