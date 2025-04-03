// pages/_app.tsx
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    
  return (
    // @ts-ignore
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
