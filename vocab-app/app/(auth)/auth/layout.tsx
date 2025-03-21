"use client"

import { ReactNode } from "react"
import "../../globals.css"

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-muted/40 justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}