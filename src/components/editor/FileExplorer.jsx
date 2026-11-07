import { FolderOpen } from "lucide-react";

import { SandpackFileExplorer } from "@codesandbox/sandpack-react";

function FileExplorer() {
  return (
    <aside className="flex w-48 shrink-0 flex-col border-r border-(--border) bg-(--sidebar)">
      {/* Explorer Header */}
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-(--border) px-4">
        <FolderOpen size={15} />

        <span className="text-xs font-medium">Explorer</span>
      </div>

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
