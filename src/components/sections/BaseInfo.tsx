import { Profile } from "@/types";
import Input from "../ui/Input";
import DefaultSelect from "../ui/Select/DefaultSelect";

export default function BaseInfo({
  profile,
  changeValue,
}: {
  profile: Profile;
  changeValue: (field: keyof Profile, value: string | number) => void;
}) {
  const countries = [
    { value: "UA", label: "🇺🇦 Ukraine" },
    { value: "TR", label: "🇹🇷 Turkey" },
    { value: "KZ", label: "🇰🇿 Kazakhstan" },
    { value: "PL", label: "🇵🇱 Poland" },
    { value: "MD", label: "🇲🇩 Moldova" },
  ];
  return (
    <div className="rounded-lg border bg-card text-card-foreground  border-none shadow-md bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col space-y-1.5 p-6 border-b bg-white">
        <div className="font-semibold tracking-tight text-xl text-gray-900">
          Базовая Информация
        </div>
        <div className="text-sm text-muted-foreground">Расскажите о себе</div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Input
            value={profile?.name || ""}
            onChange={(val) => changeValue("name", val)}
            label="Имя"
            placeholder="Иван"
          />
          <Input
            value={profile.surname || ""}
            onChange={(val) => changeValue("surname", val)}
            label="Фамилия"
            placeholder="Иванов"
          />
        </div>
        <DefaultSelect
          value={profile.citizenship || ""}
          onChange={(val) => changeValue("citizenship", String(val))}
          placeholder="Гражданство"
          label="Гражданство"
          options={countries}
        />

        <Input
          value={profile?.budget || ""}
          onChange={(val) => changeValue("budget", Number(val))}
          label="Годовой Бюджет (USD)"
          placeholder="e.g. 50000"
          type="number"
        />
      </div>
    </div>
  );
}
