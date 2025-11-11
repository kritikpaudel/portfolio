import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "./IconButton";
import { Instagram, Linkedin, Mail, Menu, X } from "lucide-react";
import Typewriter from "./Typewriter";
import useActiveSection from "../hooks/useActiveSection";

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // which section is active on screen
  const activeId = useActiveSection(links.map(l => l.id));

  // lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  // close on escape and outside click
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    function onDown(e) { if (open && panelRef.current && !panelRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-pad">
        <div className="glass-solid mt-4 mb-4 px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent" />
            <Typewriter
              words={["Kritik Paudel", "kritik_paudel", "impatientboy"]}
              className="text-sm md:text-base text-gray-200"
              minCh={14}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => {
              const isActive = activeId === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="menu-link relative"
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.10)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
                    />
                  )}
                  <span className={isActive ? "relative z-10 text-white" : "relative z-10"}>
                    {l.label}
                  </span>
                </a>
              );
            })}
            <div className="w-px h-6 bg-white/10 mx-1" />
            <IconButton label="Instagram" href="https://instagram.com/kritik_paudel" external>
              <Instagram size={18} />
            </IconButton>
            <IconButton label="LinkedIn" href="https://www.linkedin.com/in/kritik-paudel-6a159128a/" external>
              <Linkedin size={18} />
            </IconButton>
            <IconButton label="Email" href="mailto:kritikpaudel69@gmail.com">
              <Mail size={18} />
            </IconButton>
          </nav>

          {/* Mobile toggler */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 hover:border-white/20"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-[100dvh] w-[min(92vw,360px)] glass-solid p-4 flex flex-col"
              style={{ paddingTop: "calc(env(safe-area-inset-top) + 8px)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-200">Menu</span>
                <button
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 hover:border-white/20"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-2 flex flex-col">
                {links.map((l) => {
                  const isActive = activeId === l.id;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      className={`menu-link text-lg relative ${isActive ? "text-white" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navActiveMobile"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.10)" }}
                          transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{l.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2">
                <IconButton label="Instagram" href="https://instagram.com/yourusername" external>
                  <Instagram size={18} />
                </IconButton>
                <IconButton label="LinkedIn" href="https://linkedin.com/in/yourusername" external>
                  <Linkedin size={18} />
                </IconButton>
                <IconButton label="Email" href="mailto:hello@example.com">
                  <Mail size={18} />
                </IconButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
