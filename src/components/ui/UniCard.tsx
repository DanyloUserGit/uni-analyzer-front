import React from "react";

type Variant = "red" | "purple" | "blue";

interface StatItem {
  color: "green" | "red" | "yellow";
  label: string;
}

interface UniversityCardProps {
  variant: Variant;
  flag: string;
  title: string;
  percent: string;
  isNew?: boolean;
  statsLeft: StatItem[];
  statsRight: StatItem[];
  maxAid?: number;
  expanded?: boolean;
}

const VARIANT_BG: Record<Variant, string> = {
  red: "from-red-900 to-red-800",
  purple: "from-purple-900 to-purple-800",
  blue: "from-blue-900 to-blue-800",
};

const DOT_COLORS: Record<string, string> = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

export const UniversityCard: React.FC<UniversityCardProps> = ({
  variant,
  flag,
  title,
  percent,
  isNew,
  statsLeft,
  statsRight,
  maxAid,
  expanded = false,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 
      ${
        expanded
          ? "h-[240px]"
          : "h-[96px] hover:h-[240px] hover:-translate-y-0.5"
      }
    `}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${VARIANT_BG[variant]} opacity-90`}
      />

      {/* Content */}
      <div className="relative p-4 text-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <span className="text-lg mt-0.5">{flag}</span>
            <span className="font-medium text-sm leading-tight line-clamp-3">
              {title}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
            <span className="font-semibold bg-white/10 px-2 py-1 rounded-md whitespace-nowrap">
              {percent}
            </span>

            {isNew && (
              <span className="text-[10px] font-medium bg-white/20 px-1.5 py-0.5 rounded-full border border-white/30 backdrop-blur-sm whitespace-nowrap">
                New
              </span>
            )}
          </div>
        </div>

        {/* Extra content */}
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-2 mt-4 transition-all duration-300
          ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
        >
          {/* Left column */}
          <div className="space-y-3">
            {statsLeft.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${DOT_COLORS[item.color]}
                  transition-transform duration-200
                  ${
                    expanded
                      ? "scale-110 shadow-md"
                      : "group-hover:scale-110 group-hover:shadow-md"
                  }
                `}
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 1px 1px 2px, rgba(255, 255, 255, 0.5) -1px -1px 2px",
                  }}
                ></div>
                <span className="text-xs text-white/90">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3">
            {statsRight.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${DOT_COLORS[item.color]}
                  transition-transform duration-200
                  ${
                    expanded
                      ? "scale-110 shadow-md"
                      : "group-hover:scale-110 group-hover:shadow-md"
                  }
                `}
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 1px 1px 2px, rgba(255, 255, 255, 0.5) -1px -1px 2px",
                  }}
                ></div>
                <span className="text-xs text-white/90">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Aid */}
          {maxAid && maxAid > 100 && (
            <div className="col-span-2 mt-2 border-t border-white/20 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/75">
                  Потенційна фін. допомога
                </span>
                <span className="font-semibold text-sm bg-white/10 px-2 py-1 rounded-md whitespace-nowrap">
                  {maxAid}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
