import { useState } from "react";

import {
  Code2,
  Folder,
  Plus,
  ChevronDown,
  Play,
  Download,
  Search,
  Settings,
  FileCode2,
  MoreHorizontal,
  Eye,
  PanelLeft,
  Check,
  Palette,
} from "lucide-react";

const themes = [
  { id: "midnight", name: "Midnight Dark", color: "#0c0e12" },
  { id: "github", name: "GitHub Dark", color: "#0d1117" },
  { id: "light", name: "Light Pro", color: "#f5f6f8" },
  { id: "purple", name: "Midnight Purple", color: "#110e1b" },
];

function App() {
  const [theme, setTheme] = useState("midnight");
  const [showThemes, setShowThemes] = useState(false);

  return (
    <div className={`app theme-${theme}`}>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="brand">
            <Code2 size={21} />
            <span>CodeSpace</span>
          </div>

          <div className="breadcrumb">
            <span>My Projects</span>
            <span>/</span>
            <strong>Untitled Project</strong>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="header-right">
          <span className="saved-status">
            <Check size={13} />
            All changes saved
          </span>

          <button className="icon-button">
            <Download size={17} />
          </button>

          {/* Theme Switcher */}
          <div className="theme-selector">
            <button
              className="icon-button theme-trigger"
              onClick={() => setShowThemes(!showThemes)}
              title="Change theme"
            >
              <Palette size={17} />
            </button>

            {showThemes && (
              <div className="theme-dropdown">
                <p className="dropdown-heading">Choose Theme</p>

                {themes.map((item) => (
                  <button
                    key={item.id}
                    className={`theme-option ${
                      theme === item.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setTheme(item.id);
                      setShowThemes(false);
                    }}
                  >
                    <span
                      className="theme-dot"
                      style={{ background: item.color }}
                    />

                    {item.name}

                    {theme === item.id && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="run-button">
            <Play size={14} fill="currentColor" />
            Run
          </button>

          <div className="avatar">OM</div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <button className="new-project">
              <Plus size={15} />
              New Project
            </button>
          </div>

          <div className="sidebar-section">
            <p className="section-heading">WORKSPACE</p>

            <button className="sidebar-item active">
              <Folder size={16} />
              My Projects
            </button>

            <button className="sidebar-item">
              <Search size={16} />
              Explore
            </button>
          </div>

          <div className="sidebar-section recent-section">
            <div className="section-title">
              <p className="section-heading">RECENT PROJECTS</p>
              <Plus size={15} />
            </div>

            <button className="sidebar-item">
              <FileCode2 size={16} />
              Portfolio Website
            </button>

            <button className="sidebar-item">
              <FileCode2 size={16} />
              React Dashboard
            </button>

            <button className="sidebar-item">
              <FileCode2 size={16} />
              Landing Page
            </button>
          </div>

          <div className="sidebar-bottom">
            <button className="sidebar-item">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </aside>

        {/* Workspace */}
        <main className="workspace">
          {/* Toolbar */}
          <div className="workspace-toolbar">
            <div className="workspace-title">
              <PanelLeft size={17} />
              <strong>Untitled Project</strong>
              <span className="framework-badge">React</span>
            </div>

            <button className="icon-button">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Editor + Preview */}
          <div className="workspace-content">
            {/* Editor */}
            <section className="panel editor-panel">
              <div className="panel-header">
                <div className="file-tab">
                  <FileCode2 size={15} />
                  <span>App.jsx</span>
                  <span className="close-tab">×</span>
                </div>

                <MoreHorizontal size={17} />
              </div>

              <div className="editor-content">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span>
                    <span className="code-purple">function</span>{" "}
                    <span className="code-yellow">App</span>() {"{"}
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">2</span>
                  <span className="indent-1">
                    <span className="code-purple">return</span> (
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">3</span>
                  <span className="indent-2">
                    {"<"}
                    <span className="code-red">div</span>
                    {">"}
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">4</span>
                  <span className="indent-3">
                    {"<"}
                    <span className="code-red">h1</span>
                    {">"}
                    <span className="code-green">Hello, CodeSpace!</span>
                    {"</"}
                    <span className="code-red">h1</span>
                    {">"}
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">5</span>
                  <span className="indent-2">
                    {"</"}
                    <span className="code-red">div</span>
                    {">"}
                  </span>
                </div>

                <div className="code-line">
                  <span className="line-number">6</span>
                  <span className="indent-1">);</span>
                </div>

                <div className="code-line">
                  <span className="line-number">7</span>
                  <span>{"}"}</span>
                </div>

                <div className="code-line code-last">
                  <span className="line-number">8</span>
                  <span>
                    <span className="code-purple">export default</span>{" "}
                    <span className="code-yellow">App</span>;
                  </span>
                </div>
              </div>

              <div className="panel-footer">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
                <span className="footer-right">JavaScript JSX</span>
              </div>
            </section>

            {/* Preview */}
            <section className="panel preview-panel">
              <div className="panel-header">
                <div className="preview-title">
                  <Eye size={15} />
                  <span>Preview</span>
                </div>

                <div className="preview-url">
                  localhost:3000
                  <MoreHorizontal size={17} />
                </div>
              </div>

              <div className="preview-content">
                <div className="preview-canvas">
                  <div className="preview-message">
                    <h1>Hello, CodeSpace!</h1>
                    <p>Your preview will appear here.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Status Bar */}
          <footer className="status-bar">
            <div>
              <span className="ready-dot" />
              Ready
              <span className="status-extra">CodeSpace Workspace</span>
            </div>

            <div>
              <span>UTF-8</span>
              <span>React</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
