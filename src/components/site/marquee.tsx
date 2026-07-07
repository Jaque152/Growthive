import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  duration = 26,
  gap = "2.5rem",
  className,
  pauseOnHover = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  gap?: string;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden",
        pauseOnHover && "pause-on-hover",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
        style={
          {
            gap,
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
