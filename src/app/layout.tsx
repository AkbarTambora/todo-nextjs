import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { SessionProviderWrapper } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "TodoApp Modern - Kelola Tugasmu dengan Mudah",
  description: "Aplikasi todo modern dengan gamifikasi, streak, dan leaderboard untuk meningkatkan produktivitas harian Anda.",
  keywords: ["todo", "task management", "productivity", "gamification"],
  authors: [{ name: "Your Name" }],
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className={`${poppins.className} antialiased bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen`}>
        <SessionProviderWrapper>
          {children}
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}