"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// Color palette for avatar groups - using CSS variables for consistency
const avatarColors = [
  "bg-avatar-1",
  "bg-avatar-2",
  "bg-avatar-3",
  "bg-avatar-4",
  "bg-avatar-5",
  "bg-avatar-6",
  "bg-avatar-7",
  "bg-avatar-8",
]

function getAvatarColor(initials?: string, index?: number): string {
  if (typeof index === "number") {
    return avatarColors[index % avatarColors.length]
  }
  if (initials) {
    const charSum = initials.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return avatarColors[charSum % avatarColors.length]
  }
  return avatarColors[0]
}

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: "sm" | "default" | "lg"
  selected?: boolean
}

function Avatar({
  className,
  size = "default",
  selected = false,
  children,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full p-0.5 transition-all",
        "ring-2 ring-transparent",
        "hover:ring-primary/30",
        selected && "ring-primary",
      )}
    >
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-selected={selected}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full cursor-pointer transition-all",
          "group",
          size === "sm" && "size-8 text-xs",
          size === "default" && "size-10 text-sm",
          size === "lg" && "size-14 text-base",
          className
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    </div>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  colorIndex?: number
}

function AvatarFallback({
  className,
  children,
  colorIndex,
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full font-semibold font-sans text-white",
        "bg-primary transition-all",
        "group-hover:bg-primary/80",
        "[.group[data-selected=true]_&]:bg-primary/60",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarColors, getAvatarColor }