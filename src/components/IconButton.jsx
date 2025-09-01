import { motion } from "framer-motion";

export default function IconButton({ children, label, href = "#", external }) {
  const props = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <motion.a
      href={href}
      {...props}
      className="relative grid place-items-center w-10 h-10 rounded-xl border border-white/10 hover:border-white/20"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      aria-label={label}
    >
      <motion.span
        initial={{ opacity: 0.5, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="text-gray-200"
      >
        {children}
      </motion.span>
      <span className="sr-only">{label}</span>
    </motion.a>
  );
}
