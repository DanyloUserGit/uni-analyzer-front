import { Profile, countries } from "@/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import DefaultSelect from "../ui/Select/DefaultSelect";

export default function GlobalGoals({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: (field: keyof Profile, value: string[]) => void;
}) {
  const [countryCount, setCountryCount] = useState(profile.targetCountries.length);
  const handleAddCountry = () => {
    setCountryCount(countryCount + 1);

    const updated = [...profile.targetCountries, ""];
    changeValue("targetCountries", updated);
  };

  const handleChangeCountry = (index: number, newValue: string) => {
    const updated = [...profile.targetCountries];
    updated[index] = newValue;
    changeValue("targetCountries", updated);
  };
  return (
    <div className="rounded-lg border bg-card text-card-foreground overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col space-y-1.5 p-6 border-b bg-white">
        <div className="font-semibold tracking-tight text-xl text-gray-900">
          Глобальні цілі
        </div>
        <div className="text-sm text-muted-foreground">
          Розкажіть про ваші довгострокові плани
        </div>
      </div>
      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Цільові країни
              </h3>
              <p className="text-sm text-gray-500">
                Оберіть країни, де ви хотіли б навчатися та працювати
              </p>
            </div>
            <Button onClick={handleAddCountry}>+ Додати країну</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(countryCount)].map((_, index) => {
              const selectedCountries = profile.targetCountries.filter(Boolean);

              const filteredOptions = countries
                .filter(
                  (m) =>
                    !selectedCountries.includes(m.value as string) ||
                    m.value === profile.targetCountries[index]
                )
                .map((m) => ({ value: m.value, label: m.label }));

              return (
                <DefaultSelect
                  key={index}
                  value={profile.targetCountries[index] || ""}
                  onChange={(val) => handleChangeCountry(index, val)}
                  placeholder="Оберіть країну"
                  label={""}
                  options={filteredOptions}
                />
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Бажані університети
            </h3>
            <p className="text-sm text-gray-500">
              Вкажіть 5 університетів вашої мрії
            </p>
          </div>
          <div className="space-y-3">
            <Input
              label=""
              placeholder="Університет мрії 1"
              value={profile?.dreamUniversities[0] || ""}
              onChange={(val) => {
                const updatedUniversities = [...profile.dreamUniversities];
                updatedUniversities[0] = val;
                changeValue("dreamUniversities", updatedUniversities);
              }}
            />
            <Input
              label=""
              placeholder="Університет мрії 2"
              value={profile?.dreamUniversities[1] || ""}
              onChange={(val) => {
                const updatedUniversities = [...profile.dreamUniversities];
                updatedUniversities[1] = val;
                changeValue("dreamUniversities", updatedUniversities);
              }}
            />
            <Input
              label=""
              placeholder="Університет мрії 3"
              value={profile?.dreamUniversities[2] || ""}
              onChange={(val) => {
                const updatedUniversities = [...profile.dreamUniversities];
                updatedUniversities[2] = val;
                changeValue("dreamUniversities", updatedUniversities);
              }}
            />
            <Input
              label=""
              placeholder="Університет мрії 4"
              value={profile?.dreamUniversities[3] || ""}
              onChange={(val) => {
                const updatedUniversities = [...profile.dreamUniversities];
                updatedUniversities[3] = val;
                changeValue("dreamUniversities", updatedUniversities);
              }}
            />
            <Input
              label=""
              placeholder="Університет мрії 5"
              value={profile?.dreamUniversities[4] || ""}
              onChange={(val) => {
                const updatedUniversities = [...profile.dreamUniversities];
                updatedUniversities[4] = val;
                changeValue("dreamUniversities", updatedUniversities);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
