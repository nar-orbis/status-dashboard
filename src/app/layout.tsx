// app/layout.tsx
import { ChakraProvider } from "@chakra-ui/react"
import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Status Dashboard",
  description: "Service status page",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
