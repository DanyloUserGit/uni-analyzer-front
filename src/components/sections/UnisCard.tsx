import { useState } from "react";
import { ProfileScores, UniResults } from "@/types";
import ResultsCard from "../ui/Results/ResultsCard";
import { UniversityCard } from "../ui/UniCard";
type FitColor = "green" | "yellow" | "red";

function getStatus(value: number): FitColor {
  if (value >= 75) return "green";
  if (value >= 45) return "yellow";
  return "red";
}

function mapUniToCardProps(item: UniResults) {
  const { university, matchScore, fits, financialAid } = item;

  return {
    flag: university.country,
    title: university.name,
    percent: `${Math.round(matchScore)}%`,
    maxAid: financialAid?.maxAid || undefined,

    statsLeft: [
      { label: "Екзамени", color: getStatus(fits.ExamsFit) },
      { label: "Бюджет", color: getStatus(fits.FinFit) },
      { label: "Академ.", color: getStatus(fits.AcadFit) },
    ],

    statsRight: [
      { label: "Позанавч.", color: getStatus(fits.ECFit) },
      { label: "Інт. Жив-ть", color: getStatus(fits.CountryFit) },
      { label: "Фін. допомога", color: getStatus(fits.IVFit) },
    ],
  };
}

export default function UnisCard({ profile }: { profile: ProfileScores }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ResultsCard>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Університети</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
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
            className={`lucide lucide-chevron-down w-4 h-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
          {expanded ? "Згорнути все" : "Розгорнути все"}
        </button>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0 px-4 md:px-0">
            <div className="min-w-[800px] md:min-w-0">
              <div className="grid grid-cols-3 gap-4">
                {/* DREAM */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold bg-red-100 text-red-800 inline-block px-3 py-1 rounded-full text-xs">
                    DREAM
                  </h3>
                  <div className="space-y-2 min-h-[400px]">
                    {profile?.scores?.universities
                      .filter((u) => u.classification === "Dream")
                      .map((u, index) => (
                        <UniversityCard
                          key={index}
                          variant="red"
                          expanded={expanded}
                          {...mapUniToCardProps(u)}
                        />
                      ))}
                  </div>
                </div>

                {/* TARGET */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold bg-purple-100 text-purple-800 inline-block px-3 py-1 rounded-full text-xs">
                    TARGET
                  </h3>
                  <div className="space-y-2 min-h-[400px]">
                    {profile?.scores?.universities
                      .filter((u) => u.classification === "Target")
                      .map((u, index) => (
                        <UniversityCard
                          key={index}
                          variant="purple"
                          expanded={expanded}
                          {...mapUniToCardProps(u)}
                        />
                      ))}
                  </div>
                </div>

                {/* SAFETY */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-xs">
                    SAFETY
                  </h3>
                  <div className="space-y-2 min-h-[400px]">
                    {profile?.scores?.universities
                      .filter((u) => u.classification === "Safety")
                      .map((u, index) => (
                        <UniversityCard
                          key={index}
                          variant="blue"
                          expanded={expanded}
                          {...mapUniToCardProps(u)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Блок з фінансовою допомогою */}
        <div
          className="mt-8 rounded-xl p-8 transition-all duration-300"
          style={{
            background:
              "linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(243, 244, 246) 100%)",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 4px 4px 10px, rgba(255, 255, 255, 0.9) -4px -4px 10px, rgba(255, 255, 255, 0.95) 1px 1px 1px inset",
          }}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Загальна Потенційна Фінансова Допомога
            </h3>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent text-5xl font-bold mb-2">
                $232&nbsp;000
              </div>

              <div className="text-gray-600">за 4 роки</div>

              <div className="mt-2 text-lg text-gray-700 font-medium">
                $58&nbsp;000{" "}
                <span className="text-gray-500 font-normal">
                  в середньому за рік
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            * Оцінки потенційної фінансової допомоги засновані на історичних
            даних та вашому профілі. Фактична сума може відрізнятись. Зверніться
            до фінансового відділу кожного університету для отримання докладну
            інформацію.
          </p>
        </div>
      </div>
    </ResultsCard>
  );
}
