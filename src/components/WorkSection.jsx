import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.png";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
} from "lucide-react";

/** ─────────────────────────────────────────────────────────
 * WorkSection – 3 cards with scrollable modal + gallery
 * Tailwind + Framer Motion
 * Replace demo data with your real projects/screenshots
 * ───────────────────────────────────────────────────────── */

export default function WorkSection() {
  const projects = useMemo(
    () => [
     {
        id: "ctf-mini",
        title: "Mini CTF",
        subtitle: "Steg, OSINT & Web puzzles",
        year: 2024,
        desc:
            "A basic Capture-the-Flag platform designed for beginner students to test their skills after a 5-day cybersecurity training session. It includes puzzles on steganography, audio/image forensics, OSINT, and web exploitation — all deployed as a lightweight static site.",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "GitHub Pages"],
        highlights: [
            "Steg, audio, image, maze & pictionary challenge set",
            "Static site with custom domain (CNAME) on GitHub Pages",
            "Beginner-friendly tasks with OSINT and recon angles"
        ],
        screenshots: [
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1600&auto=format&fit=crop",
            img1,
            img2
        ],
        links: [
            { label: "Link", href: "https://sep.kritikpaudel.com.np/", icon: "Link" }
        ]
        },
      {
        id: "hotspot-dashboard",
        title: "Personal Hotspot Dashboard",
        subtitle: "Network Traffic Visualiser (Classroom Demo)",
        year: 2025,
        desc:
            "A live dashboard that lists connected devices on a personal hotspot and maps their destination IPs/domains (e.g., opening Instagram shows Instagram’s IP). Designed for classroom awareness—Blue Team visibility with Red Team/OSINT storytelling.",
        tags: ["Python", "Flask", "Scapy", "Tailwind"],
        highlights: [
            "Per-device destination mapping & live connection table",
            "OSINT tie-ins: reverse lookup, WHOIS, ASN context",
            "Export logs/CSV for after-class analysis",
            "Classroom-safe guardrails & demo mode"
        ],
        screenshots: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
            img3,
            img4
        ],
        links: [
            // Add real links when ready:
            // { label: "GitHub", href: "https://github.com/<your-repo>", icon: "github" },
            // { label: "Visit", href: "https://<demo-url>", icon: "site" }
        ]
      },
      {
        id: "portfolio-mini",
        title: "Personal Portfolio",
        subtitle: "kritikpaudel.com.np",
        year: 2025,
        desc:
          "Dark-tech theme, Lenis smooth scroll, Framer Motion reveals, accessible keyboard nav.",
        tags: ["React", "Vite", "Tailwind"],
        highlights: [
          "Preloader + route progress",
          "Reduced-motion support",
          "Micro-interactions",
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop",
        ],
        links: [
          { label: "Visit", href: "https://www.kritikpaudel.com.np", icon: "site" },
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      <DetailsModal
        project={projects.find((p) => p.id === openId) || null}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function Card({ project, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg ring-1 ring-black/5"
    >
      {/* Cover */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={project.screenshots[0]}
          alt=""
          loading="lazy"
          className="h-full w-full transform-gpu object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(1000px 200px at 50% 120%, rgba(99,102,241,0.25), transparent 60%)",
          }}
        />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Calendar className="h-3.5 w-3.5" />
          <span>{project.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white/95">{project.title}</h3>
        {project.subtitle && (
          <p className="mt-0.5 text-sm text-white/60">{project.subtitle}</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{project.desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-100 hover:bg-indigo-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            View details
          </button>
        </div>
      </div>

      {/* Hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-indigo-400/40" />
    </motion.article>
  );
}

/* ─────────────────────── Details Modal ─────────────────────── */

function DetailsModal({ project, onClose }) {
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef(null);

  // reset gallery on open
  useEffect(() => setIdx(0), [project]);

  // Close on Escape & handle arrows
  useEffect(() => {
    function onKey(e) {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIdx((i) => Math.min(i + 1, (project?.screenshots?.length || 1) - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  // Focus + lock scroll
  useEffect(() => {
    if (project && dialogRef.current) dialogRef.current.focus();
    if (project) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            tabIndex={-1}
            ref={dialogRef}
            className="relative z-10 m-3 w-full max-w-4xl rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Gallery */}
            <div className="relative aspect-[16/9] w-full bg-black/30">
              <img
                src={project.screenshots[idx]}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
              {/* Prev/Next */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
                <button
                  onClick={() => setIdx((i) => Math.max(i - 1, 0))}
                  disabled={idx === 0}
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 p-2 backdrop-blur-sm disabled:opacity-40"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setIdx((i) => Math.min(i + 1, project.screenshots.length - 1))
                  }
                  disabled={idx === project.screenshots.length - 1}
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 p-2 backdrop-blur-sm disabled:opacity-40"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto p-3">
              {project.screenshots.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setIdx(i)}
                  className={`h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg border transition ${
                    i === idx
                      ? "border-indigo-400/60"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  aria-label={`Go to screenshot ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                {project.subtitle && (
                  <p className="mt-1 text-sm text-white/70">
                    {project.subtitle}
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-white/80">
                  {project.desc}
                </p>

                {project.highlights?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-white/80">
                      Highlights
                    </h4>
                    <ul className="mt-2 grid list-disc gap-2 pl-5 text-sm text-white/70 sm:grid-cols-2">
                      {project.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="md:col-span-1">
                <h4 className="text-sm font-medium text-white/80">Tech</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.links?.length > 0 && (
                  <>
                    <h4 className="mt-5 text-sm font-medium text-white/80">
                      Links
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10"
                        >
                          {l.icon === "github" ? (
                            <Github className="h-4 w-4" />
                          ) : (
                            <ExternalLink className="h-4 w-4" />
                          )}
                          <span>{l.label}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
