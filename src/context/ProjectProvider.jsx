import { useCallback, useMemo, useState } from "react";
import { ProjectContext } from "./ProjectContext";

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const addProject = useCallback((name) => {
    const newProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, name) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)),
    );
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const openCreateProjectModal = useCallback(() => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  }, []);

  const openEditProjectModal = useCallback((project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  }, []);

  const closeProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setProjectToEdit(null);
  }, []);

  const value = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
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
