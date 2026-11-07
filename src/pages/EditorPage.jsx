import { useState } from "react";

import { SandpackProvider, SandpackLayout } from "@codesandbox/sandpack-react";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import StatusBar from "../components/layout/StatusBar";
import WorkspaceToolbar from "../components/layout/WorkspaceToolbar";

import FileExplorer from "../components/editor/FileExplorer";
import EditorPanel from "../components/editor/EditorPanel";
import PreviewPanel from "../components/preview/PreviewPanel";

import initialFiles from "../data/initialFiles";
import { themes } from "../data/themes";

function EditorPage() {
  const [theme, setTheme] = useState("midnight");

  return (
    <div
      style={themes[theme].vars}
      className="flex h-screen min-h-125 flex-col overflow-hidden bg-(--bg) text-(--text)"
    >
      <Header theme={theme} setTheme={setTheme} />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <WorkspaceToolbar />

          <SandpackProvider
            template="react"
            files={initialFiles}
            theme={theme === "light" ? "light" : "dark"}
            options={{
              activeFile: "/App.js",
              autorun: true,
              recompileMode: "delayed",
              recompileDelay: 500,
            }}
          >
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
