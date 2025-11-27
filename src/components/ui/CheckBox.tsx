import { useState } from "react";

export default function CheckBox({
  label,
  checked,
  onChange,
  id,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  id: string;
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        onClick={toggle}
        className="
          peer relative h-4 w-4 shrink-0 rounded-sm border border-gray-300
          ring-offset-background
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          data-[state=checked]:bg-primary
          data-[state=checked]:text-primary-foreground
          flex items-center justify-center
        "
      >
        <svg
          className={`h-3 w-3 transition-opacity ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>

      <input
        aria-hidden="true"
        tabIndex={-1}
        type="checkbox"
        checked={isChecked}
        readOnly
        style={{
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          width: "16px",
          height: "16px",
        }}
      />

      <label
        htmlFor={id}
        onClick={toggle}
        className="text-sm text-gray-600 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
