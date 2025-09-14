import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from 'next/font/google'
import { AuthProvider } from "@/contexts/auth-context"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "Rainwater Harvesting App",
  description: "Estimate your rooftop rainwater harvesting potential",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={null}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
