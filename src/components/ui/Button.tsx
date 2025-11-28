import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string | null;
}) {
  return (
    <>
      {type === "submit" ? (
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 text-lg font-semibold bg-red-800 hover:bg-red-900 text-white shadow-lg hover:shadow-red-800/30 transition-all duration-300 border-b-[3px] border-red-900 active:border-b-0 active:mt-[3px] active:mb-[-3px] px-4 py-2 transform hover:scale-[1.02] active:scale-[0.98]"
          // type={type}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={disabled}
          className={
            className
              ? className
              : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-red-800 hover:bg-red-900 text-white shadow-lg hover:shadow-red-800/30 transition-all duration-300 border-b-[3px] border-red-900 active:border-b-0 active:mt-[3px] active:mb-[-3px] px-4 py-2"
          }
          // type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
}
