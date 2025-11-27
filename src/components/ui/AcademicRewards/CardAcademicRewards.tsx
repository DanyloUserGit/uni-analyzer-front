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
    { label: "Школьный", value: "School" },
    { label: "Городской", value: "City" },
    { label: "Региональный", value: "Region" },
    { label: "Национальный", value: "National" },
    { label: "Международный", value: "International" },
  ];

  const roleOptions: Option[] = [
    { label: "Участник", value: "Participant" },
    { label: "Бронза", value: "Bronze" },
    { label: "Серебро", value: "Silver" },
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
          label="Название награды"
          placeholder="например, Золотая медаль по математике"
          value={title}
          onChange={onTitleChange}
        />
        <Input
          label="Предметная область"
          placeholder="например, Математика"
          value={subject}
          onChange={onSubjectChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DefaultSelect
          label="Уровень соревнования"
          placeholder="Выбери"
          value={level}
          onChange={onLevelChange}
          options={levelOptions}
        />

        <DefaultSelect
          label="Уровень достижения"
          placeholder="Выбери"
          value={role}
          onChange={onPlaceChange}
          options={roleOptions}
        />
      </div>
    </div>
  );
}
