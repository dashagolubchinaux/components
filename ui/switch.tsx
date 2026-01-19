"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styles
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border shadow-xs transition-all outline-none",
        // Unchecked state - white background with border
        "data-[state=unchecked]:bg-white data-[state=unchecked]:border-border",
        // Checked state - no border
        "data-[state=checked]:border-transparent",
        // Checked state - primary color from globals.css
        "data-[state=checked]:bg-primary",
        // Focus state
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base styles
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          // Thumb background - gray when unchecked, white when checked
          "data-[state=unchecked]:bg-muted-foreground/40 data-[state=checked]:bg-background",
          // Checked state - thumb moves right
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          // Unchecked state - thumb at left
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
