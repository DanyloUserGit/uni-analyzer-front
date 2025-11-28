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

  const gradeSlots = [0, 1, 2, 3];

  const last4Grades = studyYears
    ? Array.from({ length: 4 }, (_, i) => studyYears - 3 + i)
    : [null, null, null, null];

  return (
    <>
      <div className="space-y-2">
        <Input
          value={profile.highSchool || ""}
          onChange={(val) => changeValue("highSchool", val)}
          label="Школа"
          placeholder="Введіть назву школи"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <DefaultSelect
          label="Клас"
          placeholder="Оберіть клас"
          value={selectedGrade ? String(selectedGrade) : ""}
          onChange={(val: string) => setSelectedGrade(Number(val))}
          options={[7, 8, 9, 10, 11, 12, 13].map((g) => ({
            label: `${g} клас`,
            value: g.toString(),
          }))}
        />

        <DefaultSelect
          label="Роки навчання"
          placeholder="Оберіть"
          value={studyYears ? String(studyYears) : ""}
          onChange={(val: string) => setStudyYears(Number(val))}
          options={[11, 12, 13].map((y) => ({
            label: `${y} років`,
            value: y.toString(),
          }))}
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Середній бал за класами
        </label>

        <div className="grid grid-cols-4 gap-4">
          {gradeSlots.map((slotIndex) => {
            const grade = last4Grades[slotIndex];

            const isDisabled =
              !selectedGrade || !grade || selectedGrade < grade;

            return (
              <GradesInput
                key={slotIndex}
                label={grade ? `${grade}-й клас` : ``}
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
