import { Select } from '@chakra-ui/react'

export default function Select({ disabled, onChange, optionsList }) {
	return (
		<label className='description-text'>
			Время начала занятия
			<Select
				disabled={startTimeDisabled}
				defaultValue={''}
				value={startTime}
				onChange={(e) => setStartTime(e.target.value)}
				mt={2}
				border={'2px solid #999'}
				borderRadius={'lg'}
				_hover={{}}
				_focusVisible={{}}
				_focus={{ borderColor: 'black' }}
				_placeholder={{ color: '#999' }}
				_disabled={{ backgroundColor: '#eee' }}
				w='full'
				sx={{
					pl: '20px',
					pr: '32px',
					py: '10px',
					fontSize: '16px',
					lineHeight: '125%',
					h: 'fit-content',
				}}
			>
				{/* <option value='' selected disabled hidden className='truncate'>
					Выберите время
				</option> */}
				{optionsList?.map((option) => (
					<option
						value={option?.value}
						key={option?.value}
						disabled={option?.disabled}
					>
						{option.name}
					</option>
				))}
			</Select>
		</label>
	)
}
