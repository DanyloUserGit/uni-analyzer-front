import { useState } from "react";
import { Profile, majors } from "@/types";
import Button from "../ui/Button";
import DefaultSelect from "../ui/Select/DefaultSelect";

export default function CareerProspects({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: (
    field: keyof Profile,
    value: string | number | string[]
  ) => void;
}) {

  const [majorCount, setMajorCount] = useState(profile.targetMajors.length);

  const handleAddMajor = () => {
    if (majorCount < 3) {
      setMajorCount(majorCount + 1);

      const updated = [...profile.targetMajors, ""];
      changeValue("targetMajors", updated);
    }
  };

  const handleChangeMajor = (index: number, newValue: string) => {
    const updated = [...profile.targetMajors];
    updated[index] = newValue;
    changeValue("targetMajors", updated);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground border-none shadow-md bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col space-y-1.5 p-6 border-b bg-white">
        <div className="font-semibold tracking-tight text-xl text-gray-900">
          Карьерные Цели
        </div>
        <div className="text-sm text-muted-foreground">
          Расскажите о ваших планах после университета
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Желаемые Специальности
              </h3>
              <p className="text-sm text-gray-500">
                Выберите до 3 специальностей, которые вас интересуют
              </p>
            </div>

            <Button disabled={majorCount >= 3} onClick={handleAddMajor}>
              + Добавить Специальность
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[...Array(majorCount)].map((_, index) => {
              const selectedMajors = profile.targetMajors.filter(Boolean);

              const filteredOptions = majors
                .filter(
                  (m) =>
                    !selectedMajors.includes(m.value as string) ||
                    m.value === profile.targetMajors[index]
                )
                .map((m) => ({ value: m.value, label: m.label }));

              return (
                <DefaultSelect
                  key={index}
                  value={profile.targetMajors[index] || ""}
                  onChange={(val) => handleChangeMajor(index, val)}
                  placeholder="Выберите специальность"
                  label={`Специальность ${index + 1}`}
                  options={filteredOptions}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
