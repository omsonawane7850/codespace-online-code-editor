import JSZip from "jszip";

import {
  IGNORED_DIRS,
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
  isSupportedName,
} from "./importFilters";

const MAX_ENTRIES = 1000;

// EXPORT: project files -> .zip download
export async function exportProjectZip(project) {
  const zip = new JSZip();

  for (const [path, file] of Object.entries(project.files || {})) {
    const code = typeof file === "string" ? file : (file?.code ?? "");

    zip.file(path.replace(/^\/+/, ""), code);
  }

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
  });

  const safeName =
    (project.name || "project").replace(/[^\w.-]+/g, "-").slice(0, 40) ||
    "project";

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${safeName}.zip`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// IMPORT: .zip -> { files, skipped }
export async function readZipFiles(zipFile) {
  const zip = await JSZip.loadAsync(zipFile);

  const entries = Object.values(zip.files).filter((entry) => !entry.dir);

  if (entries.length > MAX_ENTRIES) {
    throw new Error(`ZIP has too many files (max ${MAX_ENTRIES})`);
  }

  let skipped = 0;

  // Split paths, drop macOS junk
  const candidates = [];

  for (const entry of entries) {
    const parts = entry.name.split("/").filter(Boolean);

    if (parts.length === 0 || parts.includes("__MACOSX")) continue;

    candidates.push({ entry, parts });
  }

  // If everything lives inside one root folder, strip it
  const root =
    candidates.length > 0 &&
    candidates.every(
      (item) =>
        item.parts.length > 1 && item.parts[0] === candidates[0].parts[0],
    )
      ? candidates[0].parts[0]
      : null;

  const files = {};
  let totalSize = 0;

  for (const { entry, parts } of candidates) {
    const relativeParts = root ? parts.slice(1) : parts;
    const fileName = relativeParts[relativeParts.length - 1];

    const shouldSkip =
      relativeParts.some((part) => part === ".." || part === ".") ||
      relativeParts.some((part) => IGNORED_DIRS.has(part)) ||
      !isSupportedName(fileName);

    if (shouldSkip) {
      skipped++;
      continue;
    }

    const code = await entry.async("string");

    if (
      code.length > MAX_FILE_SIZE ||
      totalSize + code.length > MAX_TOTAL_SIZE
    ) {
      skipped++;
      continue;
    }

    totalSize += code.length;
    files["/" + relativeParts.join("/")] = { code };
  }

  return { files, skipped };
}
