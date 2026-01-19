"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const isInvalid = props["aria-invalid"] === true

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        "w-full rounded-xl border bg-card px-3 py-2 text-sm font-medium",
        "field-sizing-content min-h-16",
        // Default border
        "border-border",
        // Focus state - purple border (no ring/shadow)
        "focus-visible:border-primary focus-visible:outline-none",
        // Error state - red border from globals.css destructive color (no ring/shadow)
        isInvalid && "border-destructive",
        // Text and placeholder
        "placeholder:text-muted-foreground",
        // Transitions
        "transition-all",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
