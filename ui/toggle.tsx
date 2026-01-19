"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 rounded-lg font-sans font-medium transition-all outline-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Outline - bordered
        outline: cn(
          "border border-border bg-card text-muted-foreground",
          "hover:bg-secondary hover:text-foreground",
          "data-[state=on]:border-primary data-[state=on]:text-foreground data-[state=on]:[&_svg]:text-primary",
          "focus-visible:ring-2 focus-visible:ring-primary/25"
        ),
        // Ghost - minimal
        ghost: cn(
          "bg-transparent text-muted-foreground",
          "hover:bg-secondary hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground data-[state=on]:[&_svg]:text-primary",
          "focus-visible:ring-2 focus-visible:ring-primary/25"
        ),
      },
      size: {
        sm: "h-8 px-2 text-xs [&_svg]:size-4",
        default: "h-10 px-3 text-sm [&_svg]:size-4",
        lg: "h-12 px-4 text-sm [&_svg]:size-5",
        // Icon only sizes
        "icon-sm": "size-8 [&_svg]:size-4",
        "icon-default": "size-10 [&_svg]:size-4",
        "icon-lg": "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }