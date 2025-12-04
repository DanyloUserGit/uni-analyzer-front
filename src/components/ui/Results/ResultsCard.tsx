import { ReactNode } from "react";

export default function ResultsCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative p-1">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50"></div>
        <div className="p-6 relative space-y-6 pt-6">{children}</div>
      </div>
    </div>
  );
}
