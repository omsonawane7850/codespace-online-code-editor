import { SandpackPreview } from "@codesandbox/sandpack-react";

import { Eye, MoreHorizontal } from "lucide-react";

function PreviewPanel() {
  return (
    <section className="flex min-h-0 min-w-80 flex-1 flex-col bg-(--panel)">
      {/* Preview Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-4">
        <div className="flex items-center gap-2 text-xs">
          <Eye size={16} />
          Preview
        </div>

        <div className="flex items-center gap-3 text-[10px] text-(--muted)">
          localhost:3000
          <MoreHorizontal size={18} />
        </div>
      </div>

      {/* Sandpack Live Preview */}
      <div className="relative min-h-0 flex-1 bg-(--surface)">
        <div className="absolute inset-4 overflow-hidden rounded-md bg-white">
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            showNavigator={false}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default PreviewPanel;
