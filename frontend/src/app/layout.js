'use client'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import './globals.css'
import style from '@/styles/common.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "560px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme = extendTheme({ breakpoints });

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
        <Footer />
      </body>
    </html>
  )
}
