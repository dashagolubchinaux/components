"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

// Import spinner animation data directly to avoid extra HTTP request
import spinnerAnimation from "@/public/animations/spinner.json"

// Dynamically import Lottie to reduce initial bundle size
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
})

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /** Use simple CSS spinner instead of Lottie animation */
  simple?: boolean
}

const sizeMap = {
  xs: 24,
  sm: 36,
  default: 48,
  lg: 72,
  xl: 96,
}

const sizeTailwind = {
  xs: "h-4 w-4",
  sm: "h-6 w-6",
  default: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

function Spinner({
  className,
  size = "default",
  simple = false,
  ...props
}: SpinnerProps) {
  if (simple) {
    return (
      <div
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        {...props}
      >
        <svg
          className={cn("animate-spin text-primary", sizeTailwind[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Lottie
        animationData={spinnerAnimation}
        loop
        autoplay
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner }
