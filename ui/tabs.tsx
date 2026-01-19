"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-secondary p-1 w-fit",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  variant = "text",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "text" | "icon"
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-lg transition-all outline-none font-sans",
        // Icon styling
        "[&_svg]:shrink-0",
        // Default state
        "text-muted-foreground",
        // Hover state
        "hover:text-foreground",
        // Selected state
        "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        // Focus state
        "focus-visible:ring-2 focus-visible:ring-primary/25",
        // Disabled state
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant styles
        variant === "text" && "px-4 py-2 text-sm font-medium",
        variant === "icon" && "p-2.5 [&_svg]:size-5",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }