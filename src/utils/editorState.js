const keyFor = (projectId) =>
  `codespace-editor-state:${projectId || "default"}`;

// Load last active file + open tabs, validated against the project's files
export function loadEditorState(projectId, files) {
  const paths = Object.keys(files);

  if (paths.length === 0) return { activeFile: undefined, visibleFiles: [] };

  let saved;

  try {
    saved = JSON.parse(localStorage.getItem(keyFor(projectId)));
  } catch {
    saved = null;
  }

  const visibleFiles = Array.isArray(saved?.visibleFiles)
    ? saved.visibleFiles.filter((path) => paths.includes(path))
    : [];

  let activeFile = saved?.activeFile;

  if (!paths.includes(activeFile)) {
    activeFile =
      visibleFiles[0] ??
      ["/App.js", "/App.jsx", "/src/App.jsx", "/src/App.js"].find((path) =>
        paths.includes(path),
      ) ??
      paths[0];
  }

  if (!visibleFiles.includes(activeFile)) {
    visibleFiles.push(activeFile);
  }

  return { activeFile, visibleFiles };
}

export function saveEditorState(projectId, state) {
  try {
    localStorage.setItem(keyFor(projectId), JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save editor state:", error);
  }
}

// Used after import so old tabs don't leak into the new file set
export function clearEditorState(projectId) {
  try {
    localStorage.removeItem(keyFor(projectId));
  } catch (error) {
    console.error("Failed to clear editor state:", error);
  }
}
