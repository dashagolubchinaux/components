"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const buttonGroupVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      attached: {
        true: "",
        false: "gap-1",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        attached: true,
        className: "[&>[data-slot=button]:not(:first-child):not(:last-child)]:rounded-none [&>[data-slot=button]:first-child]:rounded-r-none [&>[data-slot=button]:last-child]:rounded-l-none [&>[data-slot=button]:not(:first-child)]:border-l-0 [&>[data-slot=button]:not(:first-child)]:-ml-px",
      },
      {
        orientation: "vertical",
        attached: true,
        className: "[&>[data-slot=button]:not(:first-child):not(:last-child)]:rounded-none [&>[data-slot=button]:first-child]:rounded-b-none [&>[data-slot=button]:last-child]:rounded-t-none [&>[data-slot=button]:not(:first-child)]:border-t-0 [&>[data-slot=button]:not(:first-child)]:-mt-px [&>[data-slot=button]]:w-full",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
  }
)

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  /** The variant to apply to all buttons in the group */
  variant?: VariantProps<typeof buttonVariants>["variant"]
  /** The size to apply to all buttons in the group */
  size?: VariantProps<typeof buttonVariants>["size"]
}

function ButtonGroup({
  className,
  orientation,
  attached,
  variant,
  size,
  children,
  ...props
}: ButtonGroupProps) {
  // Clone children and pass variant/size props if they're Button components
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Button) {
      const childProps = child.props as { variant?: string; size?: string }
      return React.cloneElement(child as React.ReactElement<{ variant?: string; size?: string }>, {
        variant: (childProps.variant || variant) as string | undefined,
        size: (childProps.size || size) as string | undefined,
      })
    }
    return child
  })

  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(buttonGroupVariants({ orientation, attached, className }))}
      {...props}
    >
      {clonedChildren}
    </div>
  )
}

/** 
 * A unified container for split buttons with a separator inside.
 * Use this when you need a single bordered container with two actions separated by a divider.
 */
function ButtonGroupSplit({
  className,
  children,
  variant = "outline",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "outline" | "primary" | "secondary"
}) {
  return (
    <div
      data-slot="button-group-split"
      role="group"
      className={cn(
        "inline-flex items-center rounded-xl overflow-hidden",
        variant === "outline" && "border border-border bg-background",
        variant === "primary" && "bg-primary",
        variant === "secondary" && "bg-secondary border border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ButtonGroupSplitItem({
  className,
  variant = "outline",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "primary" | "secondary"
}) {
  return (
    <button
      data-slot="button-group-split-item"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        variant === "outline" && "hover:bg-accent hover:text-accent-foreground text-foreground",
        variant === "primary" && "text-primary-foreground hover:bg-primary/90",
        variant === "secondary" && "text-secondary-foreground hover:bg-secondary/80",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSplitSeparator({
  className,
  variant = "outline",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "outline" | "primary" | "secondary"
}) {
  return (
    <div
      data-slot="button-group-split-separator"
      className={cn(
        "w-px h-5 shrink-0",
        variant === "outline" && "bg-border",
        variant === "primary" && "bg-primary-foreground/30",
        variant === "secondary" && "bg-border",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="button-group-separator"
      className={cn(
        "bg-border shrink-0",
        orientation === "vertical" ? "w-px h-6 mx-1" : "h-px w-6 my-1",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupInput({
  className,
  size,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "default" | "lg"
}) {
  const inputSize = size || "default"
  return (
    <input
      data-slot="button-group-input"
      data-size={inputSize}
      className={cn(
        "flex border border-border bg-background px-3 text-sm font-sans",
        "placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:z-10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Size variants matching button sizes
        inputSize === "sm" && "h-8 text-sm",
        inputSize === "default" && "h-9 text-sm",
        inputSize === "lg" && "h-12 text-base px-4",
        // Border radius handling
        "[div[data-slot=button-group]_&:not(:first-child):not(:last-child)]:rounded-none",
        "[div[data-slot=button-group]_&:first-child]:rounded-l-xl [div[data-slot=button-group]_&:first-child]:rounded-r-none",
        "[div[data-slot=button-group]_&:last-child]:rounded-r-xl [div[data-slot=button-group]_&:last-child]:rounded-l-none",
        "[div[data-slot=button-group]_&:not(:first-child)]:-ml-px",
        className
      )}
      {...props}
    />
  )
}

export { 
  ButtonGroup, 
  ButtonGroupSeparator, 
  ButtonGroupInput, 
  ButtonGroupSplit,
  ButtonGroupSplitItem,
  ButtonGroupSplitSeparator,
  buttonGroupVariants 
}

