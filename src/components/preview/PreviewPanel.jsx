import { Eye, MoreHorizontal } from "lucide-react";

function PreviewPanel() {
  return (
    <section className="flex min-h-87.5 min-w-0 flex-1 flex-col bg-(--panel) lg:min-h-0">
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

      {/* Preview Canvas */}
      <div className="flex-1 bg-(--surface) p-4">
        <div className="flex h-full min-h-62.5 items-center justify-center rounded-md border border-black/5 bg-(--canvas)">
          <div className="text-center text-(--canvas-text)">
            <h1 className="text-3xl font-bold tracking-tight">
              Hello, CodeSpace!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Your preview will appear here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PreviewPanel;
