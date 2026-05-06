"use client"

import { ThemeProvider } from "@/components/theme-provider"

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
      themes={["dark", "light"]}
      value={{ dark: "dark", light: "light-mode" }}
    >
      {children}
    </ThemeProvider>
  )
}
