export const fadeIn = (delay = 0, y = 12) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  }
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren }
  }
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
  }
});
