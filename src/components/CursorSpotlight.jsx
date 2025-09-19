import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorSpotlight({ size = 320, strength = 0.20 }) {
  const reduced = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false, []
  );
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  const x = useSpring(pos.x - size / 2, { stiffness: 300, damping: 40, mass: 0.6 });
  const y = useSpring(pos.y - size / 2, { stiffness: 300, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <motion.div
      style={{ left: x, top: y, width: size, height: size }}
      className="pointer-events-none fixed z-[5] rounded-full"
      aria-hidden
    >
      {/* soft radial glow, cheap to render */}
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(${size/2}px ${size/2}px at 50% 50%, rgba(124,92,252,${strength}), transparent 60%)`,
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
