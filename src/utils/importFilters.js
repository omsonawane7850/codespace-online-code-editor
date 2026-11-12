export const SUPPORTED_EXTENSIONS = new Set([
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

export const SPECIAL_FILES = new Set([
  ".gitignore",
  ".prettierrc",
  ".babelrc",
  "dockerfile",
  "license",
  "makefile",
]);

export const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "__MACOSX",
]);

export const MAX_FILE_SIZE = 500 * 1024; // per file
export const MAX_TOTAL_SIZE = 3 * 1024 * 1024; // whole import (localStorage ~5MB limit)

export function isSupportedName(name) {
  const fileName = name.toLowerCase();
  const extension = fileName.includes(".") ? fileName.split(".").pop() : "";

  return SPECIAL_FILES.has(fileName) || SUPPORTED_EXTENSIONS.has(extension);
}
