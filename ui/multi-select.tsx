"use client";

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { CaretDown } from "@phosphor-icons/react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const displayValue = selected.length > 0
    ? options.find((o) => selected.includes(o.value))?.label || placeholder
    : placeholder

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            // Base styles
            "flex w-fit items-center justify-between gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none",
            // Default border
            "border-border",
            // Hover state
            "hover:bg-secondary",
            // Focus/Open state - purple border
            "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15",
            open && "border-primary ring-[3px] ring-primary/15",
            // Height
            "h-11",
            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn(
            selected.length === 0 && "text-muted-foreground"
          )}>
            {displayValue}
          </span>
          {selected.length > 0 && (
            <Badge variant="numeric" size="xs">{selected.length}</Badge>
          )}
          <CaretDown className={cn(
            "size-4 text-foreground transition-transform",
            open && "rotate-180"
          )} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className={cn(
            "bg-card text-foreground z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border shadow-lg p-2",
            // Animations
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          )}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium cursor-pointer select-none",
                "hover:bg-secondary"
              )}
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              {option.label}
            </label>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { MultiSelect, type MultiSelectOption }