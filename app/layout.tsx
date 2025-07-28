import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RESUME_DATA } from "@/lib/resume-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - ${RESUME_DATA.profession}`,
  description: RESUME_DATA.about,
  metadataBase: new URL("https://salik-portfolio-ide.vercel.app/"), 
  openGraph: {
    title: `${RESUME_DATA.name} - ${RESUME_DATA.profession}`,
    description: RESUME_DATA.about,
    url: "https://salik-portfolio-ide.vercel.app/", 
    siteName: `${RESUME_DATA.name}'s Portfolio`,
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200", // Placeholder for social preview image
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name}'s Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - ${RESUME_DATA.profession}`,
    description: RESUME_DATA.about,
    images: ["/placeholder.svg?height=630&width=1200"], // Placeholder for social preview image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
