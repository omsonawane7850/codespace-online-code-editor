# CodeSpace

A browser-based code editor with live preview. Create React projects, edit them in a multi-file editor, and see the result instantly, with no backend and no setup. Everything is stored in your browser.

Built with React, Vite, Tailwind CSS and [Sandpack](https://sandpack.codesandbox.io/).

## Features

- **Project management:** create, rename and delete projects from the dashboard. Each project keeps its own files.
- **Live preview:** code runs in a Sandpack sandbox and re-compiles automatically (500 ms debounce).
- **Multi-file editor:** line numbers, closable file tabs, and a custom file explorer with collapsible folders.
- **Import existing code:**
  - **Files:** adds files to the current project.
  - **Folder:** replaces the project with the selected folder (root folder name is dropped).
  - **ZIP:** replaces the project with the contents of a `.zip` archive.
  - A confirmation prompt appears before anything is replaced. `node_modules`, `.git`, `dist`, `build` and `.next` are ignored.
- **Dependency manager:** add npm packages (`package` or `package@1.2.3`) to the project from the explorer panel.
- **Themes:** Midnight Dark, GitHub Dark, Light Pro and Midnight Purple, driven by CSS variables.
- **Auto-save:** projects are saved to `localStorage` as you type.
- **Tailwind support in preview:** projects that use Tailwind are detected and run with the Tailwind browser build.

## Tech Stack

| Area               | Tool                          |
| ------------------ | ----------------------------- |
| UI                 | React                         |
| Build tool         | Vite                          |
| Styling            | Tailwind CSS (v4)             |
| Routing            | React Router                  |
| Editor and preview | `@codesandbox/sandpack-react` |
| ZIP import         | JSZip                         |
| Icons              | lucide-react                  |

## Getting Started

### Prerequisites

- Node.js (a current LTS version) and npm

### Installation

```bash
git clone https://github.com/<your-username>/codespace-online-code-editor.git
cd codespace-online-code-editor
npm install
npm run dev
```

Open the local URL that Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Usage

1. Click **New Project** on the dashboard or in the sidebar and give it a name.
2. Edit files in the code editor. The preview updates on its own.
3. Use the icons in the **Explorer** header to import files, a folder, or a ZIP.
4. Add packages in the **Dependencies** panel below the file tree.
5. Switch themes with the palette icon in the header.

## Project Structure

```
src/
├── components/
│   ├── editor/      # FileExplorer, EditorPanel, DependencyManager, ProjectFilesSync
│   ├── layout/      # Header, Sidebar, StatusBar, WorkspaceToolbar
│   ├── preview/     # PreviewPanel
│   └── projects/    # ProjectCard, ProjectModal
├── context/         # ProjectContext/Provider, ThemeContext/Provider
├── data/            # initialFiles (starter template), themes
├── hooks/           # useProjects, useTheme, useCurrentProject
├── pages/           # Home, EditorPage
└── utils/           # zip, importFilters, projectKind, editorState
```

## How It Works

- **State:** `ProjectProvider` holds all projects and the create/rename modal state, and writes them to `localStorage` under the key `codespace-projects`.
- **Editor:** `EditorPage` mounts a `SandpackProvider` per project. `ProjectFilesSync` copies Sandpack's file state back into the project on every change.
- **Imports:** `FileExplorer` reads the selected files and passes them to `EditorPage`, which updates the project and remounts the workspace.

## Known Limitations

- **Storage is `localStorage` only** (about 5 MB per browser). Large projects can exceed the quota, and a failed save is only logged to the console.
- **Text files only.** Images, fonts and other binary files are skipped on import. Files larger than 500 KB are skipped too.
- **Preview runs in Sandpack's bundler**, not a full Vite or Node environment. Projects that rely on Vite plugins or unsupported npm packages may not render.
- **Some UI is not wired up yet:** Download, Run, Explore, Settings and the "more" menus. The "All changes saved" label in the header is static.
- **No accounts or sharing.** Projects live only in the browser that created them.

## Roadmap

- [ ] Download project as ZIP
- [ ] Working Run button
- [ ] Templates page (replacing Explore)
- [ ] Real save status (success, failure, quota)
- [ ] Persist the selected theme
- [ ] Binary asset support (IndexedDB)

## Contributing

Issues and pull requests are welcome. For larger changes, open an issue first to discuss what you would like to change.
