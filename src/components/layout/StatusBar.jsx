function StatusBar() {
  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t border-(--border) bg-(--sidebar) px-4 text-[10px] text-(--muted)">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Ready
        </span>

        <span className="hidden sm:inline">CodeSpace Workspace</span>
      </div>

      <div className="flex gap-4">
        <span>UTF-8</span>
        <span>React</span>
      </div>
    </footer>
  );
}

export default StatusBar;
