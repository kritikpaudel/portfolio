import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function useParallax(range = [0, 1], output = [-30, 30]) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, range, output);
  return { ref, y };
}
