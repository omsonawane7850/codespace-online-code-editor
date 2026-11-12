import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

import { Code2, MoreHorizontal } from "lucide-react";

function EditorPanel() {
  return (
    <section className="flex min-h-0 min-w-80 flex-1 flex-col bg-(--panel)">
      {/* Editor Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-4">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Code2 size={15} />
          <span>Code Editor</span>
        </div>

        <MoreHorizontal size={18} className="cursor-pointer text-(--muted)" />
      </div>

      {/* Editor with File Tabs (absolute fill = guaranteed bounded height) */}
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <SandpackCodeEditor
            showLineNumbers
            showTabs
            closableTabs
            wrapContent={false}
            style={{ height: "100%" }}
          />
        </div>
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
