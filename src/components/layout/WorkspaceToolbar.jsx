import { PanelLeft, MoreHorizontal } from "lucide-react";

function WorkspaceToolbar() {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-(--border) px-4">
      <div className="flex items-center gap-3">
        <button className="text-(--muted) transition hover:text-(--text)">
          <PanelLeft size={17} />
        </button>

        <span className="text-sm font-medium">Untitled Project</span>

        <span className="rounded border border-(--border) px-2 py-1 text-[10px] text-(--muted)">
          React
        </span>
      </div>

      <button className="text-(--muted) transition hover:text-(--text)">
        <MoreHorizontal size={19} />
      </button>
    </div>
  );
}

export default WorkspaceToolbar;
