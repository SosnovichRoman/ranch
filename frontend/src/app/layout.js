import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Providers from '@/providers/Providers'
import '@/styles/common.scss'
import './globals.css'

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<Header />
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	)
}
