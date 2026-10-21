import { Geist, Geist_Mono, Manrope, Roboto } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Metadata, Viewport } from "next"

const robotoHeading = Roboto({ subsets: ["latin"], variable: "--font-heading" })

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  applicationName: "FYT",
  title: {
    default: "FYT — Find Your Tasks",
    template: "%s | FYT",
  },
  description: "Discover tasks, share your skills, and get work done with FYT.",
}

export const viewport: Viewport = {
  themeColor: "#059669",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        manrope.variable,
        robotoHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
