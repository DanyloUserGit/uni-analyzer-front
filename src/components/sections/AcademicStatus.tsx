import { Grade, Profile } from "@/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { School } from "lucide-react";
import SchoolGrades from "./SchoolGrades";
import CheckBox from "../ui/CheckBox";
import AcademicRewards from "../ui/AcademicRewards/AcademicRewards";
import Extracurriculars from "../ui/Extracurriculars/Extracurriculars";

export default function AcademicStatus({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col space-y-1.5 p-6 border-b bg-white">
        <div className="font-semibold tracking-tight text-xl text-gray-900">
          Текущий Академический Статус
        </div>
        <div className="text-sm text-muted-foreground">
          Расскажите о вашей текущей успеваемости
        </div>
      </div>
      <div className="p-6 space-y-6">
        <SchoolGrades profile={profile} changeValue={changeValue} />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Балл SAT
              </label>
              <div className="flex items-center gap-4">
                <input
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white"
                  placeholder="e.g. 1500"
                  value={profile.satScore || ""}
                  type="number"
                  onChange={(e) =>
                    changeValue("satScore", Number(e.target.value))
                  }
                  name="satScore"
                />
                <CheckBox
                  id="satMock"
                  label="Пробный Тест"
                  checked={profile.isSatMock}
                  onChange={(val) => changeValue("isSatMock", val)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Балл IELTS
              </label>
              <div className="flex items-center gap-4">
                <input
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white"
                  placeholder="e.g. 7.5"
                  value={profile.ieltsScore || ""}
                  onChange={(e) =>
                    changeValue("ieltsScore", Number(e.target.value))
                  }
                />
                <CheckBox
                  id="isIeltsMock"
                  label="Пробный Тест"
                  checked={profile.isIeltsMock}
                  onChange={(val) => changeValue("isIeltsMock", val)}
                />
              </div>
            </div>
          </div>
        </div>
        <AcademicRewards profile={profile} changeValue={changeValue} />
        <Extracurriculars profile={profile} changeValue={changeValue} />
      </div>
    </div>
  );
}
