"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles for ALL badges
  "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 gap-1.5 [&>svg]:pointer-events-none transition-colors font-sans",
  {
    variants: {
      variant: {
        // Dark - near black background, white text
        dark: 
          "bg-foreground text-background rounded-md",
        // Outline - white/card background, light border
        outline: 
          "bg-card text-foreground border border-border rounded-md",
        // Destructive - red background, white text
        destructive: 
          "bg-destructive text-white rounded-md",
        // Secondary - secondary background, secondary foreground text, no border
        secondary: 
          "bg-secondary text-secondary-foreground rounded-md",
        // Primary - light purple filled background, white text
        primary: 
          "bg-[var(--badge-primary-filled)] text-[var(--badge-primary-text)] rounded-md",
        // Numeric - darker purple background, white text, circular shape
        numeric: 
          "bg-primary text-primary-foreground rounded-full",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider [&>svg]:size-2.5",
        sm: "px-2.5 py-1 text-xs font-semibold uppercase tracking-wide [&>svg]:size-3",
        default: "px-3 py-1.5 text-sm font-medium [&>svg]:size-4",
      },
      shape: {
        rounded: "rounded-md",
        circular: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "rounded",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { 
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "span"
  
  // Numeric variant is always circular, otherwise use provided shape or default to rounded
  const finalShape = shape || (variant === "numeric" ? "circular" : "rounded")

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape: finalShape }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }