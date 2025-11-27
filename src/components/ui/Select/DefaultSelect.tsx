import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Option } from "@/types";

export default function DefaultSelect({
  value,
  onChange,
  placeholder,
  label,
  required = true,
  options,
}: {
  value: string; // ← ТІЛЬКИ STRING
  onChange: (val: string) => void; // ← ТІЛЬКИ STRING
  placeholder: string;
  label: string;
  required?: boolean;
  options: Option[]; // їх value теж повинні бути string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => String(o.value) === value);

  const ref = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<any>({});

  // -------- позиціонування dropdown над усім --------
  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // -------- закриття при кліку поза селектом --------
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------------------------------------------------
  return (
    <div className="space-y-2 relative" ref={ref}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* BUTTON */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex h-10 w-full items-center justify-between
          rounded-md border border-input px-3 py-2 text-sm
          ring-offset-background placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          [&>span]:line-clamp-1 bg-white
        "
      >
        <span className="pointer-events-none">
          {selected ? (
            <span className="flex items-center gap-2">
              {selected.label.match(/^🇦|^🇺|^🇷|^🇰|^🇹/) ? (
                <>
                  <span className="text-lg">
                    {selected.label.split(" ")[0]}
                  </span>
                  <span>{selected.label.replace(/^[^\s]+/, "").trim()}</span>
                </>
              ) : (
                <span>{selected.label}</span>
              )}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {/* DROPDOWN — через портал */}
      {isOpen &&
        createPortal(
          <div
            style={dropdownStyle}
            className="
              rounded-md border border-input bg-white shadow-md
              py-1 max-h-52 overflow-auto
            "
          >
            {options.map((o) => {
              const isSelected = String(o.value) === value;

              return (
                <div
                  key={o.value}
                  onClick={() => {
                    onChange(String(o.value));
                    setIsOpen(false);
                  }}
                  className={`
                    cursor-pointer px-3 py-2 text-sm flex items-center gap-2
                    hover:bg-muted
                    ${isSelected ? "bg-muted" : ""}
                  `}
                >
                  <span>{o.label}</span>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
