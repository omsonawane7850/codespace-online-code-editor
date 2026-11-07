import { FileCode2, MoreHorizontal } from "lucide-react";

function EditorPanel() {
  const lines = [
    {
      number: 1,
      content: (
        <>
          <span className="text-(--purple)">function</span>{" "}
          <span className="text-(--yellow)">App</span>() {"{"}
        </>
      ),
    },
    {
      number: 2,
      content: (
        <span className="pl-5">
          <span className="text-(--purple)">return</span> (
        </span>
      ),
    },
    {
      number: 3,
      content: (
        <span className="pl-10">
          {"<"}
          <span className="text-(--red)">div</span>
          {">"}
        </span>
      ),
    },
    {
      number: 4,
      content: (
        <span className="pl-14">
          {"<"}
          <span className="text-(--red)">h1</span>
          {">"}
          <span className="text-(--green)">Hello, CodeSpace!</span>
          {"</"}
          <span className="text-(--red)">h1</span>
          {">"}
        </span>
      ),
    },
    {
      number: 5,
      content: (
        <span className="pl-10">
          {"</"}
          <span className="text-(--red)">div</span>
          {">"}
        </span>
      ),
    },
    {
      number: 6,
      content: <span className="pl-5">);</span>,
    },
    {
      number: 7,
      content: "}",
    },
    {
      number: 8,
      content: (
        <>
          <span className="text-(--purple)">export default</span>{" "}
          <span className="text-(--yellow)">App</span>;
        </>
      ),
    },
  ];

  return (
    <section className="flex min-h-87.5 min-w-0 flex-1 flex-col bg-(--panel) lg:min-h-0">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--border) px-4">
        <div className="flex items-center gap-2 text-xs">
          <FileCode2 size={15} />
          App.jsx
          <span className="ml-1 text-(--muted)">×</span>
        </div>

        <MoreHorizontal size={18} className="text-(--muted)" />
      </div>

      <div className="flex-1 overflow-auto bg-(--panel) p-5 font-mono text-[13px] leading-loose">
        {lines.map((line) => (
          <div key={line.number} className="flex whitespace-pre">
            <span className="w-10 shrink-0 pr-4 text-right text-(--subtle)">
              {line.number}
            </span>

            <span>{line.content}</span>
          </div>
        ))}
      </div>

      <div className="flex h-8 shrink-0 items-center justify-between border-t border-(--border) px-4 text-[10px] text-(--muted)">
        <div className="flex gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>

        <span>JavaScript JSX</span>
      </div>
    </section>
  );
}

export default EditorPanel;
