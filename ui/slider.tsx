"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

function SliderThumb({
  index,
  value,
  min,
  showTooltip,
}: {
  index: number
  value: number
  min: number
  showTooltip: boolean
}) {
  const hasValue = value > min

  const thumb = (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-4 shrink-0 rounded-full border shadow-sm transition-all",
        "bg-card",
        hasValue ? "border-primary/60" : "border-muted-foreground/20",
        "hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  )

  if (showTooltip && hasValue) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {thumb}
        </TooltipTrigger>
        <TooltipContent side="top">
          {value}
        </TooltipContent>
      </Tooltip>
    )
  }

  return <React.Fragment key={index}>{thumb}</React.Fragment>
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showTooltip = true,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  showTooltip?: boolean
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full transition-colors"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderThumb
          key={index}
          index={index}
          value={_values[index]}
          min={min}
          showTooltip={showTooltip}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
