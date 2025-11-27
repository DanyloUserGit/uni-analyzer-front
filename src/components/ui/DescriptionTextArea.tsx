"use client";

import React, { ReactNode } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
  showCount?: boolean;
  label?: ReactNode;
};

export default function DescriptionTextarea({
  value,
  onChange,
  placeholder = "Опишите детали вашей деятельности, достижения, влияние",
  rows = 6,
  maxLength,
  className = "",
  showCount = true,
  label,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="w-full">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={rows}
          maxLength={maxLength}
          className={`w-full h-24 px-3 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white resize-none ${className}`}
        />

        {showCount && (
          <div className="mt-1 text-xs text-gray-500 text-right">
            {maxLength
              ? `${value.length} / ${maxLength}`
              : `${value.length} символів`}
          </div>
        )}
      </div>
    </div>
  );
}
