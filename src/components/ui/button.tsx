import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-clay text-cream-paper shadow-[0_3px_0_0_var(--clay-deep)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--clay-deep)]",
        secondary:
          "bg-ink text-cream-paper shadow-[0_3px_0_0_#000] hover:-translate-y-0.5 hover:bg-ink-2",
        cream:
          "bg-cream-paper text-ink shadow-[0_3px_0_0_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:bg-white",
        outline:
          "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-cream-paper",
        "outline-cream":
          "border-[1.5px] border-cream-paper/70 bg-transparent text-cream-paper hover:bg-cream-paper hover:text-ink",
        ghost: "text-ink hover:bg-sand",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "rounded-none normal-case tracking-normal text-clay underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-[0.72rem]",
        lg: "h-14 px-9 text-[0.82rem]",
        xl: "h-16 px-11 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
