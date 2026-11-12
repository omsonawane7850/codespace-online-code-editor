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
} from "../utils/projectKind";

import { useTheme } from "../hooks/useTheme";
import { useProjects } from "../hooks/useProjects";

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

  // Import writes straight to project state, then remounts the workspace.
  // Returns an error message string, or nothing on success.
  function handleImport(newFiles, mode) {
    if (!currentProject) {
      return "Open a project first (create one from the sidebar)";
    }

    const nextFiles =
      mode === "replace" ? newFiles : { ...currentProject.files, ...newFiles };

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
  // Real entry file of this project (src/main.jsx, index.js, ...)
  const [entry] = useState(() => detectEntry(projectFiles));

  // Project files + hidden overrides for template leftovers
  const [files] = useState(() =>
    hideTemplateLeftovers(projectFiles, detectEntry(projectFiles)),
  );

  // Restore last active file + open tabs (only once on mount)
  const [editorState] = useState(() =>
    loadEditorState(projectId, projectFiles),
  );

  // Tailwind in preview (Vite plugin doesn't run here, so use the browser build)
  const [tailwind] = useState(() => usesTailwind(projectFiles));

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
