import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, Copy } from "lucide-react";

const EMAIL_TO = "kritikpaudel16@gmail.com"; // <-- change if needed
const MIN_MSG = 10;
const MAX_MSG = 1000;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [touched, setTouched] = useState({});

  const honeypotRef = useRef(null);

  const errors = {
    name: !name.trim() ? "Please enter your name." : "",
    email: !/^\S+@\S+\.\S+$/.test(email) ? "Enter a valid email address." : "",
    subject: !subject.trim() ? "Please enter a subject." : "",
    message:
      message.trim().length < MIN_MSG
        ? `Please write at least ${MIN_MSG} characters.`
        : message.length > MAX_MSG
        ? `Keep it under ${MAX_MSG} characters.`
        : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypotRef.current?.value) return;

    setTouched({ name: true, email: true, subject: true, message: true });
    if (hasErrors) return;

    setBusy(true);

    const body =
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

    try {
      await navigator.clipboard.writeText(body);
      showToast("Message copied to clipboard.");
    } catch { /* no-op */ }

    const mailto =
      `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailto;
      setBusy(false);
      showToast("Opening your email app…");
    }, 600);
  }

  return (
    <div className="glass p-5 md:p-6 lg:p-8">
      <h4 className="text-lg md:text-xl lg:text-2xl">Send a message</h4>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
        <input ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            className={`w-full rounded-xl bg-[var(--surface)]/80 border px-3 py-2 outline-none transition
              ${touched.name && errors.name ? "border-red-400/50" : "border-white/10 focus:border-white/20"}
              focus:ring-2 focus:ring-[var(--ring)]`}
            placeholder="Your full name"
          />
          {touched.name && errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`w-full rounded-xl bg-[var(--surface)]/80 border px-3 py-2 outline-none transition
              ${touched.email && errors.email ? "border-red-400/50" : "border-white/10 focus:border-white/20"}
              focus:ring-2 focus:ring-[var(--ring)]`}
            placeholder="you@example.com"
          />
          {touched.email && errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
        </div>

        {/* Subject (required now) */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
            className={`w-full rounded-xl bg-[var(--surface)]/80 border px-3 py-2 outline-none transition
              ${touched.subject && errors.subject ? "border-red-400/50" : "border-white/10 focus:border-white/20"}
              focus:ring-2 focus:ring-[var(--ring)]`}
            placeholder="Project inquiry, feedback, etc."
          />
          {touched.subject && errors.subject && <p className="mt-1 text-xs text-red-300">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Message</label>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              rows={6}
              maxLength={MAX_MSG}
              className={`w-full rounded-xl bg-[var(--surface)]/80 border px-3 py-2 pr-12 outline-none transition resize-y
                ${touched.message && errors.message ? "border-red-400/50" : "border-white/10 focus:border-white/20"}
                focus:ring-2 focus:ring-[var(--ring)]`}
              placeholder="Tell me a bit about your project or question…"
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-500 select-none">
              {message.length}/{MAX_MSG}
            </span>
          </div>
          {touched.message && errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={busy} className="btn disabled:opacity-60 disabled:cursor-not-allowed">
            {busy ? (<><Loader2 className="animate-spin" size={16} />Sending…</>) : (<><Send size={16} />Send message</>)}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 hover:border-white/20 transition"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`);
                showToast("Copied to clipboard.");
              } catch { showToast("Copy failed."); }
            }}
          >
            <Copy size={16} />
            Copy text
          </button>
        </div>
      </form>

      {/* Toast */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={toast ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-6 z-50"
        aria-live="polite"
      >
        {toast && (
          <div className="glass px-4 py-2 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} />
            {toast}
          </div>
        )}
      </motion.div>
    </div>
  );
}
