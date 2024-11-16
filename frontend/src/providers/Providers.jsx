'use client'
import { chakraTheme } from '@/theme/chakraTheme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	)

	return (
		<ChakraProvider theme={chakraTheme}>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</ChakraProvider>
	)
}
