import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";

import { useProjects } from "../../hooks/useProjects";

function ProjectModal() {
  const navigate = useNavigate();

  const {
    addProject,
    updateProject,
    isProjectModalOpen,
    projectToEdit,
    closeProjectModal,
  } = useProjects();

  if (!isProjectModalOpen) return null;

  return (
    <ProjectModalContent
      key={projectToEdit?.id || "new-project"}
      project={projectToEdit}
      addProject={addProject}
      updateProject={updateProject}
      closeProjectModal={closeProjectModal}
      navigate={navigate}
    />
  );
}

function ProjectModalContent({
  project,
  addProject,
  updateProject,
  closeProjectModal,
  navigate,
}) {
  const [projectName, setProjectName] = useState(project?.name || "");

  const isEditing = Boolean(project);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = projectName.trim();

    if (!name) return;

    if (isEditing) {
      updateProject(project.id, name);
      closeProjectModal();
    } else {
      const newProject = addProject(name);

      closeProjectModal();

      navigate(`/editor/${newProject.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#151820] p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {isEditing ? "Rename Project" : "Create Project"}
          </h2>

          <button
            onClick={closeProjectModal}
            className="text-gray-400 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Project Name
          </label>

          <input
            type="text"
            autoFocus
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            maxLength={40}
            className="w-full rounded-md border border-white/10 bg-[#0c0e12] px-3 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/40"
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeProjectModal}
              className="rounded-md border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!projectName.trim()}
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
