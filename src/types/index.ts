export interface AcademicAward {
  id:number;
  title: string;
  subject: string;
  level: string;
  role: string;
}
export interface Extracurricular {
  id:number;
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
  academicAwards?: AcademicAward[];
  extracurriculars?: Extracurricular[];
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
  { value: "US", label: "🇺🇸 United States" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "KR", label: "🇰🇷 South Korea" },
  { value: "CN", label: "🇨🇳 China" },
  { value: "SG", label: "🇸🇬 Singapore" },
  { value: "TR", label: "🇹🇷 Turkey" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "IT", label: "🇮🇹 Italy" },
  { value: "ES", label: "🇪🇸 Spain" },
  { value: "NL", label: "🇳🇱 Netherlands" },
  { value: "CH", label: "🇨🇭 Switzerland" },
  { value: "SE", label: "🇸🇪 Sweden" },
  { value: "DK", label: "🇩🇰 Denmark" },
  { value: "NO", label: "🇳🇴 Norway" },
  { value: "FI", label: "🇫🇮 Finland" },
  { value: "IE", label: "🇮🇪 Ireland" },
  { value: "AT", label: "🇦🇹 Austria" },
  { value: "BE", label: "🇧🇪 Belgium" },
  { value: "PT", label: "🇵🇹 Portugal" },
  { value: "GR", label: "🇬🇷 Greece" },
  { value: "PL", label: "🇵🇱 Poland" },
  { value: "CZ", label: "🇨🇿 Czech Republic" },
  { value: "HU", label: "🇭🇺 Hungary" },
];
