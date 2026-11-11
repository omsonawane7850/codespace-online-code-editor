import { useRef, useState } from "react";

import { FolderOpen, Upload, FolderUp } from "lucide-react";

import { SandpackFileExplorer, useSandpack } from "@codesandbox/sandpack-react";

const SUPPORTED_EXTENSIONS = new Set([
  "js",
  "jsx",
  "ts",
  "tsx",
  "css",
  "scss",
  "html",
  "json",
  "md",
  "txt",
  "svg",
  "xml",
  "yml",
  "yaml",
  "env",
  "sql",
  "sh",
  "py",
  "java",
  "c",
  "cpp",
  "h",
  "cs",
]);

const SPECIAL_FILES = new Set([
  ".gitignore",
  ".prettierrc",
  ".babelrc",
  "dockerfile",
  "license",
  "makefile",
]);

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
]);

const MAX_FILE_SIZE = 500 * 1024; // 500KB

function isSupportedFile(file) {
  const fileName = file.name.toLowerCase();
  const extension = fileName.includes(".") ? fileName.split(".").pop() : "";

  return SPECIAL_FILES.has(fileName) || SUPPORTED_EXTENSIONS.has(extension);
}

const iconButtonClass =
  "relative cursor-pointer rounded p-1.5 text-(--muted) transition hover:bg-(--hover) hover:text-(--text)";

function FileExplorer() {
  const { sandpack } = useSandpack();

  const statusTimerRef = useRef(null);

  const [importStatus, setImportStatus] = useState("");

  function showStatus(message) {
    setImportStatus(message);

    clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setImportStatus(""), 5000);
  }

  async function handleImport(event) {
    const input = event.target;
    const selectedFiles = Array.from(input.files || []);

    console.log("handleImport fired:", selectedFiles.length, "files");

    if (selectedFiles.length === 0) return;

    showStatus(`${selectedFiles.length} selected, reading...`);

    const newFiles = {};
    let skippedCount = 0;

    try {
      for (const file of selectedFiles) {
        const parts = (file.webkitRelativePath || file.name)
          .split("/")
          .filter(Boolean);

        // Folder import: top-level folder name hatao (myapp/src/App.js -> /src/App.js)
        if (file.webkitRelativePath && parts.length > 1) {
          parts.shift();
        }

        const shouldSkip =
          !isSupportedFile(file) ||
          file.size > MAX_FILE_SIZE ||
          parts.some((part) => IGNORED_DIRS.has(part));

        if (shouldSkip) {
          skippedCount++;
          continue;
        }

        newFiles["/" + parts.join("/")] = { code: await file.text() };
      }

      const paths = Object.keys(newFiles);

      if (paths.length === 0) {
        showStatus(
          `Nothing imported (${skippedCount} skipped: type/size/folder)`,
        );
        return;
      }

      // Ek hi call mein saari files
      sandpack.updateFile(newFiles);
      sandpack.openFile(paths[paths.length - 1]);

      showStatus(
        skippedCount > 0
          ? `${paths.length} imported, ${skippedCount} skipped`
          : `${paths.length} file(s) imported`,
      );
    } catch (error) {
      console.error("File import failed:", error);
      showStatus(`Import failed: ${error.message}`);
    }
  }

  // Click se pehle value reset: same file dobara chunne pe bhi onChange chale
  function resetValue(event) {
    event.target.value = "";
  }

  return (
    <aside className="flex w-48 shrink-0 flex-col border-r border-(--border) bg-(--sidebar)">
      {/* Explorer Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={15} />

          <span className="text-xs font-medium">Explorer</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Import Files */}
          <label title="Import Files" className={iconButtonClass}>
            <Upload size={15} />
            <input
              type="file"
              multiple
              onClick={resetValue}
              onChange={handleImport}
              className="sr-only"
            />
          </label>

          {/* Import Folder */}
          <label title="Import Folder" className={iconButtonClass}>
            <FolderUp size={15} />
            <input
              type="file"
              multiple
              webkitdirectory=""
              directory=""
              onClick={resetValue}
              onChange={handleImport}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Import Status */}
      {importStatus && (
        <div className="border-b border-(--border) px-3 py-2 text-[10px] text-(--muted)">
          {importStatus}
        </div>
      )}

      {/* File Tree */}
      <div className="min-h-0 flex-1 overflow-auto p-2">
        <SandpackFileExplorer
          autoHiddenFiles={false}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </aside>
  );
}

export default FileExplorer;
