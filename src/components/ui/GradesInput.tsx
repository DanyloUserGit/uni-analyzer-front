import Input from "./Input";

export default function GradesInput({
  value,
  onChange,
  disabled = false,
  label,
}: {
  value: string;
  onChange: (val: number) => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <>
      {disabled ? (
        <div className="space-y-2 opacity-50">
          <label
            className={
              disabled ? "text-xs text-gray-400" : "text-xs text-gray-600"
            }
          >
            {label}
          </label>
          <input
            className={
              disabled
                ? "flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-50"
                : "flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white"
            }
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="N/A"
            type="number"
          />
        </div>
      ) : (
        <Input
          value={value}
          onChange={(val) => onChange(Number(val))}
          type="number"
          placeholder={""}
          label={label}
        />
      )}
    </>
  );
}
