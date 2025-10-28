import type React from "react"
import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "../app/app-components/theme-toggle"

const jost = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnonSend - Anonymous Money Transfer",
  description: "Send money anonymously with trust and security",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ThemeToggle /> 
        </ThemeProvider>
      </body>
    </html>
  )
}
