import { useCallback, useEffect, useMemo, useState } from "react";

import { ProjectContext } from "./ProjectContext";

import initialFiles from "../data/initialFiles";

const STORAGE_KEY = "codespace-projects";

// Create a separate copy of files for every project
function cloneFiles(files) {
  return Object.fromEntries(
    Object.entries(files).map(([path, file]) => [path, { ...file }]),
  );
}

// Load projects from LocalStorage
function getStoredProjects() {
  try {
    const savedProjects = localStorage.getItem(STORAGE_KEY);

    if (!savedProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(savedProjects);

    if (!Array.isArray(parsedProjects)) {
      return [];
    }

    return parsedProjects
      .filter(
        (project) =>
          project &&
          typeof project.id === "string" &&
          typeof project.name === "string",
      )
      .map((project) => ({
        ...project,
        files:
          project.files &&
          typeof project.files === "object" &&
          !Array.isArray(project.files)
            ? project.files
            : cloneFiles(initialFiles),
      }));
  } catch (error) {
    console.error("Failed to load projects:", error);

    return [];
  }
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(getStoredProjects);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [projectToEdit, setProjectToEdit] = useState(null);

  // Save projects to LocalStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Failed to save projects:", error);
    }
  }, [projects]);

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
