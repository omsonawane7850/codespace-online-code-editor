// Entry files that mean "this project has its own code"
const OWN_ENTRY_CANDIDATES = [
  "/src/main.jsx",
  "/src/main.js",
  "/src/index.jsx",
  "/src/index.js",
  "/index.jsx",
];

const ENTRY_CANDIDATES = [...OWN_ENTRY_CANDIDATES, "/index.js"];

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

function codeOf(file) {
  return typeof file === "string" ? file : (file?.code ?? "");
}

// Remove the old starter-template files that got saved into an imported project.
// Only runs when the project has its own entry file, and only removes files
// that still look like the untouched starter code.
export function stripTemplateLeftovers(files) {
  const hasOwnEntry = OWN_ENTRY_CANDIDATES.some((path) => path in files);

  if (!hasOwnEntry) return files;

  const result = { ...files };

  const app = codeOf(result["/App.js"]);
  if ("/App.js" in result && app.length < 300 && app.includes("Hello world")) {
    delete result["/App.js"];
  }

  const styles = codeOf(result["/styles.css"]);
  if (
    "/styles.css" in result &&
    styles.length < 400 &&
    styles.includes("sans-serif")
  ) {
    delete result["/styles.css"];
  }

  const index = codeOf(result["/index.js"]);
  if (
    "/index.js" in result &&
    index.length < 600 &&
    index.includes("./App") &&
    index.includes("./styles.css")
  ) {
    delete result["/index.js"];
  }

  const html = codeOf(result["/public/index.html"]);
  if (
    "/public/index.html" in result &&
    html.length < 700 &&
    (html.includes("CodeSpace") || html.includes("Document"))
  ) {
    delete result["/public/index.html"];
  }

  return result;
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
