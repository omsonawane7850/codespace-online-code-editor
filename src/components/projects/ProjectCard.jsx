import { Link } from "react-router-dom";

import { FileCode2, Pencil, Trash2, ArrowUpRight } from "lucide-react";

import { useProjects } from "../../hooks/useProjects";

function ProjectCard({ project }) {
  const { openEditProjectModal, deleteProject } = useProjects();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (confirmDelete) {
      deleteProject(project.id);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/2 p-5 transition hover:border-white/20 hover:bg-white/4">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
          <FileCode2 size={21} className="text-gray-300" />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => openEditProjectModal(project)}
            title="Rename project"
            className="rounded-md p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            title="Delete project"
            className="rounded-md p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="mt-5 truncate text-sm font-semibold text-white">
        {project.name}
      </h3>

      <p className="mt-2 text-xs text-gray-500">
        Created {new Date(project.createdAt).toLocaleDateString()}
      </p>

      <Link
        to={`/editor/${project.id}`}
        className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-gray-300 transition hover:text-white"
      >
        Open Project
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}

export default ProjectCard;
