import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

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

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }

  return context;
}
