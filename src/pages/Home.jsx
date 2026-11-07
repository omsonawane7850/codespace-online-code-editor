import { Link } from "react-router-dom";

import { Code2, Plus, FolderCode, ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-[#0c0e12] text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Code2 size={24} />

          <span className="text-lg font-semibold tracking-tight">
            CodeSpace
          </span>
        </Link>

        <Link
          to="/editor"
          className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          <Plus size={16} />
          New Project
        </Link>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div>
          <p className="text-sm text-gray-400">WORKSPACE</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome to CodeSpace
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Your browser-based coding playground.
          </p>
        </div>

        {/* Projects */}
        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Projects</h2>

            <span className="text-xs text-gray-500">0 Projects</span>
          </div>

          <Link
            to="/editor"
            className="group flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/2 transition hover:border-white/40 hover:bg-white/4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <FolderCode size={24} className="text-gray-300" />
            </div>

            <h3 className="mt-4 text-sm font-semibold">
              Create your first project
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              Start coding directly in your browser.
            </p>

            <span className="mt-5 flex items-center gap-2 text-xs font-medium text-white">
              Get Started
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Home;
