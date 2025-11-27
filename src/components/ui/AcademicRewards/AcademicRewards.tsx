"use client";

import { useEffect, useState } from "react";
import CardAcademicRewards from "./CardAcademicRewards";
import Button from "../Button";
import { Profile } from "@/types";

type Honor = {
  id: number;
  title: string;
  subject: string;
  level: string;
  role: string;
};

const gradients = [
  "linear-gradient(to right, rgb(239, 246, 255), rgb(224, 231, 255))",
  "linear-gradient(to right, rgb(250, 245, 255), rgb(243, 232, 255))",
  "linear-gradient(to right, rgb(240, 253, 244), rgb(220, 252, 231))",
  "linear-gradient(to right, rgb(255, 251, 235), rgb(254, 243, 199))",
  "linear-gradient(to right, rgb(255, 241, 242), rgb(254, 205, 211))",
];

export default function AcademicRewards({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}) {
  const addHonor = () => {
    changeValue("academicAwards", [
      ...profile.academicAwards,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title: "",
        subject: "",
        level: "City",
        role: "Participant",
      },
    ]);
  };

  const updateHonor = (id: number, field: keyof Honor, value: string) => {
    changeValue(
      "academicAwards",
      profile.academicAwards.map((honor) =>
        honor.id === id ? { ...honor, [field]: value } : honor
      )
    );
  };

  const deleteHonor = (id: number) => {
    changeValue(
      "academicAwards",
      profile.academicAwards.filter((h) => h.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Академические награды
          </h3>
          <p className="text-sm text-gray-500">
            Перечислите ваши академические достижения
          </p>
        </div>

        <Button onClick={addHonor}>+ Добавить награду</Button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {profile.academicAwards.map((honor, index) => {
          const gradient = gradients[index % gradients.length];

          return (
            <CardAcademicRewards
              key={honor.id}
              title={honor.title}
              subject={honor.subject}
              level={honor.level}
              role={honor.role}
              onTitleChange={(val) => updateHonor(honor.id, "title", val)}
              onSubjectChange={(val) => updateHonor(honor.id, "subject", val)}
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
