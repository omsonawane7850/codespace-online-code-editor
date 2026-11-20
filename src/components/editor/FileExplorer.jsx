import { useEffect, useMemo, useRef, useState } from "react";

import {
  FolderOpen,
  Upload,
  FolderUp,
  FileArchive,
  File,
  Folder,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { useSandpack } from "@codesandbox/sandpack-react";

import DependencyManager from "./DependencyManager";

import { readZipFiles } from "../../utils/zip";

import {
  IGNORED_DIRS,
  MAX_FILE_SIZE,
  isSupportedName,
} from "../../utils/importFilters";

const iconButtonClass =
  "relative cursor-pointer rounded p-1.5 text-(--muted) transition hover:bg-(--hover) hover:text-(--text)";

// Builds a nested tree from flat paths, skipping hidden files
function buildTree(files) {
  const root = { folders: {}, files: [] };

  for (const [path, file] of Object.entries(files)) {
    if (file.hidden) continue;

    const parts = path.split("/").filter(Boolean);
    let node = root;

    parts.slice(0, -1).forEach((part) => {
      node.folders[part] = node.folders[part] || { folders: {}, files: [] };
      node = node.folders[part];
    });

    node.files.push({ name: parts[parts.length - 1], path });
  }

  return root;
}

function TreeNode({
  node,
  depth,
  parentPath,
  collapsed,
  toggle,
  activeFile,
  onOpen,
}) {
  const folderNames = Object.keys(node.folders).sort((a, b) =>
    a.localeCompare(b),
  );

  const fileItems = [...node.files].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      {folderNames.map((name) => {
        const folderPath = `${parentPath}/${name}`;
        const isCollapsed = collapsed.has(folderPath);

        return (
          <div key={folderPath}>
            <button
              type="button"
              onClick={() => toggle(folderPath)}
              style={{ paddingLeft: 8 + depth * 12 }}
              className="flex w-full items-center gap-1.5 rounded py-1 pr-2 text-left text-xs text-(--muted) transition hover:bg-(--hover) hover:text-(--text)"
            >
              {isCollapsed ? (
                <ChevronRight size={13} />
              ) : (
                <ChevronDown size={13} />
              )}
              <Folder size={13} className="shrink-0" />
              <span className="whitespace-nowrap">{name}</span>
            </button>

            {!isCollapsed && (
              <TreeNode
                node={node.folders[name]}
                depth={depth + 1}
                parentPath={folderPath}
                collapsed={collapsed}
                toggle={toggle}
                activeFile={activeFile}
                onOpen={onOpen}
              />
            )}
          </div>
        );
      })}

      {fileItems.map((file) => (
        <button
          key={file.path}
          type="button"
          onClick={() => onOpen(file.path)}
          style={{ paddingLeft: 8 + depth * 12 + 14 }}
          className={`flex w-full items-center gap-1.5 rounded py-1 pr-2 text-left text-xs transition ${
            activeFile === file.path
              ? "bg-(--active) text-(--text)"
              : "text-(--muted) hover:bg-(--hover) hover:text-(--text)"
          }`}
        >
          <File size={13} className="shrink-0" />
          <span className="whitespace-nowrap">{file.name}</span>
        </button>
      ))}
    </>
  );
}

// onImport(newFiles, "replace" | "merge") is handled by EditorPage.
// It returns a message string if the import did not happen.
function FileExplorer({ onImport }) {
  const { sandpack } = useSandpack();

  const statusTimerRef = useRef(null);

  const [importStatus, setImportStatus] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set());

  useEffect(() => {
    return () => clearTimeout(statusTimerRef.current);
  }, []);

  const tree = useMemo(() => buildTree(sandpack.files), [sandpack.files]);

  function toggleFolder(path) {
    setCollapsed((prev) => {
      const next = new Set(prev);

      if (next.has(path)) next.delete(path);
      else next.add(path);

      return next;
    });
  }

  function showStatus(message) {
    setImportStatus(message);

    clearTimeout(statusTimerRef.current);

    statusTimerRef.current = setTimeout(() => {
      setImportStatus("");
    }, 5000);
  }

  function formatSuccess(importedCount, skippedCount) {
    return skippedCount > 0
      ? `${importedCount} imported, ${skippedCount} skipped`
      : `${importedCount} file(s) imported`;
  }

  // Files / Folder import
  async function handleImport(event) {
    const input = event.target;

    const selectedFiles = Array.from(input.files || []);

    if (selectedFiles.length === 0) return;

    const isFolderImport = input.hasAttribute("webkitdirectory");

    showStatus(`${selectedFiles.length} selected, reading...`);

    const newFiles = {};

    let skippedCount = 0;

    try {
      const folderRoot = isFolderImport
        ? selectedFiles[0].webkitRelativePath.split("/")[0]
        : "";

      for (const file of selectedFiles) {
        const parts = (file.webkitRelativePath || file.name)
          .split("/")
          .filter(Boolean);

        const shouldSkip =
          !isSupportedName(file.name) ||
          file.size > MAX_FILE_SIZE ||
          parts.some((part) => IGNORED_DIRS.has(part));

        if (shouldSkip) {
          skippedCount++;
          continue;
        }

        // Drop the root folder name (myapp/src/App.js -> /src/App.js)
        const relativeParts =
          isFolderImport && parts[0] === folderRoot ? parts.slice(1) : parts;

        if (relativeParts.length === 0) continue;

        newFiles["/" + relativeParts.join("/")] = {
          code: await file.text(),
        };
      }

      const importedCount = Object.keys(newFiles).length;

      if (importedCount === 0) {
        showStatus(`Nothing imported (${skippedCount} skipped)`);
        return;
      }

      const error = await onImport(
        newFiles,
        isFolderImport ? "replace" : "merge",
      );

      showStatus(error || formatSuccess(importedCount, skippedCount));
    } catch (error) {
      console.error("File import failed:", error);

      showStatus(`Import failed: ${error.message}`);
    } finally {
      input.value = "";
    }
  }

  // ZIP import
  async function handleZipImport(event) {
    const input = event.target;

    const zipFile = input.files?.[0];

    if (!zipFile) return;

    showStatus("Reading ZIP...");

    try {
      const { files: newFiles, skipped } = await readZipFiles(zipFile);

      const importedCount = Object.keys(newFiles).length;

      if (importedCount === 0) {
        showStatus(`Nothing imported (${skipped} skipped)`);
        return;
      }

      const error = await onImport(newFiles, "replace");

      showStatus(error || formatSuccess(importedCount, skipped));
    } catch (error) {
      console.error("ZIP import failed:", error);

      showStatus(`ZIP import failed: ${error.message}`);
    } finally {
      input.value = "";
    }
  }

  // Allows selecting the same file/folder again
  function resetValue(event) {
    event.target.value = "";
  }

  return (
    <aside className="flex min-h-0 w-48 shrink-0 flex-col self-stretch overflow-hidden border-r border-(--border) bg-(--sidebar)">
      {/* Explorer Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={15} />

          <span className="text-xs font-medium">Explorer</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Import Files (add only) */}
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

          {/* Import Folder (replaces project) */}
          <label
            title="Import Folder (replaces project)"
            className={iconButtonClass}
          >
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

          {/* Import ZIP (replaces project) */}
          <label
            title="Import ZIP (replaces project)"
            className={iconButtonClass}
          >
            <FileArchive size={15} />

            <input
              type="file"
              accept=".zip,application/zip"
              onClick={resetValue}
              onChange={handleZipImport}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Import Status */}
      {importStatus && (
        <div className="shrink-0 border-b border-(--border) px-3 py-2 text-[10px] text-(--muted)">
          {importStatus}
        </div>
      )}

      {/* File Tree (hidden files are never shown) */}
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <div className="w-max min-w-full p-2">
          <TreeNode
            node={tree}
            depth={0}
            parentPath=""
            collapsed={collapsed}
            toggle={toggleFolder}
            activeFile={sandpack.activeFile}
            onOpen={(path) => sandpack.openFile(path)}
          />
        </div>
      </div>

      {/* Dependencies */}
      <DependencyManager />
    </aside>
  );
}

export default FileExplorer;
