import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(selectAnatomy.keys)

// TODO: customize select
export const selectTheme = defineMultiStyleConfig({
	baseStyle: definePartsStyle({
		field: {
			// borderRadius: 'lg',
			// border: '2px solid #999',
			// _hover: {},
			// _focusVisible: {},
			// _focus: { borderColor: 'black' },
			// _placeholder: { color: '#999' },
			// _disabled: { backgroundColor: '#eee' },
			// w: 'full',
			// sx: {
			// 	pl: '20px',
			// 	pr: '32px',
			// 	py: '10px',
			// 	fontSize: '16px',
			// 	lineHeight: '125%',
			// 	h: 'fit-content',
			// },
		},
	}),
})
