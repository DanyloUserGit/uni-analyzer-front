import { ActionPlan, ActionPlanItem, ActionType } from "@/types";
import React from "react";

interface ActionPlanProps {
  plan: ActionPlan[];
}

const typeColor: Record<ActionType, string> = {
  Позанавчальна: "text-green-600",
  Тести: "text-orange-600",
  Вступ: "text-red-600",
  Дослідження: "text-purple-600",
};

export const ActionPlanEl: React.FC<ActionPlanProps> = ({ plan }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">План дій</h2>
        </div>

        <div className="p-6">
          {plan.map((step) => (
            <div key={step.year} className="mb-16">
              {/* HEADER КЛАСУ */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                    ${
                      step.isCurrent
                        ? "bg-gradient-to-br from-indigo-500 to-indigo-600"
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-inner">
                      <span
                        className={`text-lg font-semibold ${
                          step.isCurrent ? "text-indigo-600" : "text-gray-600"
                        }`}
                      >
                        {step.year}
                      </span>
                    </div>
                  </div>

                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.year} клас
                    </h3>

                    {/* Поточний статус */}
                    {step.isCurrent && (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full mt-1">
                        Поточний
                      </span>
                    )}

                    {/* Прогрес */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${step.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {step.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ЛІНІЯ ТА НАБІР ACTION ITEMS */}
              <div className="relative ml-6 mb-12 last:mb-0">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100"></div>

                {step.plan.map((item, i) => (
                  <div key={i} className="relative mb-6 group">
                    <div className="absolute left-0 top-1/2 w-6 h-[2px] bg-gray-100"></div>

                    <div className="ml-10 relative">
                      <div
                        className="
                          p-4 rounded-lg border border-gray-200 bg-white 
                          hover:border-indigo-200 hover:shadow-sm hover:bg-gray-50/50
                          transition-all duration-300
                        "
                      >
                        <div className="space-y-1.5">
                          <p className="font-medium text-gray-900">
                            {item.text}
                          </p>

                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-500">
                              Строк:{" "}
                              <span className="font-medium text-gray-700">
                                {item.deadline}
                              </span>
                            </span>

                            <span
                              className={`font-medium ${typeColor[item.type]}`}
                            >
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -right-4 top-1/2 w-4 h-[2px] bg-gray-100"></div>
                      <div className="absolute right-0 top-1/2 w-[2px] h-[calc(100%+1.5rem)] bg-gray-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
