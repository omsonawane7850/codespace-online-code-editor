import { useCallback, useMemo, useState } from "react";

import { ProjectContext } from "./ProjectContext";

import initialFiles from "../data/initialFiles";

// Create a separate copy of files for every project
function cloneFiles(files) {
  return Object.fromEntries(
    Object.entries(files).map(([path, file]) => [path, { ...file }]),
  );
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [projectToEdit, setProjectToEdit] = useState(null);

  // Create Project
  const addProject = useCallback((name) => {
    const newProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      files: cloneFiles(initialFiles),
    };

    setProjects((prev) => [...prev, newProject]);

    return newProject;
  }, []);

  // Rename Project
  const updateProject = useCallback((id, name) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name: name.trim() } : project,
      ),
    );
  }, []);

  // Update Project Files
  const updateProjectFiles = useCallback((id, files) => {
    const nextFiles = cloneFiles(files);

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== id) {
          return project;
        }

        // Avoid unnecessary state updates
        if (JSON.stringify(project.files) === JSON.stringify(nextFiles)) {
          return project;
        }

        return {
          ...project,
          files: nextFiles,
        };
      }),
    );
  }, []);

  // Delete Project
  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  // Open Create Modal
  const openCreateProjectModal = useCallback(() => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  }, []);

  // Open Edit Modal
  const openEditProjectModal = useCallback((project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  }, []);

  // Close Modal
  const closeProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setProjectToEdit(null);
  }, []);

  const value = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
      updateProjectFiles,
      deleteProject,
      isProjectModalOpen,
      projectToEdit,
      openCreateProjectModal,
      openEditProjectModal,
      closeProjectModal,
    }),
    [
      projects,
      addProject,
      updateProject,
      updateProjectFiles,
      deleteProject,
      isProjectModalOpen,
      projectToEdit,
      openCreateProjectModal,
      openEditProjectModal,
      closeProjectModal,
    ],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
