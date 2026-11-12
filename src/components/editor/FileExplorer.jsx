import { useRef, useState } from "react";

import { FolderOpen, Upload, FolderUp, FileArchive } from "lucide-react";

import { SandpackFileExplorer } from "@codesandbox/sandpack-react";

import DependencyManager from "./DependencyManager";

import { readZipFiles } from "../../utils/zip";

import {
  IGNORED_DIRS,
  MAX_FILE_SIZE,
  isSupportedName,
} from "../../utils/importFilters";

const iconButtonClass =
  "relative cursor-pointer rounded p-1.5 text-(--muted) transition hover:bg-(--hover) hover:text-(--text)";

// onImport(newFiles, "replace" | "merge") is handled by EditorPage
function FileExplorer({ onImport }) {
  const statusTimerRef = useRef(null);

  const [importStatus, setImportStatus] = useState("");

  function showStatus(message) {
    setImportStatus(message);

    clearTimeout(statusTimerRef.current);

    statusTimerRef.current = setTimeout(() => {
      setImportStatus("");
    }, 5000);
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

        const relativeParts =
          isFolderImport && parts[0] === folderRoot ? parts.slice(1) : parts;

        if (relativeParts.length === 0) continue;

        newFiles["/" + relativeParts.join("/")] = {
          code: await file.text(),
        };
      }

      if (Object.keys(newFiles).length === 0) {
        showStatus(`Nothing imported (${skippedCount} skipped)`);
        return;
      }

      const error = onImport(newFiles, isFolderImport ? "replace" : "merge");

      if (error) showStatus(error);
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

      if (Object.keys(newFiles).length === 0) {
        showStatus(`Nothing imported (${skipped} skipped)`);
        return;
      }

      const error = onImport(newFiles, "replace");

      if (error) showStatus(error);
    } catch (error) {
      console.error("ZIP import failed:", error);

      showStatus(`ZIP import failed: ${error.message}`);
    } finally {
      input.value = "";
    }
  }

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

          {/* Import ZIP */}
          <label title="Import ZIP" className={iconButtonClass}>
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

      {/* File Explorer Tree */}
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <div className="min-h-full w-max min-w-full p-2">
          <SandpackFileExplorer
            autoHiddenFiles={false}
            style={{
              minHeight: "100%",
              width: "max-content",
              minWidth: "100%",
            }}
          />
        </div>
      </div>

      {/* Dependencies */}
      <DependencyManager />
    </aside>
  );
}

export default FileExplorer;
