import { useEffect } from "react";

import { useSandpack } from "@codesandbox/sandpack-react";

import { useProjects } from "../../hooks/useProjects";
import { saveEditorState } from "../../utils/editorState";

function ProjectFilesSync({ projectId }) {
  const { sandpack } = useSandpack();

  const { updateProjectFiles } = useProjects();

  // Only real (non-hidden) files belong to the project
  const realFiles = Object.fromEntries(
    Object.entries(sandpack.files).filter(([, file]) => !file.hidden),
  );

  // Stable snapshots
  const filesSnapshot = JSON.stringify(realFiles);
  const visibleSnapshot = JSON.stringify(sandpack.visibleFiles);
  const { activeFile } = sandpack;

  // Sync files
  useEffect(() => {
    if (!projectId) return;

    updateProjectFiles(projectId, JSON.parse(filesSnapshot));
  }, [projectId, filesSnapshot, updateProjectFiles]);

  // Sync active file + open tabs
  useEffect(() => {
    saveEditorState(projectId, {
      activeFile,
      visibleFiles: JSON.parse(visibleSnapshot),
    });
  }, [projectId, activeFile, visibleSnapshot]);

  return null;
}

export default ProjectFilesSync;
