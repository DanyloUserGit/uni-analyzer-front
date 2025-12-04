export default function WeakSidesCard({ text }: { text: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-800 opacity-90"></div>
      <p className="relative text-white/90 text-sm sm:text-base break-words">
        <span>{text}</span>
      </p>
    </div>
  );
}
