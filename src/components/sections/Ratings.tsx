import { ProfileScores } from "@/types";
import AcademicRatingCard from "../ui/Results/AcademicRatingCard";
import ExtracurricularRatingCard from "../ui/Results/ExtracurricularRatingCard";
import IntellectualVitalityRatingCard from "../ui/Results/IntellectualVitalityRatingCard";
import ResultsCard from "../ui/Results/ResultsCard";

export default function Ratings({ profile }: { profile: ProfileScores }) {
  return (
    <ResultsCard>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Оцінка профілю за рейтингами
        </h2>
        <div className="text-sm text-gray-500">Загальний бал</div>
        <div className="relative mt-3 flex justify-center items-baseline">
          <div className="text-6xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {profile?.scores?.profileSummary?.overallProfileScore}
          </div>
          <div className="ml-2 text-xl font-medium text-gray-400">/100</div>
        </div>
      </div>
      <div className="grid gap-6">
        <AcademicRatingCard
          progress={profile?.scores?.profileSummary?.academic100}
          scoreLabel={`Оцінка – ${profile?.scores?.profileSummary?.academicRating} / 6`}
          description={<>{profile?.aiText?.academicText.replaceAll("<strong>", "").replaceAll("</strong>", "")}</>}
        />
        <ExtracurricularRatingCard
          progress={
            profile?.scores?.profileSummary?.ec100 == 0
              ? 1
              : profile?.scores?.profileSummary?.ec100
          }
          scoreLabel={`Оцінка – ${
            profile?.scores?.profileSummary?.extracurricularRating == 0
              ? 1
              : profile?.scores?.profileSummary?.extracurricularRating
          } / 6`}
          description={<>{profile?.aiText?.extraCurricularText.replaceAll("<strong>", "").replaceAll("</strong>", "")}</>}
        />
        <IntellectualVitalityRatingCard
          progress={profile?.scores?.profileSummary?.iv100}
          scoreLabel={`Оцінка – ${profile?.scores?.profileSummary?.intellectualVitalityRating} / 6`}
          description={profile?.aiText?.intellectualVitalityText.replaceAll("<strong>", "").replaceAll("</strong>", "")}
        />
      </div>
    </ResultsCard>
  );
}
