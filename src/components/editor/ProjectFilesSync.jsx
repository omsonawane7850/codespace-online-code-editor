import { useEffect } from "react";

import { useSandpack } from "@codesandbox/sandpack-react";

import { useProjects } from "../../hooks/useProjects";

function ProjectFilesSync({ projectId }) {
  const { sandpack } = useSandpack();

  const { updateProjectFiles } = useProjects();

  // Create a stable snapshot of current Sandpack files
  const filesSnapshot = JSON.stringify(sandpack.files);

  useEffect(() => {
    if (!projectId) return;

    const files = JSON.parse(filesSnapshot);

    updateProjectFiles(projectId, files);
  }, [projectId, filesSnapshot, updateProjectFiles]);

  return null;
}

export default ProjectFilesSync;
