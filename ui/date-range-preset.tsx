"use client"

import * as React from "react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths, startOfYear, endOfYear } from "date-fns"
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

type PresetOption = {
  label: string
  value: string
  getRange: () => { from: Date; to: Date }
}

const presets: PresetOption[] = [
  {
    label: "This week",
    value: "this_week",
    getRange: () => ({
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: endOfWeek(new Date(), { weekStartsOn: 1 }),
    }),
  },
  {
    label: "Last week",
    value: "last_week",
    getRange: () => ({
      from: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      to: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    }),
  },
  {
    label: "This month",
    value: "this_month",
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last month",
    value: "last_month",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: "Last 3 months",
    value: "last_3_months",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 3)),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "This year",
    value: "this_year",
    getRange: () => ({
      from: startOfYear(new Date()),
      to: endOfYear(new Date()),
    }),
  },
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface DateRangePresetProps {
  value?: { from: Date | undefined; to: Date | undefined }
  onValueChange?: (value: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  className?: string
}

function DateRangePreset({
  value,
  onValueChange,
  placeholder = "Select date range",
  className,
}: DateRangePresetProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null)
  const [year, setYear] = React.useState(new Date().getFullYear())
  
  // For month range selection
  const [rangeStart, setRangeStart] = React.useState<{ month: number; year: number } | null>(null)
  const [rangeEnd, setRangeEnd] = React.useState<{ month: number; year: number } | null>(null)
  
  // For editable inputs
  const [startInputValue, setStartInputValue] = React.useState("")
  const [endInputValue, setEndInputValue] = React.useState("")

  // Sync input values when range changes from month picker
  React.useEffect(() => {
    if (rangeStart) {
      setStartInputValue(`${rangeStart.month + 1} / ${rangeStart.year}`)
    }
    if (rangeEnd) {
      setEndInputValue(`${rangeEnd.month + 1} / ${rangeEnd.year}`)
    }
  }, [rangeStart, rangeEnd])

  const parseMonthYear = (input: string): { month: number; year: number } | null => {
    const match = input.match(/^(\d{1,2})\s*\/\s*(\d{4})$/)
    if (match) {
      const month = parseInt(match[1], 10) - 1
      const year = parseInt(match[2], 10)
      if (month >= 0 && month <= 11 && year >= 1900 && year <= 2100) {
        return { month, year }
      }
    }
    return null
  }

  const handleStartInputChange = (input: string) => {
    setStartInputValue(input)
    const parsed = parseMonthYear(input)
    if (parsed) {
      setRangeStart(parsed)
      const from = new Date(parsed.year, parsed.month, 1)
      if (rangeEnd) {
        const to = endOfMonth(new Date(rangeEnd.year, rangeEnd.month, 1))
        onValueChange?.({ from, to })
      } else {
        onValueChange?.({ from, to: endOfMonth(from) })
      }
    }
  }

  const handleEndInputChange = (input: string) => {
    setEndInputValue(input)
    const parsed = parseMonthYear(input)
    if (parsed) {
      setRangeEnd(parsed)
      if (rangeStart) {
        const from = new Date(rangeStart.year, rangeStart.month, 1)
        const to = endOfMonth(new Date(parsed.year, parsed.month, 1))
        onValueChange?.({ from, to })
      }
    }
  }

  const handlePresetSelect = (preset: PresetOption) => {
    const range = preset.getRange()
    onValueChange?.(range)
    setSelectedPreset(preset.value)
    setRangeStart(null)
    setRangeEnd(null)
    setOpen(false)
  }

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedPreset("custom")
    
    if (!rangeStart || (rangeStart && rangeEnd)) {
      // Start new selection
      setRangeStart({ month: monthIndex, year })
      setRangeEnd(null)
      const from = new Date(year, monthIndex, 1)
      const to = endOfMonth(from)
      onValueChange?.({ from, to })
    } else {
      // Complete the range
      const startDate = new Date(rangeStart.year, rangeStart.month, 1)
      const endDate = new Date(year, monthIndex, 1)
      
      // Ensure from is before to
      if (endDate < startDate) {
        setRangeStart({ month: monthIndex, year })
        setRangeEnd({ month: rangeStart.month, year: rangeStart.year })
        onValueChange?.({
          from: new Date(year, monthIndex, 1),
          to: endOfMonth(new Date(rangeStart.year, rangeStart.month, 1))
        })
      } else {
        setRangeEnd({ month: monthIndex, year })
        onValueChange?.({
          from: startDate,
          to: endOfMonth(endDate)
        })
      }
    }
  }

  const isMonthInRange = (monthIndex: number) => {
    if (!rangeStart) return false
    
    const currentDate = new Date(year, monthIndex, 1)
    const startDate = new Date(rangeStart.year, rangeStart.month, 1)
    
    if (!rangeEnd) {
      return rangeStart.year === year && rangeStart.month === monthIndex
    }
    
    const endDate = new Date(rangeEnd.year, rangeEnd.month, 1)
    return currentDate >= startDate && currentDate <= endDate
  }

  const isRangeStart = (monthIndex: number) => {
    return rangeStart?.year === year && rangeStart?.month === monthIndex
  }

  const isRangeEnd = (monthIndex: number) => {
    return rangeEnd?.year === year && rangeEnd?.month === monthIndex
  }

  const formatDateRange = () => {
    if (!value?.from) return placeholder
    if (!value.to) return format(value.from, "MMM d, yyyy")
    
    // Check if it's a full month range
    const fromMonth = format(value.from, "MMM")
    const toMonth = format(value.to, "MMM")
    const fromYear = format(value.from, "yyyy")
    const toYear = format(value.to, "yyyy")
    
    if (fromMonth === toMonth && fromYear === toYear) {
      return `${fromMonth} 1 - ${format(value.to, "MMM d, yyyy")}`
    }
    
    return `${fromMonth} 1, ${fromYear} - ${toMonth} ${format(value.to, "d")}, ${toYear}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-card",
            !value?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarBlank className="mr-2 size-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex font-sans">
          {/* Presets sidebar */}
          <div className="border-r border-border p-2">
            <div className="flex flex-col gap-0.5">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    "text-left px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap",
                    "hover:bg-muted",
                    selectedPreset === preset.value && "bg-badge-primary-filled text-badge-primary-text font-medium"
                  )}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedPreset("custom")
                  setRangeStart(null)
                  setRangeEnd(null)
                  setStartInputValue("")
                  setEndInputValue("")
                }}
                className={cn(
                  "text-left px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap",
                  "hover:bg-muted",
                  selectedPreset === "custom" && "bg-badge-primary-filled text-badge-primary-text font-medium"
                )}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Month picker */}
          <div className="p-4">
            {/* Year selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">{year}</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setYear(year - 1)}
                >
                  <CaretLeft className="size-4" weight="bold" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setYear(year + 1)}
                >
                  <CaretRight className="size-4" weight="bold" />
                </Button>
              </div>
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const inRange = isMonthInRange(index)
                const isStart = isRangeStart(index)
                const isEnd = isRangeEnd(index)
                const isSingleSelected = isStart && !rangeEnd
                const isSelected = inRange || isStart || isEnd
                
                return (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className={cn(
                      "px-4 py-2 text-sm transition-colors",
                      // Default state - hover only when not selected
                      !isSelected && "hover:bg-muted rounded-full",
                      // In range but not start/end
                      inRange && !isStart && !isEnd && "bg-badge-primary-filled/50 rounded-none",
                      // Range start
                      isStart && rangeEnd && "bg-primary text-primary-foreground rounded-l-full rounded-r-none",
                      // Range end
                      isEnd && "bg-primary text-primary-foreground rounded-r-full rounded-l-none",
                      // Single month selected
                      isSingleSelected && "bg-primary text-primary-foreground rounded-full"
                    )}
                  >
                    {month}
                  </button>
                )
              })}
            </div>

            {/* Custom date inputs */}
            {selectedPreset === "custom" && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="M / YYYY"
                    value={startInputValue}
                    onChange={(e) => handleStartInputChange(e.target.value)}
                    className="text-center text-sm"
                  />
                  <Input
                    placeholder="M / YYYY"
                    value={endInputValue}
                    onChange={(e) => handleEndInputChange(e.target.value)}
                    className="text-center text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePreset }

