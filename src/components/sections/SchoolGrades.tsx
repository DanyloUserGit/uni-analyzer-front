import { Grade, Profile } from "@/types";
import Input from "../ui/Input";
import GradesInput from "../ui/GradesInput";
import DefaultSelect from "../ui/Select/DefaultSelect";
import { useState } from "react";

export default function SchoolGrades({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: (field: keyof Profile, value: string | number | Grade[]) => void;
}) {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [studyYears, setStudyYears] = useState<number | null>(null);

  // 4 слоти під оцінки (незалежно від виборів)
  const gradeSlots = [0, 1, 2, 3];

  // Класи для цих 4 слотів
  const last4Grades = studyYears
    ? Array.from({ length: 4 }, (_, i) => studyYears - 3 + i)
    : [null, null, null, null]; // Показуємо пусті поля до вибору

  return (
    <>
      <div className="space-y-2">
        <Input
          value={profile.highSchool || ""}
          onChange={(val) => changeValue("highSchool", val)}
          label="Школа"
          placeholder="Введите название школы"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <DefaultSelect
          label="Класс"
          placeholder="Выберите класс"
          value={selectedGrade ? String(selectedGrade) : ""}
          onChange={(val: string) => setSelectedGrade(Number(val))}
          options={[7, 8, 9, 10, 11, 12, 13].map((g) => ({
            label: `${g} класс`,
            value: g.toString(),
          }))}
        />

        <DefaultSelect
          label="Годы обучения"
          placeholder="Выберите"
          value={studyYears ? String(studyYears) : ""}
          onChange={(val: string) => setStudyYears(Number(val))}
          options={[11, 12, 13].map((y) => ({
            label: `${y} лет`,
            value: y.toString(),
          }))}
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Средний балл по классам
        </label>

        <div className="grid grid-cols-4 gap-4">
          {gradeSlots.map((slotIndex) => {
            const grade = last4Grades[slotIndex];

            const isDisabled =
              !selectedGrade || !grade || selectedGrade < grade;

            return (
              <GradesInput
                key={slotIndex}
                label={grade ? `${grade}-й класс` : ``}
                value={
                  !isDisabled && profile.gpa[slotIndex]?.score
                    ? String(profile.gpa[slotIndex].score)
                    : ""
                }
                disabled={isDisabled}
                onChange={(val) => {
                  if (isDisabled) return;

                  const newGpa = [...profile.gpa];
                  newGpa[slotIndex] = {
                    year: grade!,
                    score: val,
                  };
                  changeValue("gpa", newGpa);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
