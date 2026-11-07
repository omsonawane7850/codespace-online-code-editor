import { useState } from "react";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import WorkspaceToolbar from "./components/layout/WorkspaceToolbar";
import StatusBar from "./components/layout/StatusBar";

import EditorPanel from "./components/editor/EditorPanel";
import PreviewPanel from "./components/preview/PreviewPanel";

import { themes } from "./data/themes";

function App() {
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

          <div className="flex min-h-0 flex-1 flex-col gap-px overflow-auto bg-(--border) lg:flex-row">
            <EditorPanel />

            <PreviewPanel />
          </div>

          <StatusBar />
        </main>
      </div>
    </div>
  );
}

export default App;
