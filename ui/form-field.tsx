import * as React from "react"
import { cn } from "@/lib/utils"

function FormField({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { FormField }