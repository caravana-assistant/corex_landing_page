import { useEffect, useRef } from "react";

type Props = {
  line1: string;
  line2: string;
  line3?: string;
  className?: string;
};

function splitLetters(text: string) {
  return Array.from(text);
}

export function Slogan({ line1, line2, line3, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Mouse-tracked tilt parallax
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const handle = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        wrap.style.setProperty("--tilt-x", `${dx * 5}deg`);
        wrap.style.setProperty("--tilt-y", `${-dy * 5}deg`);
        wrap.style.setProperty("--shift-x", `${dx * 6}px`);
        wrap.style.setProperty("--shift-y", `${dy * 6}px`);
        raf = 0;
      });
    };
    const reset = () => {
      wrap.style.setProperty("--tilt-x", `0deg`);
      wrap.style.setProperty("--tilt-y", `0deg`);
      wrap.style.setProperty("--shift-x", `0px`);
      wrap.style.setProperty("--shift-y", `0px`);
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("mouseleave", reset);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const lines = [line1, line2, line3].filter((s): s is string => Boolean(s));
  const baseDelay = 0.04;
  let runningIndex = 0;

  return (
    <div
      ref={wrapRef}
      className={`slogan-wrap ${className}`}
      style={{
        ["--tilt-x" as string]: "0deg",
        ["--tilt-y" as string]: "0deg",
        ["--shift-x" as string]: "0px",
        ["--shift-y" as string]: "0px",
      }}
    >
      <h1 className="font-display text-[12vw] leading-[0.85] md:text-[9.5vw] lg:text-[8.5vw]">
        {lines.map((line, lineIndex) => {
          const letters = splitLetters(line);
          const isVolt = lineIndex === 0;
          const node = (
            <span key={lineIndex} className="block overflow-hidden">
              <span
                className={`slogan-line block ${
                  isVolt ? "slogan-line--volt" : ""
                }`}
              >
                {letters.map((ch, i) => {
                  const delay = (runningIndex + i) * baseDelay + lineIndex * 0.05;
                  return (
                    <span
                      key={`${lineIndex}-${i}`}
                      className="slogan-letter inline-block"
                      style={{ animationDelay: `${delay}s` }}
                      aria-hidden={ch === " "}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  );
                })}
              </span>
            </span>
          );
          runningIndex += letters.length;
          return node;
        })}
      </h1>
      <span className="sr-only">{lines.join(" ")}</span>
    </div>
  );
}
