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

import { useTheme } from "../hooks/useTheme";
import { useProjects } from "../hooks/useProjects";

// Main Editor Page
function EditorPage() {
  const { projectId } = useParams();

  const { projects } = useProjects();

  const { theme } = useTheme();

  // Find current project using URL ID
  const currentProject = projects.find((project) => project.id === projectId);

  // Invalid project ID
  if (projectId && !currentProject) {
    return <Navigate to="/" replace />;
  }

  const projectFiles = currentProject?.files || initialFiles;

  return (
    <EditorWorkspace
      key={projectId || "default"}
      projectId={projectId}
      projectFiles={projectFiles}
      theme={theme}
    />
  );
}

// Editor Workspace
function EditorWorkspace({ projectId, projectFiles, theme }) {
  // Keep initial files stable while this project is mounted
  const [files] = useState(projectFiles);

  return (
    <div
      style={themes[theme].vars}
      className="flex h-screen min-h-125 flex-col overflow-hidden bg-(--bg) text-(--text)"
    >
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <WorkspaceToolbar />

          <SandpackProvider
            template="react"
            files={files}
            theme={theme === "light" ? "light" : "dark"}
            options={{
              activeFile: "/App.js",
              autorun: true,
              recompileMode: "delayed",
              recompileDelay: 500,
            }}
          >
            <ProjectFilesSync projectId={projectId} />

            <SandpackLayout
              style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                width: "100%",
                border: "none",
                borderRadius: 0,
                gap: "1px",
                background: "var(--border)",
                overflow: "auto",
              }}
            >
              <FileExplorer />

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
