import { Country, countryFlags, CountryResults } from "@/types";


interface CountryMatchesProps {
  countries: CountryResults[];
  activeCountry: number | null;
  setActiveCountry: (id: number | null) => void;
}

export default function CountryMatches({
  countries,
  activeCountry,
  setActiveCountry,
}: CountryMatchesProps) {
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap px-4">
      {countries.map((country) => {
        const isActive = country.id === activeCountry;

        // Безпечний доступ до прапора
        const flag =
          country.name in countryFlags
            ? countryFlags[country.name as Country]
            : "🌍";

        return (
          <button
            key={country.id}
            onClick={() => setActiveCountry(isActive ? null : country.id)}
            className={`
              flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300
              border 
              ${
                isActive
                  ? "bg-green-100 shadow-lg scale-105 border-green-200/50"
                  : "hover:bg-gray-100 border-transparent"
              }
            `}
          >
            <span className="text-2xl">{flag}</span>

            <div className="text-left">
              <div className="font-medium">{country.name}</div>
              <div
                className={`text-xs font-semibold ${
                  isActive ? "text-green-600" : "text-gray-500"
                }`}
              >
                {Math.round(country.percent)}%
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
