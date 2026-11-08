import { useParams } from "react-router-dom";

import { useProjects } from "./useProjects";

export function useCurrentProject() {
  const { projectId } = useParams();

  const { projects } = useProjects();

  const currentProject = projects.find((project) => project.id === projectId);

  return currentProject || null;
}
