import { createContext, useState } from "react";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [projectToEdit, setProjectToEdit] = useState(null);

  // Create Project
  const addProject = (name) => {
    const newProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);

    return newProject;
  };

  // Update Project
  const updateProject = (id, name) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, name: name.trim() } : project,
      ),
    );
  };

  // Delete Project
  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id),
    );
  };

  // Open Create Modal
  const openCreateProjectModal = () => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  };

  // Open Edit Modal
  const openEditProjectModal = (project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  // Close Modal
  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setProjectToEdit(null);
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    isProjectModalOpen,
    projectToEdit,
    openCreateProjectModal,
    openEditProjectModal,
    closeProjectModal,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
