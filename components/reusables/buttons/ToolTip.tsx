import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}
export const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-2 left-[calc(100%+2px)] z-1000 w-100 py-2 px-5  scale-0 overflow-visible whitespace-nowrap  transition-all rounded bg-gray-800 p-2 text-xs text-primary-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};
