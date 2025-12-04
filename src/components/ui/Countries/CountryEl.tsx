import { Country, countryFlags, CountryResults } from "@/types";

interface CountryMapPreviewProps {
  country: CountryResults;
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

export default function CountryEl({ country }: CountryMapPreviewProps) {
  const flag =
    country.name in countryFlags ? countryFlags[country.name as Country] : "🌍";

  const fits: FitStatus[] = [
    { label: "Екзамени", status: getStatus(country.exams) },
    { label: "Бюджет", status: getStatus(country.budget) },
    { label: "Академічні", status: getStatus(country.academic) },
    { label: "Позанавчальні", status: getStatus(country.extracurricular) },
    { label: "Інт. Жив-ть", status: getStatus(country.iv) },
  ];

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm overflow-hidden relative">
      <div className="absolute -top-0 right-4">
        <span className="text-[11px] font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full shadow-sm border border-green-100">
          New
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{flag}</span>
            <div>
              <span className="font-semibold">{country.name}</span>
              <div className="text-sm text-gray-500">
                {country.name === "США"
                  ? "The USA"
                  : country.name === "Канада"
                  ? "Canada"
                  : "Europe"}
              </div>
            </div>
          </div>

          <div className="text-lg font-bold text-green-600">
            {Math.round(country.percent)}%
          </div>
        </div>

        <div className="space-y-3">
          {fits.map((fit, i) => (
            <FitRow key={i} label={fit.label} status={fit.status} />
          ))}
        </div>
      </div>
    </div>
  );
}

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
