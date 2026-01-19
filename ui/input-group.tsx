"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// InputGroup - Main wrapper component
function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex min-w-0 items-center rounded-xl border border-border bg-card font-sans transition-all",
        "has-[input:focus]:border-primary",
        "has-[textarea:focus]:border-primary",
        "[&:has([data-slot=input-group-control]:disabled)]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// InputGroupAddon - For icons, text, or buttons
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end"
}) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center gap-1.5 text-muted-foreground",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        align === "inline-start" && "order-first pl-3",
        align === "inline-end" && "order-last pr-3",
        align === "block-start" && "w-full justify-between border-b border-border px-3 py-2",
        align === "block-end" && "w-full justify-between border-t border-border px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

// InputGroupButton - Button inside input group
const inputGroupButtonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border bg-card hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-lg",
        sm: "h-8 px-3 rounded-lg",
        "icon-xs": "size-6 rounded-full",
        "icon-sm": "size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <button
      data-slot="input-group-button"
      type="button"
      className={cn(inputGroupButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// InputGroupText - For displaying text labels
function InputGroupText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("text-sm text-muted-foreground select-none", className)}
      {...props}
    />
  )
}

// InputGroupInput - Styled input for use within InputGroup
function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none",
        "min-w-0",
        className
      )}
      {...props}
    />
  )
}

// InputGroupTextarea - Styled textarea for use within InputGroup
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none resize-none min-h-[80px]",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
