import { useEffect, useRef, useState } from "react";

import { useSandpack } from "@codesandbox/sandpack-react";

import {
  Package,
  Plus,
  X,
  Loader2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const PACKAGE_JSON = "/package.json";

// npm package name rules (scoped + unscoped)
const NAME_RE = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

// "lodash" | "lodash@4.17.21" | "@scope/pkg" | "@scope/pkg@next"
function parseSpec(input) {
  const text = input.trim();
  const at = text.lastIndexOf("@");

  if (at > 0) {
    return { name: text.slice(0, at), version: text.slice(at + 1) };
  }

  return { name: text, version: "" };
}

// Ask npm registry for an exact version (works for "latest", dist-tags, exact versions)
async function resolveVersion(name, requested) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(name)}/${encodeURIComponent(requested || "latest")}`;

  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error(
      requested
        ? `${name}@${requested} not found (use exact version or tag)`
        : `Package "${name}" not found`,
    );
  }

  if (!response.ok) {
    throw new Error(`npm registry error (${response.status})`);
  }

  const data = await response.json();

  return data.version;
}

function readPackage(files) {
  const raw = files[PACKAGE_JSON]?.code;

  if (raw === undefined) return { status: "missing", pkg: null };

  try {
    const pkg = JSON.parse(raw);

    if (!pkg || typeof pkg !== "object" || Array.isArray(pkg)) {
      return { status: "invalid", pkg: null };
    }

    return { status: "ok", pkg };
  } catch {
    return { status: "invalid", pkg: null };
  }
}

function sortObject(object) {
  return Object.fromEntries(
    Object.entries(object).sort(([a], [b]) => a.localeCompare(b)),
  );
}

function DependencyManager() {
  const { sandpack } = useSandpack();

  // Latest sandpack for use after await (avoids overwriting edits made meanwhile)
  const latestRef = useRef(sandpack);

  useEffect(() => {
    latestRef.current = sandpack;
  });

  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");

  const { status, pkg } = readPackage(sandpack.files);

  const dependencies = Object.entries(pkg?.dependencies || {}).sort(
    ([a], [b]) => a.localeCompare(b),
  );

  function writeDependencies(nextDependencies) {
    const current = readPackage(latestRef.current.files);

    if (current.status !== "ok") {
      throw new Error("package.json is missing or invalid");
    }

    const nextPackage = {
      ...current.pkg,
      dependencies: sortObject(nextDependencies),
    };

    latestRef.current.sandpack?.updateFile
      ? latestRef.current.sandpack.updateFile(
          PACKAGE_JSON,
          JSON.stringify(nextPackage, null, 2),
        )
      : latestRef.current.updateFile(
          PACKAGE_JSON,
          JSON.stringify(nextPackage, null, 2),
        );
  }

  async function handleAdd(event) {
    event.preventDefault();

    if (isBusy || status !== "ok") return;

    const { name, version } = parseSpec(value);

    if (!NAME_RE.test(name)) {
      setError("Invalid package name");
      return;
    }

    setIsBusy(true);
    setError("");

    try {
      const resolved = await resolveVersion(name, version);

      // No version typed -> ^latest, version/tag typed -> pin exact
      const range = version ? resolved : `^${resolved}`;

      const current = readPackage(latestRef.current.files);

      writeDependencies({
        ...(current.pkg?.dependencies || {}),
        [name]: range,
      });

      setValue("");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Network error: could not reach npm"
          : err.message,
      );
    } finally {
      setIsBusy(false);
    }
  }

  function handleRemove(name) {
    setError("");

    try {
      const current = readPackage(latestRef.current.files);
      const next = { ...(current.pkg?.dependencies || {}) };

      delete next[name];

      writeDependencies(next);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="shrink-0 border-t border-(--border)">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-9 w-full items-center gap-2 px-3 text-left text-xs font-medium transition hover:bg-(--hover)"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Package size={14} />
        Dependencies
        <span className="ml-auto text-[10px] text-(--muted)">
          {dependencies.length}
        </span>
      </button>

      {isOpen && (
        <div className="max-h-56 overflow-y-auto px-3 pb-3">
          {status !== "ok" ? (
            <p className="py-2 text-[10px] text-(--muted)">
              {status === "missing"
                ? "package.json not found in this project."
                : "package.json has invalid JSON. Fix it in the editor."}
            </p>
          ) : (
            <>
              <form onSubmit={handleAdd} className="flex gap-1.5">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="package or pkg@1.2.3"
                  spellCheck={false}
                  className="min-w-0 flex-1 rounded border border-(--border) bg-(--surface) px-2 py-1.5 text-[11px] text-(--text) outline-none placeholder:text-(--subtle) focus:border-(--muted)"
                />

                <button
                  type="submit"
                  disabled={isBusy || !value.trim()}
                  title="Add dependency"
                  className="flex shrink-0 cursor-pointer items-center justify-center rounded bg-(--accent) px-2 text-(--accent-text) transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBusy ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Plus size={13} />
                  )}
                </button>
              </form>

              {error && (
                <p className="mt-2 text-[10px] text-(--red)">{error}</p>
              )}

              <ul className="mt-2 space-y-0.5">
                {dependencies.map(([name, version]) => (
                  <li
                    key={name}
                    className="group flex items-center gap-2 rounded px-1.5 py-1 text-[11px] hover:bg-(--hover)"
                  >
                    <span className="min-w-0 flex-1 truncate" title={name}>
                      {name}
                    </span>

                    <span className="shrink-0 text-[10px] text-(--muted)">
                      {version}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemove(name)}
                      title={`Remove ${name}`}
                      className="shrink-0 cursor-pointer text-(--muted) opacity-0 transition hover:text-(--red) group-hover:opacity-100"
                    >
                      <X size={13} />
                    </button>
                  </li>
                ))}

                {dependencies.length === 0 && (
                  <li className="px-1.5 py-1 text-[10px] text-(--subtle)">
                    No dependencies
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DependencyManager;
