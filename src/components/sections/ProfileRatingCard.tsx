import { ProfileScores } from "@/types";
import ResultsCard from "../ui/Results/ResultsCard";
import StrongSidesCard from "../ui/Results/StrongSidesCard";
import WeakSidesCard from "../ui/Results/WeakSidesCard";

export default function ProfileRatingCard({
  profile,
}: {
  profile: ProfileScores;
}) {
  return (
    <ResultsCard>
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-1">
            Огляд профілю
          </h2>
        </div>

        <div className="relative px-8">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>

          <div
            className="relative h-2 bg-gray-100 rounded-full overflow-hidden"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 1px 1px 2px inset, rgba(255, 255, 255, 0.5) -1px -1px 2px inset",
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-900 via-amber-800 to-emerald-800 rounded-full"
              style={{
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.1) 2px 0px 4px",
              }}
            />

            <div
              className="absolute -top-2 transition-all duration-500"
              style={{
                left: `${profile?.scores?.profileSummary?.overallProfileScore}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 2px 2px 4px, rgba(255, 255, 255, 0.5) -1px -1px 2px",
                }}
              >
                <div className="w-4 h-4 rounded-full bg-blue-600" />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-br from-blue-900 to-blue-800"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 2px 2px 4px, rgba(255, 255, 255, 0.5) -1px -1px 2px",
              }}
            >
              Top {profile?.scores?.profileSummary?.overallProfileScore}-th
              Percentile
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Сильні Сторони
          </h3>
          <div className="space-y-2">
            {profile?.aiText.strongWeakSummary.strong.map((item) => (
              <StrongSidesCard text={item} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>Можна
            Покращити
          </h3>
          <div className="space-y-2">
            {profile?.aiText.strongWeakSummary.weak.map((item) => (
              <WeakSidesCard text={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg p-4 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800 opacity-90"></div>
        <p className="relative text-white/90 text-sm leading-relaxed">
          <span>
            {profile.aiText.strongWeakSummary.summary}
          </span>
        </p>
      </div>
    </ResultsCard>
  );
}
