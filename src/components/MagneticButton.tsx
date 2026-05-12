import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  strength?: number; // 0–1, default 0.25
};

export function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-change-transform transition-transform duration-300 ease-out ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
