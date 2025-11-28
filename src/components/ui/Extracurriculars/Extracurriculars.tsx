"use client";

import { Extracurricular, Profile } from "@/types";
import Button from "../Button";
import CardExtracurriculars from "./CardExtracurriculars";

const gradients = [
  "linear-gradient(to right, rgb(236, 254, 255)",
  "linear-gradient(to right, rgb(245, 243, 255)",
  "linear-gradient(to right, rgb(236, 253, 245)",
  "linear-gradient(to right, rgb(255, 247, 237)",
  "linear-gradient(to right, rgb(253, 242, 248)",
];

export default function Extracurriculars({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}) {
  const addHonor = () => {
    changeValue("extracurriculars", [
      ...profile.extracurriculars,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title: "",
        context: "",
        level: "City",
        role: "Participant",
      },
    ]);
  };

  const updateHonor = (
    id: number,
    field: keyof Extracurricular,
    value: string
  ) => {
    changeValue(
      "extracurriculars",
      profile.extracurriculars.map((honor) =>
        honor.id === id ? { ...honor, [field]: value } : honor
      )
    );
  };

  const deleteHonor = (id: number) => {
    changeValue(
      "extracurriculars",
      profile.extracurriculars.filter((h) => h.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Позакласна діяльність
          </h3>
          <p className="text-sm text-gray-500">
            Розкажіть про ваші заняття поза навчанням
          </p>
        </div>
        <Button onClick={addHonor}>+ Додати діяльність</Button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {profile.extracurriculars.map((honor, index) => {
          const gradient = gradients[index % gradients.length];

          return (
            <CardExtracurriculars
              key={honor.id}
              title={honor.title}
              context={honor.context}
              level={honor.level}
              role={honor.role}
              onTitleChange={(val) => updateHonor(honor.id, "title", val)}
              onSubjectChange={(val) => updateHonor(honor.id, "context", val)}
              onLevelChange={(val) => updateHonor(honor.id, "level", val)}
              onPlaceChange={(val) => updateHonor(honor.id, "role", val)}
              onDelete={() => deleteHonor(honor.id)}
              style={{ background: gradient }}
            />
          );
        })}
      </div>
    </div>
  );
}
