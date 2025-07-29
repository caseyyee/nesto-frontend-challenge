import { Heading } from "./Heading";
import clsx from "clsx";

interface BestProductCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export function BestProductCard({
  title,
  children,
  className,
  startIcon,
  endIcon,
}: BestProductCardProps) {
  return (
    <div
      className={clsx(
        "w-full bg-navy-blue p-1 rounded-3xl flex flex-col gap-1 shadow-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 text-white p-2">
        {startIcon && <span>{startIcon}</span>}
        <Heading level={2} variant="body" className="font-bold uppercase">
          {title}
        </Heading>
        {endIcon && <span>{endIcon}</span>}
      </div>
      <div className="rounded-3xl border overflow-hidden">{children}</div>
    </div>
  );
}
