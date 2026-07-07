"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-ink group-[.toaster]:text-cream-paper group-[.toaster]:border-ink-2 group-[.toaster]:rounded-2xl group-[.toaster]:shadow-2xl group-[.toaster]:font-sans",
          title: "group-[.toast]:font-mono group-[.toast]:uppercase group-[.toast]:tracking-[0.12em] group-[.toast]:text-[0.72rem] group-[.toast]:text-cream-paper",
          description: "group-[.toast]:text-cream-paper/70 group-[.toast]:text-[0.85rem] group-[.toast]:font-sans group-[.toast]:normal-case group-[.toast]:tracking-normal",
          actionButton:
            "group-[.toast]:bg-clay group-[.toast]:text-cream-paper group-[.toast]:rounded-full group-[.toast]:font-mono group-[.toast]:uppercase group-[.toast]:text-[0.68rem] group-[.toast]:tracking-[0.1em]",
          cancelButton:
            "group-[.toast]:bg-ink-2 group-[.toast]:text-cream-paper/70",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
