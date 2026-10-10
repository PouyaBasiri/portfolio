import { useEffect, useState } from "react";

/** Types a phrase, pauses, deletes it, then moves to the next one. */
export function RotatingText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length];
    let delay = deleting ? 35 : 70;

    if (!deleting && text === full) delay = 1600;
    if (deleting && text === "") delay = 350;

    const id = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [text, deleting, index, phrases]);

  return (
    <span className="font-mono text-blue-300">
      {text}
      <span className="animate-caret ml-0.5 inline-block w-[2px] translate-y-[2px] bg-blue-400">&nbsp;</span>
    </span>
  );
}

type Line = { prompt: string; text: string; out: string };

/** A terminal card that "types" commands one after another like an AI assistant. */
export function Terminal({ lines }: { lines: Line[] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const cur = lines[lineIdx];
    let id: number;

    if (charIdx < cur.text.length) {
      id = window.setTimeout(() => setCharIdx((c) => c + 1), 55);
    } else if (!showOut) {
      id = window.setTimeout(() => setShowOut(true), 350);
    } else {
      id = window.setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
        setShowOut(false);
      }, 700);
    }
    return () => window.clearTimeout(id);
  }, [lineIdx, charIdx, showOut, lines]);

  const done = lineIdx >= lines.length;

  return (
    <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/20">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-400">assistant — ~/portfolio</span>
      </div>
      <div className="min-h-[220px] space-y-3 p-5 font-mono text-sm leading-relaxed">
        {lines.map((l, i) => {
          if (i > lineIdx) return null;
          const typing = i === lineIdx && !done;
          const shown = typing ? l.text.slice(0, charIdx) : l.text;
          const outVisible = i < lineIdx || (typing && showOut);
          return (
            <div key={i}>
              <div>
                <span className="text-emerald-400">{l.prompt}</span>{" "}
                <span className="text-slate-100">{shown}</span>
                {typing && !showOut && <span className="animate-caret text-blue-400">▍</span>}
              </div>
              {outVisible && <div className="pl-4 text-blue-300">{l.out}</div>}
            </div>
          );
        })}
        {done && (
          <div>
            <span className="text-emerald-400">$</span> <span className="animate-caret text-blue-400">▍</span>
          </div>
        )}
      </div>
    </div>
  );
}
