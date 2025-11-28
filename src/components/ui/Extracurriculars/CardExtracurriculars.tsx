"use client";

import Input from "@/components/ui/Input";
import Button from "../Button";
import DescriptionTextarea from "../DescriptionTextArea";
import DefaultSelect from "../Select/DefaultSelect";

type Option = {
  label: string;
  value: string;
};

type CardExtracurriculars = {
  title: string;
  context?: string;
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

export default function CardExtracurriculars({
  background = "bg-gradient-to-r from-blue-50 to-indigo-50",
  title,
  context,
  level,
  role,
  style,
  onTitleChange,
  onSubjectChange,
  onLevelChange,
  onPlaceChange,
  onDelete,
}: CardExtracurriculars) {
  const levelOptions: Option[] = [
    { label: "Шкільний", value: "School" },
    { label: "Міський", value: "City" },
    { label: "Регіональний", value: "Region" },
    { label: "Національний", value: "National" },
    { label: "Міжнародний", value: "International" },
  ];

  const roleOptions: Option[] = [
    { label: "Учасник", value: "Participant" },
    { label: "Один з лідерів", value: "OneOfTheLeaders" },
    { label: "Засновник / Ініціатор", value: "Founder" },
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
          label="Назва діяльності"
          placeholder="наприклад, Президент Шкільної Ради"
          value={title}
          onChange={onTitleChange}
        />
        <DescriptionTextarea
          label={
            <>
              Контекст <span className="text-gray-400 text-xs">(необов’язково)</span>
            </>
          }
          placeholder="наприклад, Математика"
          value={context || ""}
          onChange={onSubjectChange}
          showCount={false}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DefaultSelect
          label="Рівень діяльності"
          placeholder="Обери"
          value={level}
          onChange={onLevelChange}
          options={levelOptions}
        />

        <DefaultSelect
          label="Роль"
          placeholder="Обери"
          value={role}
          onChange={onPlaceChange}
          options={roleOptions}
        />
      </div>
    </div>
  );
}
