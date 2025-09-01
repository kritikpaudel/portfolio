import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * 3D tilt + glow that follows the cursor.
 * - Respects prefers-reduced-motion
 * - Disables tilt on touch pointers
 * - GPU-accelerated, rAF-friendly springs
 */
export default function TiltCard({
  href = "#",
  className = "",
  children,
  maxTilt = 12,        // degrees
  glow = true,
  ...rest
}) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 260, damping: 20, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 260, damping: 20, mass: 0.6 });
  const scale = useSpring(1, { stiffness: 260, damping: 20, mass: 0.6 });

  // cache reduced-motion
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function onPointerMove(e) {
    if (reduced.current || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    // map to tilt
    const _ry = (px - 0.5) * 2 * maxTilt;  // left/right
    const _rx = -(py - 0.5) * 2 * maxTilt; // up/down
    ry.set(_ry);
    rx.set(_rx);
    scale.set(1.02);
    // move glow
    ref.current.style.setProperty("--px", `${px * 100}%`);
    ref.current.style.setProperty("--py", `${py * 100}%`);
  }

  function onPointerLeave() {
    rx.set(0);
    ry.set(0);
    scale.set(1);
    if (ref.current) {
      ref.current.style.setProperty("--px", `50%`);
      ref.current.style.setProperty("--py", `50%`);
    }
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.a
        ref={ref}
        href={href}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={`group relative block rounded-2xl ${className}`}
        style={{
          rotateX: rx,
          rotateY: ry,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        {...rest}
      >
        {/* content slot */}
        {children}

        {/* glow that follows the cursor */}
        {glow && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px 160px at var(--px, 50%) var(--py, 50%), rgba(124,92,252,.18), transparent 60%)",
            }}
          />
        )}
      </motion.a>
    </div>
  );
}
