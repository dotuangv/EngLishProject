import { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Từ điển",
  description: "Trang tài khoản ứng dụng học từ vựng tiếng Anh",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}

