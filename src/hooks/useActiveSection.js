import { useEffect, useState } from "react";

/**
 * Tracks which section id is most visible in the viewport.
 * Works great with a sticky header and Lenis smooth scroll.
 */
export default function useActiveSection(ids = [], {
  // when the middle of a section is inside the viewport, consider it active
  rootMargin = "-40% 0px -55% 0px",
} = {}) {
  const [active, setActive] = useState(ids[0] || null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const obs = new IntersectionObserver((entries) => {
      // choose the intersecting entry with the highest intersection ratio
      const visibles = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibles[0]?.target?.id) {
        setActive(visibles[0].target.id);
      } else {
        // fallback: find the first section whose top is above mid viewport
        const mid = window.innerHeight * 0.5;
        const near = sections
          .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
          .filter((x) => x.top <= mid)
          .sort((a, b) => b.top - a.top)[0];
        if (near?.id) setActive(near.id);
      }
    }, { root: null, threshold: [0, 0.2, 0.5, 0.8, 1], rootMargin });

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(","), rootMargin]);

  return active;
}
