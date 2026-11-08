import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";

import { ProjectProvider } from "./context/ProjectContext";

function App() {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/editor" element={<EditorPage />} />

        <Route path="/editor/:projectId" element={<EditorPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProjectProvider>
  );
}

export default App;
