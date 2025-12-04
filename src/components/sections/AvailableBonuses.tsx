import React from "react";

export const AvailableBonuses: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 pt-6">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Доступні бонуси
          </h2>
          <p className="text-gray-500 mt-2">
            Спеціально підібрані для вашого профілю
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="group perspective">
            <div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] rounded-xl">
              <div className="p-6 rounded-xl h-full bg-gradient-to-br from-slate-600 to-blue-800 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">⚖️</div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Юридична гарантія вступу
                    </h3>
                    <div className="text-white flex items-center gap-2">
                      <span className="line-through opacity-75">$500</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-white text-sm mb-6">
                    Юридичне зобов’язання: якщо не вступаєте — працюємо
                    безкоштовно ще рік. Такої гарантії немає ніде більше.
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-white">
                      {[
                        "Повне зняття ризиків",
                        "Юридичний договір",
                        "Безкоштовний рік при невступі",
                        "100% успіх минулого року",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckIcon />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <HoverOverlay />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group perspective">
            <div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] rounded-xl">
              <div className="p-6 rounded-xl h-full bg-gradient-to-br shadow-lg shadow-indigo-500/25 from-violet-500 to-purple-700">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">📈</div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Створення профілю для вступу
                    </h3>
                    <div className="text-white flex items-center gap-2">
                      <span className="line-through opacity-75">$300</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-white text-sm mb-6">
                    Програма розвитку профілю, розроблена студентами з Ліги
                    Плюща. 3 зустрічі для побудови вражаючого профілю.
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-white">
                      {[
                        "3 стратегічні зустрічі",
                        "Оформлення досягнень",
                        "Створення нових проєктів",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckIcon />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <HoverOverlay />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group perspective">
            <div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] rounded-xl">
              <div className="p-6 rounded-xl h-full bg-gradient-to-br from-rose-500 to-pink-700 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">🎯</div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Профорієнтація з експертом
                    </h3>
                    <div className="text-white flex items-center gap-2">
                      <span className="line-through opacity-75">$200</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-white text-sm mb-6">
                    Дві глибокі зустрічі + професійне тестування. Економить рік
                    життя та тисячі доларів на неправильній спеціальності.
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-white">
                      {[
                        "2 глибинні зустрічі",
                        "Професійне тестування",
                        "Аналіз сильних сторін",
                        "Підбір спеціальності",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckIcon />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <HoverOverlay />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="group perspective">
            <div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] rounded-xl">
              <div className="p-6 rounded-xl h-full bg-gradient-to-br from-indigo-500 to-blue-700 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">🎓</div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Підготовка до вступу
                    </h3>
                    <div className="text-white flex items-center gap-2">
                      <span className="line-through opacity-75">$1000</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-white text-sm mb-6">
                    Флагманська програма з відео-лекціями від менторів із
                    топ-вишів. Системна підготовка з доведеною ефективністю.
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-white">
                      {[
                        "Живі відео-лекції",
                        "Ментори з топ-вишів",
                        "Системна підготовка",
                        "40% вище шанс вступу",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckIcon />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <HoverOverlay />
            </div>
          </div>

          {/* CARD 5 */}
          <div className="group perspective">
            <div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] rounded-xl">
              <div className="p-6 rounded-xl h-full bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">📚</div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      SAT/IELTS на 2 місяці
                    </h3>
                    <div className="text-white flex items-center gap-2">
                      <span className="line-through opacity-75">$300</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-white text-sm mb-6">
                    3 заняття на тиждень у міні-групах. Викладачі, чиї студенти
                    набирають 1400+ SAT або 7.0+ IELTS.
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-white">
                      {[
                        "3 заняття на тиждень",
                        "Міні-групи",
                        "Досвідчені викладачі",
                        "20% знижка на продовження",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckIcon />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <HoverOverlay />
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div
          className="mt-8 rounded-xl p-8 transition-all duration-300"
          style={{
            background:
              "linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(243, 244, 246) 100%)",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 4px 4px 10px, rgba(255, 255, 255, 0.9) -4px -4px 10px, rgba(255, 255, 255, 0.95) 1px 1px 1px inset",
          }}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Загальна цінність бонусів
            </h3>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent text-5xl font-bold mb-2">
                $2 300
              </div>

              <div className="text-lg font-medium text-indigo-600">
                при покупці пакету PREP або ПС
              </div>

              <div className="mt-2 text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                всі бонуси надаються безкоштовно
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SMALL COMPONENTS --- */

const CheckIcon = () => (
  <svg
    className="w-4 h-4 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const HoverOverlay = () => (
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/5 to-black/20 transform-gpu transition-opacity duration-500 opacity-0 group-hover:opacity-100 [transform:translateZ(-1px)]"></div>
);
