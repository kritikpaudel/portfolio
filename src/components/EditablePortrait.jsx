import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * EditablePortrait
 * - Static portrait with gradient halo + glass container
 * - Optional "Change photo" button for live previewing another image
 *
 * Props:
 *   src: string (required)      – initial image URL/import
 *   alt: string                 – alt text
 *   editable: boolean | "dev" | "debug"
 *       false  (default)        – never show button
 *       true                    – always show button
 *       "dev"                   – show only in dev (npm run dev)
 *       "debug"                 – show only when URL has ?debug=1
 *   className: string           – extra classes for wrapper
 */
export default function EditablePortrait({
  src,
  alt = "Portrait",
  editable = false,
  className = "",
}) {
  const [preview, setPreview] = useState(src);
  const fileRef = useRef(null);
  const tmpUrlRef = useRef(null);

  // control when the button is visible
  const showButton = useMemo(() => {
    if (editable === true) return true;
    if (editable === "dev") return import.meta.env.DEV;
    if (editable === "debug")
      return typeof window !== "undefined" && window.location.search.includes("debug=1");
    return false;
  }, [editable]);

  // keep preview in sync if src prop changes
  useEffect(() => setPreview(src), [src]);

  // revoke temp object URLs on unmount / reselect
  useEffect(() => {
    return () => {
      if (tmpUrlRef.current) URL.revokeObjectURL(tmpUrlRef.current);
    };
  }, []);

  function onPick() {
    fileRef.current?.click();
  }

  function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (tmpUrlRef.current) URL.revokeObjectURL(tmpUrlRef.current);
    const url = URL.createObjectURL(file);
    tmpUrlRef.current = url;
    setPreview(url);
  }

  return (
    <div className={`relative ${className}`}>
      {/* gradient halo border */}
      <div className="p-[1px] rounded-3xl bg-gradient-to-br from-[var(--primary)]/40 to-[var(--accent)]/40">
        {/* glass container */}
        <div className="glass rounded-3xl overflow-hidden">
          <motion.img
            src={preview}
            alt={alt}
            className="w-full h-[280px] md:h-[340px] object-cover"
            initial={{ scale: 1.02 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
        </div>
      </div>

      {showButton && (
        <button
          type="button"
          onClick={onPick}
          className="absolute bottom-3 right-3 btn text-xs"
        >
          Change photo
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
