import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NetworkProvider } from "@/lib/network-store"
import { NetworkShell } from "@/components/network-shell"
import "./globals.css"

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "4SightAI Network",
    template: "%s — 4SightAI",
  },
  description:
    "A trust-first network for people who ship AI. Feed, groups, learning, Guardian standing, and 4Sight Copilot.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <TooltipProvider>
          <NetworkProvider>
            <NetworkShell>{children}</NetworkShell>
          </NetworkProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
