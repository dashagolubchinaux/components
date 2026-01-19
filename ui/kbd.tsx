"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-foreground rounded-lg border border-border",
        outline:
          "rounded-lg border border-border text-foreground",
        ghost:
          "text-foreground/70",
        primary:
          "bg-primary/10 text-primary rounded-lg border border-primary/20",
      },
      size: {
        default: "h-6 min-w-6 px-2 py-1 text-[11px]",
        sm: "h-5 min-w-5 px-1.5 py-0.5 text-[10px]",
        lg: "h-7 min-w-7 px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** The key or keys to display (can be a string or array of strings) */
  keys?: string | string[]
  /** Separator between multiple keys */
  separator?: React.ReactNode
}

function Kbd({
  className,
  variant,
  size,
  keys,
  separator,
  children,
  ...props
}: KbdProps) {
  // Convert modifier keys to symbols
  const formatKey = (key: string) => {
    const keyMap: Record<string, string> = {
      command: "⌘",
      cmd: "⌘",
      ctrl: "⌃",
      control: "⌃",
      alt: "⌥",
      option: "⌥",
      opt: "⌥",
      shift: "⇧",
      enter: "↵",
      return: "↵",
      backspace: "⌫",
      delete: "⌦",
      escape: "⎋",
      esc: "⎋",
      tab: "⇥",
      capslock: "⇪",
      space: "␣",
      up: "↑",
      down: "↓",
      left: "←",
      right: "→",
      pageup: "⇞",
      pagedown: "⇟",
      home: "⇱",
      end: "⇲",
    }
    
    const lowerKey = key.toLowerCase()
    return keyMap[lowerKey] || key.toUpperCase()
  }

  // If keys prop is provided, render them
  if (keys) {
    const keyArray = Array.isArray(keys) ? keys : [keys]
    const defaultSeparator = <span className="text-muted-foreground/60 mx-0.5">+</span>
    
    return (
      <span className="inline-flex items-center gap-0.5" data-slot="kbd-group">
        {keyArray.map((key, index) => (
          <React.Fragment key={index}>
            <kbd
              data-slot="kbd"
              className={cn(kbdVariants({ variant, size, className }))}
              {...props}
            >
              {formatKey(key)}
            </kbd>
            {index < keyArray.length - 1 && (separator ?? defaultSeparator)}
          </React.Fragment>
        ))}
      </span>
    )
  }

  // Otherwise, render children
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </kbd>
  )
}

export { Kbd, kbdVariants }

