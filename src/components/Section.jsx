import { motion } from "framer-motion";
import { fadeIn } from "../lib/motion";

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="container-pad py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {title && (
          <motion.div variants={fadeIn(0, 10)} className="mb-6">
            <h2>{title}</h2>
            {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
          </motion.div>
        )}
        <motion.div variants={fadeIn(0.05, 12)}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
