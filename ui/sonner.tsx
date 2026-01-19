"use client"

import {
  CheckCircle,
  Info,
  Warning,
  XCircle,
  CircleNotch,
} from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle weight="fill" className="size-5 text-green-600" />,
        info: <Info weight="fill" className="size-5 text-primary" />,
        warning: <Warning weight="fill" className="size-5 text-yellow-600" />,
        error: <XCircle weight="fill" className="size-5 text-destructive" />,
        loading: <CircleNotch className="size-5 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:font-sans",
          title: "group-[.toast]:font-semibold group-[.toast]:text-foreground",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-lg group-[.toast]:font-medium",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }