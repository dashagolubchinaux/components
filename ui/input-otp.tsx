"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Context for passing invalid state to slots
const InputOTPInvalidContext = React.createContext<boolean>(false)

function InputOTP({
  className,
  containerClassName,
  isInvalid = false,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
  isInvalid?: boolean
}) {
  return (
    <InputOTPInvalidContext.Provider value={isInvalid}>
      <OTPInput
        data-slot="input-otp"
        data-invalid={isInvalid}
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50 font-sans",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPInvalidContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const isInvalid = React.useContext(InputOTPInvalidContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots?.[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-invalid={isInvalid}
      className={cn(
        "border-border bg-card relative flex size-12 items-center justify-center border rounded-xl text-base font-medium transition-all",
        // Active state - purple border only (no ring/shadow)
        "data-[active=true]:border-primary",
        // Invalid state - red border
        "data-[invalid=true]:border-destructive",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-5 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="input-otp-message"
      className={cn("text-destructive text-sm font-sans", className)}
      {...props}
    >
      {children}
    </p>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon className="size-4 text-muted-foreground" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, InputOTPMessage }
