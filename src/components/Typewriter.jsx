import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Accessible typewriter:
 * - Types & deletes letters
 * - Falls back to full-word crossfade if user prefers reduced motion
 * - Fixed min width so the brand doesn't jiggle when the word length changes
 */
export default function Typewriter({
  words = [],
  className = "",
  typingSpeed = 90,     // ms per character while typing
  deletingSpeed = 50,   // ms per character while deleting
  holdTime = 1200,      // ms to hold the full word before deleting
  gapTime = 400,        // ms to wait before typing the next word
  loop = true,
  minCh = 14,           // reserve width so layout doesn't shift
}) {
  const reducedMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    []
  );

  // Reduced motion: just crossfade full words on a timer
  if (reducedMotion) {
    return <ReducedType words={words} className={className} minCh={minCh} holdTime={1200} />;
  }

  const [i, setI] = useState(0);           // which word
  const [sub, setSub] = useState(0);       // substring length
  const [deleting, setDeleting] = useState(false);
  const word = words[i] ?? "";

  useEffect(() => {
    let t;
    if (!deleting && sub < word.length) {
      t = setTimeout(() => setSub((s) => s + 1), typingSpeed);
    } else if (!deleting && sub === word.length) {
      t = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && sub > 0) {
      t = setTimeout(() => setSub((s) => s - 1), deletingSpeed);
    } else if (deleting && sub === 0) {
      t = setTimeout(() => {
        const next = (i + 1) % words.length;
        setI(next);
        setDeleting(false);
      }, gapTime);
    }
    return () => clearTimeout(t);
  }, [sub, deleting, i, word.length, typingSpeed, deletingSpeed, holdTime, gapTime, words.length]);

  return (
    <span
      className={`whitespace-nowrap inline-flex items-center ${className}`}
      style={{ minWidth: `${minCh}ch` }}
      aria-live="polite"
    >
      {word.slice(0, sub)}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
}

// Reduced-motion fallback: crossfade whole words (no per-letter animation)
function ReducedType({ words, className, minCh, holdTime }) {
  const [i, setI] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setI((n) => (n + 1) % words.length);
    }, holdTime);
    return () => clearInterval(timerRef.current);
  }, [words.length, holdTime]);

  return (
    <span className={`inline-flex items-center ${className}`} style={{ minWidth: `${minCh}ch` }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className="whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
