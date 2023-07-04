'use client'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import './globals.css'
import style from '@/styles/common.scss'
import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <Footer />
      </body>
    </html>
  )
}
