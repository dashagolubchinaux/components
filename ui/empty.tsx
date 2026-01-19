"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Package, MagnifyingGlass, FolderSimple, FileX, Image, Users, Bell, Calendar } from "@phosphor-icons/react"

// Pre-defined icon options
const emptyIcons = {
  package: Package,
  search: MagnifyingGlass,
  folder: FolderSimple,
  file: FileX,
  image: Image,
  users: Users,
  notifications: Bell,
  calendar: Calendar,
} as const

type EmptyIconType = keyof typeof emptyIcons

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: EmptyIconType | React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
}

function Empty({
  icon = "package",
  title,
  description,
  children,
  className,
  ...props
}: EmptyProps) {
  const IconComponent = typeof icon === "string" ? (emptyIcons[icon as keyof typeof emptyIcons] || null) : null

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className="mb-6">
        {typeof icon === "string" && IconComponent ? (
          <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
            <IconComponent className="size-8 text-muted-foreground" />
          </div>
        ) : (
          icon
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold font-heading mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground text-sm max-w-md mb-6">{description}</p>
      )}

      {/* Actions */}
      {children && (
        <div className="flex flex-col items-center gap-4">
          {children}
        </div>
      )}
    </div>
  )
}

function EmptyActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-3", className)}
      {...props}
    />
  )
}

function EmptyLink({
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

export { Empty, EmptyActions, EmptyLink, emptyIcons }
export type { EmptyIconType }

