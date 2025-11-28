"use client";

import Input from "@/components/ui/Input";
import Button from "../Button";
import DefaultSelect from "../Select/DefaultSelect";

type Option = {
  label: string;
  value: string;
};

type CardAcademicRewardsProps = {
  title: string;
  subject: string;
  level: string;
  role: string;

  onTitleChange: (val: string) => void;
  onSubjectChange: (val: string) => void;
  onLevelChange: (val: string) => void;
  onPlaceChange: (val: string) => void;
  onDelete: () => void;

  background?: string;
  style?: React.CSSProperties;
};

export default function CardAcademicRewards({
  background = "bg-gradient-to-r from-blue-50 to-indigo-50",
  title,
  subject,
  level,
  role,
  style,
  onTitleChange,
  onSubjectChange,
  onLevelChange,
  onPlaceChange,
  onDelete,
}: CardAcademicRewardsProps) {
  const levelOptions: Option[] = [
    { label: "Шкільний", value: "School" },
    { label: "Міський", value: "City" },
    { label: "Регіональний", value: "Region" },
    { label: "Національний", value: "National" },
    { label: "Міжнародний", value: "International" },
  ];

  const roleOptions: Option[] = [
    { label: "Учасник", value: "Participant" },
    { label: "Бронза", value: "Bronze" },
    { label: "Срібло", value: "Silver" },
    { label: "Золото", value: "Gold" },
  ];

  return (
    <div
      style={style}
      className={`relative p-4 rounded-lg border border-gray-100 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md ${background}`}
    >
      <Button
        onClick={onDelete}
        className="absolute top-2 right-2 py-[2px] px-[6px] rounded-full bg-white/50 hover:bg-white/80"
      >
        ✕
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Назва нагороди"
          placeholder="наприклад, Золота медаль з математики"
          value={title}
          onChange={onTitleChange}
        />
        <Input
          label="Предметна область"
          placeholder="наприклад, Математика"
          value={subject}
          onChange={onSubjectChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DefaultSelect
          label="Рівень змагання"
          placeholder="Обери"
          value={level}
          onChange={onLevelChange}
          options={levelOptions}
        />

        <DefaultSelect
          label="Рівень досягнення"
          placeholder="Обери"
          value={role}
          onChange={onPlaceChange}
          options={roleOptions}
        />
      </div>
    </div>
  );
}
