import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Hotspot = point of the image that sits exactly on the real pointer (0–1).
const SHUTTLE = { src: "/assets/tournament/shuttlecock-cursor.svg", size: 60, hx: 0.5, hy: 0.5 };
const RACKET = { src: "/assets/tournament/racket-cursor.svg", size: 68, hx: 0.24, hy: 0.23 };

const INTERACTIVE = "a, button, [role='button'], summary, label[for]";

const OUTLINE =
  "drop-shadow(0 0 1px #0b3547) drop-shadow(0 0 1px #0b3547) drop-shadow(0 2px 3px rgba(11,53,71,.45))";

const HIDE_CURSOR_CSS = `
  html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }
  html.has-custom-cursor input, html.has-custom-cursor textarea,
  html.has-custom-cursor select { cursor: text !important; }
`;

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pos = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      // direct DOM write: no React render, no spring => no lag
      if (pos.current) {
        pos.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        pos.current.style.opacity = "1";
      }
    };
    const over = (e: PointerEvent) =>
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      if (pos.current) pos.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const t = reduce ? { duration: 0 } : { duration: 0.12, ease: "easeOut" as const };

  return (
    <>
      <style>{HIDE_CURSOR_CSS}</style>
      <div
        ref={pos}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[2147483647]"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <motion.img
          src={SHUTTLE.src}
          alt=""
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            width: SHUTTLE.size,
            height: SHUTTLE.size,
            left: -SHUTTLE.hx * SHUTTLE.size,
            top: -SHUTTLE.hy * SHUTTLE.size,
            transformOrigin: `${SHUTTLE.hx * 100}% ${SHUTTLE.hy * 100}%`,
            filter: OUTLINE,
          }}
          animate={{ opacity: hovering ? 0 : 1, scale: pressed ? 0.85 : 1 }}
          transition={t}
        />
        <motion.img
          src={RACKET.src}
          alt=""
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            width: RACKET.size,
            height: RACKET.size,
            left: -RACKET.hx * RACKET.size,
            top: -RACKET.hy * RACKET.size,
            transformOrigin: `${RACKET.hx * 100}% ${RACKET.hy * 100}%`,
            filter: OUTLINE,
          }}
          animate={{
            opacity: hovering ? 1 : 0,
            rotate: pressed && !reduce ? -28 : 0,
            scale: hovering ? 1 : 0.8,
          }}
          transition={t}
        />
      </div>
    </>
  );
}