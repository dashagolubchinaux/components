"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

function Item({ className, ...props }: ItemProps) {
  return (
    <div
      data-slot="item"
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-sans",
        "hover:bg-accent transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
        className
      )}
      {...props}
    />
  )
}

function ItemIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-icon"
      className={cn(
        "flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground",
        "[&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex-1 min-w-0", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-title"
      className={cn("font-medium truncate", className)}
      {...props}
    />
  )
}

function ItemDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-description"
      className={cn("text-xs text-muted-foreground truncate", className)}
      {...props}
    />
  )
}

function ItemAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-action"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemAction }

