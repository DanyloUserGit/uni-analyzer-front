"use client";

import { useGlobe } from "@/hooks/useGlobe";
import { countries, Country, countryFlags, CountryResults } from "@/types";
import { useMemo, useState } from "react";

interface CountryMapPreviewProps {
  country?: CountryResults | null;
  countries: CountryResults[];
  setActiveCountryId:(s:number | null)=>void;
  activeCountryId:number | null;
}

type FitStatus = {
  label: string;
  status: "good" | "warning" | "bad";
};

function getStatus(value: number): FitStatus["status"] {
  if (value >= 75) return "good";
  if (value >= 45) return "warning";
  return "bad";
}

export default function CountryCanvas({
  country,
  countries,
  activeCountryId,
  setActiveCountryId,
}: CountryMapPreviewProps) {

  const canvasRef = useGlobe({
    countries,
    setActiveCountry: setActiveCountryId,
    activeCountry: activeCountryId
  });

  const flag =
    country && country.name in countryFlags
      ? countryFlags[country.name as Country]
      : "🌍";

  const fits: FitStatus[] = country
    ? [
        { label: "Екзамени", status: getStatus(country.exams) },
        { label: "Бюджет", status: getStatus(country.budget) },
        { label: "Академічні", status: getStatus(country.academic) },
        { label: "Позанавчальні", status: getStatus(country.extracurricular) },
        { label: "Інт. Жив-ть", status: getStatus(country.iv) },
      ]
    : [];

  return (
    <div className="relative w-full h-[700px] bg-gray-900/5 rounded-2xl overflow-hidden">
      {/* CANVAS BACKGROUND */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "auto",
          touchAction: "none",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <canvas
            ref={canvasRef}
            width={998}
            height={875}
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* ACTIVE COUNTRY CARD */}
      <div
        className={`
          absolute  ${country?.name === "США" || country?.name === "Канада" ? "top-1/3 left-[75%]" : "top-1/4 left-[78%]"} transform -translate-x-1/2
          transition-all duration-500
          ${
            activeCountryId
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        {country && (
          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg w-[320px] border border-gray-200/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{flag}</span>
              <div>
                <h3 className="font-semibold text-lg">{country.name}</h3>
                <span className="text-sm text-gray-500">
                  {country.name === "США"
                    ? "The USA"
                    : country.name === "Канада"
                    ? "Canada"
                    : "Europe"}
                </span>
              </div>
            </div>

            <div className="text-green-600 font-semibold text-base mb-4">
              Match: {Math.round(country.percent)}%
            </div>

            <div className="space-y-2.5 text-sm">
              {fits.map((fit, i) => (
                <FitRow key={i} label={fit.label} status={fit.status} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      <div
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-500
          ${
            !activeCountryId
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center border border-gray-200/50 w-[320px]">
          <div className="text-4xl mb-4">🌍</div>
          <div className="text-lg font-medium text-gray-800">
            Нажмите на любую страну сверху, чтобы начать
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==== STATUS ROW ==== */

function FitRow({ label, status }: FitStatus) {
  const color =
    status === "good"
      ? "bg-green-500 shadow-green-500/50"
      : status === "warning"
      ? "bg-yellow-500 shadow-yellow-500/50"
      : "bg-red-500 shadow-red-500/50";

  return (
    <div className="flex items-center justify-between bg-gray-50/80 p-2 rounded-lg">
      <span className="text-gray-700">{label}</span>
      <div className={`w-3 h-3 rounded-full shadow-sm ${color}`} />
    </div>
  );
}
