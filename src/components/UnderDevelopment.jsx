import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

/**
 * UnderDevelopment
 * - Use inline inside a Section, or fullscreen overlay (set fullscreen={true})
 */
export default function UnderDevelopment({
  label = "This section is under development",
  fullscreen = false,
}) {
  const Wrapper = ({ children }) =>
    fullscreen ? (
      <div className="fixed inset-0 z-50 grid place-items-center p-6 bg-black/60 backdrop-blur-sm">
        {children}
      </div>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass max-w-xl w-full p-6 md:p-8 text-center"
      >
        <div className="mx-auto w-12 h-12 rounded-2xl grid place-items-center border border-white/10 mb-4">
          <motion.span
            animate={{ rotate: [-15, 15, -15] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hammer size={20} />
          </motion.span>
        </div>

        <h3 className="text-xl md:text-2xl font-medium">
          {label}
        </h3>
        <p className="mt-2 text-gray-400">
          I’m crafting this area. Check back soon.
        </p>

        <motion.div
          className="mx-auto mt-4 h-[2px] w-0 bg-gradient-to-r from-[var(--primary)] via-white/40 to-[var(--accent)]"
          animate={{ width: "60%" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </Wrapper>
  );
}
