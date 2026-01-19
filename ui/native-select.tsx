"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-border px-3 py-2 text-sm font-sans font-medium",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "appearance-none pr-10",
          className
        )}
        style={{
          backgroundColor: "white",
          backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M213.66%2C101.66l-80%2C80a8%2C8%2C0%2C0%2C1-11.32%2C0l-80-80A8%2C8%2C0%2C0%2C1%2C53.66%2C90.34L128%2C164.69l74.34-74.35a8%2C8%2C0%2C0%2C1%2C11.32%2C11.32Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')`,
          backgroundSize: "16px",
          backgroundPosition: "right 12px center",
          backgroundRepeat: "no-repeat",
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }

