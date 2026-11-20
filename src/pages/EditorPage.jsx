import { useState } from "react";

import { Navigate, useParams } from "react-router-dom";

import { SandpackProvider, SandpackLayout } from "@codesandbox/sandpack-react";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import StatusBar from "../components/layout/StatusBar";
import WorkspaceToolbar from "../components/layout/WorkspaceToolbar";

import FileExplorer from "../components/editor/FileExplorer";
import EditorPanel from "../components/editor/EditorPanel";
import ProjectFilesSync from "../components/editor/ProjectFilesSync";

import PreviewPanel from "../components/preview/PreviewPanel";

import initialFiles from "../data/initialFiles";

import { themes } from "../data/themes";

import { loadEditorState, clearEditorState } from "../utils/editorState";
import {
  detectEntry,
  usesTailwind,
  hideTemplateLeftovers,
  stripTemplateLeftovers,
} from "../utils/projectKind";

import { useTheme } from "../hooks/useTheme";
import { useProjects } from "../hooks/useProjects";

// Files that Sandpack's "react" template injects on its own.
// Any of these that the project does not really own gets hidden.
const TEMPLATE_PATHS = [
  "/App.js",
  "/index.js",
  "/styles.css",
  "/public/index.html",
];

// Main Editor Page
function EditorPage() {
  const { projectId } = useParams();

  const { projects, updateProjectFiles } = useProjects();

  const { theme } = useTheme();

  // Bumped after import so the workspace remounts with the new files
  const [reloadCount, setReloadCount] = useState(0);

  // Find current project using URL ID
  const currentProject = projects.find((project) => project.id === projectId);

  // Invalid project ID
  if (projectId && !currentProject) {
    return <Navigate to="/" replace />;
  }

  const projectFiles = currentProject?.files || initialFiles;

  // Folder / ZIP ("replace") removes every old file, including starter code.
  // Returns a message string if nothing was imported, or nothing on success.
  function handleImport(newFiles, mode) {
    if (!currentProject) {
      return "Open a project first (create one from the sidebar)";
    }

    if (mode === "replace") {
      const confirmed = window.confirm(
        "Importing will delete all current files in this project and replace them with the imported ones. Continue?",
      );

      if (!confirmed) return "Import cancelled";
    }

    // Drop hidden placeholder files from the old project before merging
    const visibleOldFiles = Object.fromEntries(
      Object.entries(currentProject.files).filter(([, file]) => !file.hidden),
    );

    const nextFiles =
      mode === "replace"
        ? stripTemplateLeftovers(newFiles)
        : stripTemplateLeftovers({ ...visibleOldFiles, ...newFiles });

    updateProjectFiles(currentProject.id, nextFiles);

    clearEditorState(currentProject.id);

    setReloadCount((count) => count + 1);
  }

  return (
    <EditorWorkspace
      key={`${projectId || "default"}-${reloadCount}`}
      projectId={projectId}
      projectFiles={projectFiles}
      theme={theme}
      onImport={handleImport}
    />
  );
}

// Editor Workspace
function EditorWorkspace({ projectId, projectFiles, theme, onImport }) {
  // Project files with old starter-template leftovers removed
  const [cleanFiles] = useState(() =>
    stripTemplateLeftovers(
      Object.fromEntries(
        Object.entries(projectFiles).filter(([, file]) => !file.hidden),
      ),
    ),
  );

  // Real entry file of this project (src/main.jsx, index.js, ...)
  const [entry] = useState(() => detectEntry(cleanFiles));

  // Project files + hidden overrides so template files never show or run
  const [files] = useState(() => {
    const base = hideTemplateLeftovers(cleanFiles, entry);

    const extraHidden = {};

    for (const path of TEMPLATE_PATHS) {
      if (!cleanFiles[path] && path !== entry) {
        extraHidden[path] = { code: "", hidden: true };
      }
    }

    return { ...base, ...extraHidden };
  });

  // Restore last active file + open tabs, minus anything hidden
  const [editorState] = useState(() => {
    const saved = loadEditorState(projectId, cleanFiles);

    const isVisible = (path) => files[path] && !files[path].hidden;

    const visibleFiles = (saved.visibleFiles || []).filter(isVisible);

    const activeFile = isVisible(saved.activeFile)
      ? saved.activeFile
      : visibleFiles[0] || Object.keys(files).find(isVisible);

    return { activeFile, visibleFiles };
  });

  // Tailwind in preview (Vite plugin doesn't run here, so use the browser build)
  const [tailwind] = useState(() => usesTailwind(cleanFiles));

  return (
    <div
      style={themes[theme].vars}
      className="flex h-screen flex-col overflow-hidden bg-(--bg) text-(--text)"
    >
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <WorkspaceToolbar />

          <SandpackProvider
            template="react"
            files={files}
            theme={theme === "light" ? "light" : "dark"}
            customSetup={{ entry }}
            // Wrapper div of Sandpack must be a flex child, otherwise layout overflows the page
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              width: "100%",
              height: "auto",
            }}
            options={{
              activeFile: editorState.activeFile,
              visibleFiles: editorState.visibleFiles,
              externalResources: tailwind
                ? ["https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"]
                : [],
              autorun: true,
              recompileMode: "delayed",
              recompileDelay: 500,
            }}
          >
            <ProjectFilesSync projectId={projectId} />

            <SandpackLayout
              style={{
                display: "flex",
                flexWrap: "nowrap",
                flex: 1,
                minHeight: 0,
                width: "100%",
                border: "none",
                borderRadius: 0,
                gap: "1px",
                background: "var(--border)",
                overflowX: "auto",
                overflowY: "hidden",
              }}
            >
              <FileExplorer onImport={onImport} />

              <EditorPanel />

              <PreviewPanel />
            </SandpackLayout>
          </SandpackProvider>

          <StatusBar />
        </main>
      </div>
    </div>
  );
}

export default EditorPage;
