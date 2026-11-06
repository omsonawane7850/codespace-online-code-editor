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
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e5e7eb] flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-[#22252c] flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <Code2 size={21} className="text-white" />
            <span className="text-[17px] font-semibold tracking-tight">
              CodeSpace
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <span>My Projects</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-200">Untitled Project</span>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500">
            <Check size={13} />
            All changes saved
          </div>

          <button className="p-2 text-gray-400 hover:text-white transition">
            <Download size={17} />
          </button>

          <button className="flex items-center gap-2 bg-white text-black px-3.5 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition">
            <Play size={14} fill="currentColor" />
            Run
          </button>

          <div className="w-7 h-7 rounded-full bg-[#292d36] flex items-center justify-center text-xs font-medium">
            OM
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[230px] border-r border-[#22252c] flex-col shrink-0">
          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 bg-[#191c23] border border-[#30343d] hover:bg-[#222630] rounded-md py-2 text-sm transition">
              <Plus size={15} />
              New Project
            </button>
          </div>

          <div className="px-3">
            <p className="px-2 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Workspace
            </p>

            <button className="sidebar-item active">
              <Folder size={16} />
              My Projects
            </button>

            <button className="sidebar-item">
              <Search size={16} />
              Explore
            </button>
          </div>

          <div className="mt-8 px-3">
            <div className="flex items-center justify-between px-2 mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Recent Projects
              </p>

              <button className="text-gray-500 hover:text-white">
                <Plus size={15} />
              </button>
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

          <div className="mt-auto p-3 border-t border-[#22252c]">
            <button className="sidebar-item">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Workspace Toolbar */}
          <div className="h-12 border-b border-[#22252c] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <button className="text-gray-500 hover:text-white">
                <PanelLeft size={17} />
              </button>

              <span className="text-sm font-medium">Untitled Project</span>

              <span className="text-[11px] bg-[#191c23] border border-[#30343d] px-2 py-0.5 rounded text-gray-400">
                React
              </span>
            </div>

            <button className="text-gray-500 hover:text-white">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Editor and Preview */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-px bg-[#22252c]">
            {/* Editor Panel */}
            <section className="flex-1 min-w-0 min-h-[400px] bg-[#0c0e12] flex flex-col">
              {/* Editor Header */}
              <div className="h-11 border-b border-[#22252c] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2 text-sm">
                  <FileCode2 size={15} className="text-gray-400" />
                  <span>App.jsx</span>
                  <span className="text-gray-600 text-xs">×</span>
                </div>

                <button className="text-gray-500 hover:text-white">
                  <MoreHorizontal size={17} />
                </button>
              </div>

              {/* Editor Content */}
              <div className="flex-1 p-5 overflow-auto">
                <div className="editor-code">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span>
                      <span className="code-purple">function</span>{" "}
                      <span className="code-yellow">App</span>() {"{"}
                    </span>
                  </div>

                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="pl-5">
                      <span className="code-purple">return</span> (
                    </span>
                  </div>

                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span className="pl-10">
                      {"<"}
                      <span className="code-red">div</span>
                      {">"}
                    </span>
                  </div>

                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span className="pl-14">
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
                    <span className="pl-10">
                      {"</"}
                      <span className="code-red">div</span>
                      {">"}
                    </span>
                  </div>

                  <div className="code-line">
                    <span className="line-number">6</span>
                    <span className="pl-5">);</span>
                  </div>

                  <div className="code-line">
                    <span className="line-number">7</span>
                    <span>{"}"}</span>
                  </div>

                  <div className="code-line mt-4">
                    <span className="line-number">8</span>
                    <span>
                      <span className="code-purple">export default</span>{" "}
                      <span className="code-yellow">App</span>;
                    </span>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="h-8 border-t border-[#22252c] flex items-center justify-between px-4 text-[11px] text-gray-500 shrink-0">
                <div className="flex gap-4">
                  <span>Ln 1, Col 1</span>
                  <span>Spaces: 2</span>
                </div>
                <span>JavaScript JSX</span>
              </div>
            </section>

            {/* Preview Panel */}
            <section className="flex-1 min-w-0 min-h-[400px] bg-[#0c0e12] flex flex-col">
              {/* Preview Header */}
              <div className="h-11 border-b border-[#22252c] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2 text-sm">
                  <Eye size={15} className="text-gray-400" />
                  <span>Preview</span>
                </div>

                <div className="flex items-center gap-3 text-gray-500">
                  <span className="text-xs">localhost:3000</span>
                  <MoreHorizontal size={17} />
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="flex-1 p-4 bg-[#15171d]">
                <div className="h-full min-h-[300px] bg-white rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                      Hello, CodeSpace!
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                      Your preview will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Status Bar */}
          <footer className="h-8 border-t border-[#22252c] px-4 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Ready
              </span>

              <span className="hidden sm:inline">CodeSpace Workspace</span>
            </div>

            <div className="flex items-center gap-3">
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
