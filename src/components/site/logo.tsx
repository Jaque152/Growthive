import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "ink",
  wordmark = true,
}: {
  className?: string;
  variant?: "ink" | "cream";
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[7px] bg-clay shadow-[0_2px_0_0_var(--clay-deep)]">
        <span className="display -translate-x-[0.5px] text-[1.1rem] font-black leading-none text-cream-paper">
          G
        </span>
        <span className="absolute -right-[3px] -top-[3px] grid h-[15px] w-[15px] place-items-center rounded-full bg-ochre ring-2 ring-[var(--cream)]">
          <span className="ml-[1px] h-0 w-0 border-y-[2.5px] border-l-[4px] border-y-transparent border-l-ink" />
        </span>
      </span>
      {wordmark && (
        <span
          className={cn(
            "display text-[1.4rem] font-semibold leading-none tracking-tight",
            variant === "cream" ? "text-cream-paper" : "text-ink",
          )}
        >
          Grow<span className="italic text-clay">thive</span>
        </span>
      )}
    </span>
  );
}