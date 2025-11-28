import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "../app/app-components/theme-toggle"
import ToastProvider from "./app-components/ToastProvider"
import { QueryProvider } from "./app-components/QueryProvider"


export const metadata: Metadata = {
  title: "Prudens - Task Management Reimagined",
  description: "Organize, prioritize, and conquer your tasks effortlessly with Prudens.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <ToastProvider />
            {children}
            <ThemeToggle />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
