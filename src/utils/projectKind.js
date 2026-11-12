const ENTRY_CANDIDATES = [
  "/src/main.jsx",
  "/src/main.js",
  "/src/index.jsx",
  "/src/index.js",
  "/index.jsx",
  "/index.js",
];

// Files the "react" template injects into every project
const TEMPLATE_FILES = ["/index.js", "/App.js", "/styles.css"];

const FALLBACK_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeSpace</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

// Pick the real entry file of the project (falls back to template default)
export function detectEntry(files) {
  const paths = Object.keys(files);

  return ENTRY_CANDIDATES.find((path) => paths.includes(path)) ?? "/index.js";
}

// Does this project use Tailwind? (checked from package.json)
export function usesTailwind(files) {
  const raw = files["/package.json"]?.code;

  return typeof raw === "string" && raw.includes('"tailwindcss"');
}

// Override template leftovers with empty hidden files so they never show or run
export function hideTemplateLeftovers(files, entry) {
  // Project has no entry of its own -> keep the template working as is
  if (!(entry in files)) return files;

  const result = { ...files };

  for (const path of TEMPLATE_FILES) {
    if (path in files) continue;

    result[path] = { code: "", hidden: true };
  }

  if (!("/public/index.html" in files)) {
    result["/public/index.html"] = { code: FALLBACK_HTML, hidden: true };
  }

  return result;
}
