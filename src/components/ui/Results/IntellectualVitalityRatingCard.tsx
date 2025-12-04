import createDOMPurify from "isomorphic-dompurify";

interface IntellectualVitalityRatingCardProps {
  title?: string;
  scoreLabel?: string;
  progress?: number;
  description: string;
}

export default function IntellectualVitalityRatingCard({
  title = "Intellectual Vitality Rating",
  scoreLabel = "Оценка – 3 / 6",
  progress = 25,
  description,
}: IntellectualVitalityRatingCardProps) {
  const purify = createDOMPurify(global as any);
  const clean = purify.sanitize(String(description));
  return (
    <div
      className="group relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(243, 244, 246) 100%)",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 4px 4px 10px, rgba(255, 255, 255, 0.9) -4px -4px 10px, rgba(255, 255, 255, 0.95) 1px 1px 1px inset",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-orange-800 opacity-90" />

      <div className="relative space-y-4 text-white">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-xl">{title}</h3>
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 2px 2px 4px, rgba(255, 255, 255, 0.5) -1px -1px 2px",
              }}
            >
              {scoreLabel}
            </div>
          </div>
        </div>

        <div
          className="h-3 bg-black/20 rounded-full overflow-hidden relative backdrop-blur-sm"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.2) 1px 1px 3px inset, rgba(255, 255, 255, 0.1) -1px -1px 2px inset",
          }}
        >
          <div
            className="h-full bg-orange-400 transition-all duration-1000 ease-out rounded-full relative"
            style={{
              width: `${progress}%`,
              boxShadow:
                "rgba(255, 255, 255, 0.3) 0px 0px 10px, rgba(255, 255, 255, 0.5) 0px 0px 5px inset",
            }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
            style={{
              left: `${progress}%`,
              width: "100%",
            }}
          />
        </div>

        <p
          className="text-sm text-white/90"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </div>
    </div>
  );
}
