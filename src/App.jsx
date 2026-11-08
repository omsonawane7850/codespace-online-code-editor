import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";

import ProjectModal from "./components/projects/ProjectModal";

import { ProjectProvider } from "./context/ProjectContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ProjectProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/editor" element={<EditorPage />} />

          <Route path="/editor/:projectId" element={<EditorPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ProjectModal />
      </ThemeProvider>
    </ProjectProvider>
  );
}

export default App;
