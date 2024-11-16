import * as eva from '@eva-design/eva'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApplicationProvider } from '@ui-kitten/components'
import { useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { default as mapping } from '../mapping.json'

const Providers = ({ children }) => {
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
		<QueryClientProvider client={client}>
			<ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
				{children}
			</ApplicationProvider>
			<Toast />
		</QueryClientProvider>
	)
}

export default Providers
