import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-[1.5px] border-ink/15 bg-cream-paper px-4 py-3 text-[0.95rem] text-ink transition-all duration-200 placeholder:text-muted-foreground/70 focus-visible:border-clay focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-clay/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
