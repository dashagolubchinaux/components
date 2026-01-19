import * as React from "react"
import { cn } from "@/lib/utils"

interface FormDescriptionProps extends React.ComponentProps<"p"> {
  icon?: React.ReactNode
  variant?: "default" | "error"
}

function FormDescription({
  className,
  icon,
  variant = "default",
  children,
  ...props
}: FormDescriptionProps) {
  return (
    <p
      data-slot="form-description"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs",
        variant === "default" && "text-muted-foreground",
        variant === "error" && "text-destructive",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:size-3.5">{icon}</span>
      )}
      {children}
    </p>
  )
}

export { FormDescription }