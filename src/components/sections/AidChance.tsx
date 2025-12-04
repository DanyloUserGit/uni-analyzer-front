import React from "react";

interface AidChanceProps {
  score: number; // 0–100
}

export const AidChance: React.FC<AidChanceProps> = ({ score }) => {
  const getActive = () => {
    if (score < 50) return "low";
    if (score < 85) return "mid";
    return "high";
  };

  const active = getActive();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative p-1">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />

        <div className="p-6 relative space-y-6">
          {/* Заголовок */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Шанс на фінансову допомогу
            </h2>
            <p className="text-sm text-gray-500">
              За вашим загальним балом: {score}/100
            </p>
          </div>

          {/* Три стани */}
          <div className="grid grid-cols-3 gap-4">
            {/* Низький */}
            <div
              className={`
                relative p-4 rounded-lg transition-all duration-300 overflow-hidden
                ${
                  active === "low"
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-105 shadow-lg"
                    : "opacity-50 scale-95"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-800 opacity-90" />

              <div className="relative text-center space-y-2">
                <div className="text-lg font-semibold text-red-100">
                  Низький
                </div>
                <div className="text-xs text-red-100 opacity-75">&lt; 50</div>

                {active === "low" && (
                  <div className="mt-2">
                    <div className="w-2 h-2 bg-white rounded-full mx-auto animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Середній */}
            <div
              className={`
                relative p-4 rounded-lg transition-all duration-300 overflow-hidden
                ${
                  active === "mid"
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-105 shadow-lg"
                    : "opacity-50 scale-95"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-800 opacity-90" />

              <div className="relative text-center space-y-2">
                <div className="text-lg font-semibold text-amber-100">
                  Середній
                </div>
                <div className="text-xs text-amber-100 opacity-75">50–84</div>
              </div>
            </div>

            {/* Високий */}
            <div
              className={`
                relative p-4 rounded-lg transition-all duration-300 overflow-hidden
                ${
                  active === "high"
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-105 shadow-lg"
                    : "opacity-50 scale-95"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-90" />

              <div className="relative text-center space-y-2">
                <div className="text-lg font-semibold text-emerald-100">
                  Високий
                </div>
                <div className="text-xs text-emerald-100 opacity-75">85+</div>
              </div>
            </div>
          </div>

          {/* Примітка */}
          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              * Оцінка базується на ваших академічних даних та профілі. Реальні
              можливості можуть відрізнятися залежно від конкретного
              університету та програми.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
