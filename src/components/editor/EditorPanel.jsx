import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

import { FileCode2, MoreHorizontal } from "lucide-react";

function EditorPanel() {
  return (
    <section className="flex min-h-87.5 min-w-0 flex-1 flex-col bg-(--panel) lg:min-h-0">
      {/* Editor Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-4">
        <div className="flex items-center gap-2 text-xs">
          <FileCode2 size={15} />
          App.js
          <span className="ml-1 text-(--muted)">×</span>
        </div>

        <MoreHorizontal size={18} className="text-(--muted)" />
      </div>

      {/* Sandpack Code Editor */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <SandpackCodeEditor
          showLineNumbers
          showTabs={false}
          wrapContent={false}
          closableTabs={false}
          style={{
            height: "100%",
          }}
        />
      </div>

      {/* Editor Footer */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-(--border) px-4 text-[10px] text-(--muted)">
        <div className="flex gap-4">
          <span>JavaScript</span>
          <span>Spaces: 2</span>
        </div>

        <span>React JSX</span>
      </div>
    </section>
  );
}

export default EditorPanel;
