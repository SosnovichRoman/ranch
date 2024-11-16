import { extendTheme } from '@chakra-ui/react'
import { selectTheme } from './selectTheme'

export const chakraTheme = extendTheme({
	breakpoints: {
		base: '0px',
		sm: '560px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
	},
	components: {
		Select: selectTheme,
	},
})
