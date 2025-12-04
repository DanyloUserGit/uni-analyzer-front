export interface AcademicAward {
  id: number;
  title: string;
  subject: string;
  level: string;
  role: string;
}
export interface Extracurricular {
  id: number;
  title: string;
  context?: string;
  level: string;
  role: string;
}
export interface Grade {
  year: number;
  score: number;
}
export interface Profile {
  name: string;
  surname: string;
  citizenship: string;
  budget: number;
  targetMajors: string[];
  targetCountries: string[];
  dreamUniversities: string[];
  highSchool: string;
  gradeLevel: number;
  yearsOfStudy: number;
  gpa: Grade[];
  satScore: number | null;
  ieltsScore: number | null;
  isSatMock: boolean;
  isIeltsMock: boolean;
  academicAwards?: AcademicAward[] | [];
  extracurriculars?: Extracurricular[] | [];
}
export interface University {
  id?: string;
  name: string;
  country: string;
  city?: string;
  tuitionUSDPerYear?: number;
  acceptanceRatePct?: number;
  maxFinancialAidUSD?: number | null;
  fullGrantAvailable?: boolean;
  deadline1?: string;
  deadline2?: string;
  toeflMin?: number | null;
  ieltsMin?: number | null;
  satMidLower?: number | null;
  satMidUpper?: number | null;
  essayRequired?: boolean;
  recLettersRequired?: number | null;
  applicationFeeUSD?: number | null;
  platform?: string;
  countryRank?: number | null;
  worldRankQS?: number | null;
  programDifficulty?: "low" | "medium" | "high";
  typicalCOAFactor?: number;
}
export interface UniResults {
  university: University;
  fits: {
    AcadFit: number;
    ECFit: number;
    IVFit: number;
    ExamsFit: number;
    FinFit: number;
    CountryFit: number;
  };
  matchScore: number;
  rawMatchScore: number;
  classification: string;
  financialAid: {
    status: string;
    typicalRanges: string[];
    notes: string;
    maxAid: number;
  };
  coa: number;
}

export interface ProfileSummary {
  academic100: number;
  ec100: number;
  iv100: number;
  academicRating: number;
  extracurricularRating: number;
  intellectualVitalityRating: number;
  overallProfileScore: number;
}
export interface Scores {
  id: string;
  profileSummary: ProfileSummary;
  universities: UniResults[];
  countryMatches: Record<string, number>;
  profile: Profile;
}
export interface CountryResults {
  id: number;
  name: string;
  percent: number;
  exams: number;
  budget: number;
  academic: number;
  extracurricular: number;
  iv: number;
  profile: Profile;
}

export interface ProfileScores {
  id: string;
  name: string;
  surname: string;
  scores?: Scores;
  countries: CountryResults[];
  aiText: AITextInterface;
}
export interface Option {
  value: string;
  label: string;
}
export const majors: Option[] = [
  { value: "Computer Science", label: "💻 Computer Science" },
  { value: "Biology", label: "🧬 Biology" },
  { value: "Chemistry", label: "⚗️ Chemistry" },
  { value: "Physics", label: "🔭 Physics" },
  { value: "Mathematics", label: "🔢 Mathematics" },
  { value: "Engineering", label: "🛠️ Engineering" },
  { value: "Business Administration", label: "💼 Business Administration" },
  { value: "Economics", label: "📊 Economics" },
  { value: "Psychology", label: "🧠 Psychology" },
  { value: "Sociology", label: "👥 Sociology" },
  { value: "Political Science", label: "🏛️ Political Science" },
  { value: "History", label: "📜 History" },
  { value: "English Literature", label: "📚 English Literature" },
  { value: "Philosophy", label: "🤔 Philosophy" },
  { value: "Art", label: "🎨 Art" },
  { value: "Music", label: "🎵 Music" },
  { value: "Theater", label: "🎭 Theater" },
  { value: "Film Studies", label: "🎬 Film Studies" },
  { value: "Journalism", label: "📰 Journalism" },
  { value: "Communications", label: "🗣️ Communications" },
  { value: "Marketing", label: "📣 Marketing" },
  { value: "Accounting", label: "🧮 Accounting" },
  { value: "Finance", label: "💰 Finance" },
  { value: "Environmental Science", label: "🌿 Environmental Science" },
  { value: "Geology", label: "🪨 Geology" },
  { value: "Astronomy", label: "🌠 Astronomy" },
  { value: "Anthropology", label: "🦴 Anthropology" },
  { value: "Archaeology", label: "🏺 Archaeology" },
  { value: "Linguistics", label: "🗣️ Linguistics" },
  { value: "Education", label: "🍎 Education" },
  { value: "Nursing", label: "👩‍⚕️ Nursing" },
  { value: "Medicine", label: "🩺 Medicine" },
  { value: "Pharmacy", label: "💊 Pharmacy" },
  { value: "Dentistry", label: "🦷 Dentistry" },
  { value: "Veterinary Science", label: "🐾 Veterinary Science" },
  { value: "Agriculture", label: "🌾 Agriculture" },
  { value: "Nutrition", label: "🥗 Nutrition" },
  { value: "Architecture", label: "🏗️ Architecture" },
  { value: "Urban Planning", label: "🏙️ Urban Planning" },
  { value: "Law", label: "⚖️ Law" },
  { value: "Criminal Justice", label: "👮 Criminal Justice" },
  { value: "Social Work", label: "🤝 Social Work" },
  { value: "Public Health", label: "🏥 Public Health" },
  { value: "International Relations", label: "🌐 International Relations" },
  { value: "Hotel Management", label: "🏨 Hotel Management" },
  { value: "Tourism", label: "🧳 Tourism" },
  { value: "Sports Management", label: "⚽ Sports Management" },
  { value: "Fashion Design", label: "👗 Fashion Design" },
  { value: "Graphic Design", label: "🎨 Graphic Design" },
  { value: "Industrial Design", label: "🏭 Industrial Design" },
];
export const countries: Option[] = [
  { value: "США", label: "США" },
  { value: "Великобританія", label: "Великобританія" },
  { value: "Нідерланди", label: "Нідерланди" },
  { value: "Ірландія", label: "Ірландія" },
  { value: "Канада", label: "Канада" },
];
export type Country =
  | "США"
  | "Великобританія"
  | "Нідерланди"
  | "Ірландія"
  | "Канада";
export const countryFlags: Record<Country, string> = {
  США: "🇺🇸",
  Великобританія: "🇬🇧",
  Нідерланди: "🇳🇱",
  Ірландія: "🇮🇪",
  Канада: "🇨🇦",
};

export type ActionType = "Позанавчальна" | "Тести" | "Вступ" | "Дослідження";
export interface ActionItem {
  text: string;
  deadline: string;
  type: ActionType;
}
export interface ActionPlanItem {
  classNum: number;
  percent: number;
  isCurrent?: boolean;
  items: ActionItem[];
}
export const countryCapitals: Record<Country, { lat: number; lon: number }> = {
  США: { lat: 38.9072, lon: -77.0369 }, // Washington
  Канада: { lat: 45.4215, lon: -75.6972 }, // Ottawa
  Великобританія: { lat: 51.5072, lon: -0.1276 }, // London
  Нідерланди: { lat: 52.3676, lon: 4.9041 }, // Amsterdam
  Ірландія: { lat: 53.3498, lon: -6.2603 }, // Dublin
};
export interface StrongWeakSummary {
  strong: string[];
  weak: string[];
  summary: string;
}
export type PlanType = "Позанавчальна" | "Тести" | "Вступ" | "Дослідження";
export type DeadlineType = "Весна" | "Літо" | "Осінь" | "Зима";
export interface Plan {
  text: string;
  type: PlanType;
  deadline: string;
}
export interface ActionPlan {
  year: number;
  plan: Plan[];
  progress: number;
  isCurrent?: boolean;
}
export interface AITextInterface {
  id: number;
  academicText: string;
  extraCurricularText: string;
  intellectualVitalityText: string;
  strongWeakSummary: StrongWeakSummary;
  actionPlan: ActionPlan[];
}
