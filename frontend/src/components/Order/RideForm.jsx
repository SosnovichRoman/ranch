'use client'

import useRideSettings from '@/hooks/useRideSettings'
import rideActivityService from '@/services/rideActivity.service'
import { Input, Select, Spinner, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { ConfigProvider, DatePicker } from 'antd'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { Controller, useForm } from 'react-hook-form'
import './RideForm.scss'

const RideForm = ({ handleCloseModal }) => {
	const { data: rideSettings, isLoading } = useRideSettings()
	const {
		register,
		handleSubmit,
		control,
		formState: { isValid, isSubmitting },
	} = useForm({})

	const { mutate } = useMutation({
		mutationKey: ['add ride activity'],
		mutationFn: (data) => rideActivityService.addRideActivity(data),
		onSuccess() {
			handleCloseModal()
			toast({
				title: 'Заявка успешно отправлена.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
		},
		onError() {
			toast({
				title: 'Возникла ошибка, попробуйте позже.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		},
	})
	const toast = useToast()

	if (!isValid && isSubmitting)
		toast({
			title: 'Заполните все поля.',
			status: 'warning',
			duration: 3000,
			isClosable: true,
		})

	// TODO: datepicker styles
	// const [datePickerStyle, setDatePickerStyle] = useState({
	// 	padding: '10px 20px',
	// 	display: 'block',
	// 	fontSize: '16px',
	// 	fontFamily: 'Montserrat',
	// 	marginTop: '0.5rem',
	// 	borderRadius: '8px',
	// 	border: '2px solid #999',
	// })

	const onSubmit = (data) => {
		const doc = {
			...data,
			_type: 'rideActivity',
			date: dayjs(data?.date).format('YYYY-MM-DD'),
			endTime: Number(data?.startTime) + Number(data?.duration),
			approved: false,
		}
		mutate(doc)
	}

	if (isLoading)
		return (
			<div className='w-full py-20 flex justify-center items-center'>
				<Spinner size={'xl'} />
			</div>
		)

	return (
		<ConfigProvider locale={locale}>
			{rideSettings ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='pt-10 gap-y-8 flex flex-col md:px-10 px-5'>
						<div className='grid md:grid-cols-2 gap-x-20 gap-y-8'>
							<label className=' description-text'>
								ФИО
								<Input
									className='w-full mt-2'
									type='text'
									placeholder='Введите ФИО'
									{...register('clientName', { required: 'Введите ФИО' })}
								/>
							</label>
							{/* TODO: pattern tel */}
							<label className=' description-text'>
								Номер телефона
								<Input
									className='w-full mt-2'
									type='tel'
									placeholder='+375 (29) 111-22-33'
									{...register('clientPhone', {
										required: 'Введите номер телефона',
									})}
								/>
							</label>
						</div>
						<div className='grid md:grid-cols-2 gap-x-20 gap-y-8'>
							<label className=' description-text'>
								Количество человек
								<Input
									className=' w-full mt-2'
									type='text'
									placeholder='Введите количество'
									{...register('personCount', {
										required: 'Введите количество человек',
										valueAsNumber: true,
									})}
								/>
							</label>
						</div>
						<div className='grid md:grid-cols-2 gap-x-20 gap-y-8'>
							<label className='description-text'>
								Формат поездки
								<Select
									{...register('rideType', {
										required: 'Выберите формат поездки',
									})}
									mt={2}
								>
									<option
										value=''
										selected
										disabled
										hidden
										className='truncate'
									>
										Выберите формат поездки
									</option>
									{rideSettings?.rideTypes?.map((type) => (
										<option value={type?.name} key={type?.name}>
											{type?.name}
										</option>
									))}
								</Select>
							</label>
							<label className=' description-text'>
								Дата
								<Controller
									control={control}
									name='date'
									render={({ field }) => {
										return (
											<DatePicker
												className='block w-full mt-2'
												value={field.value}
												onChange={(date, dateString) => {
													console.log(dateString)
													field.onChange(date)
												}}
												//TODO: datepicker styles
												// style={datePickerStyle}
												// onFocus={() =>
												// 	setDatePickerStyle((currentStyle) => ({
												// 		...currentStyle,
												// 		...{ border: '2px solid black' },
												// 	}))
												// }
												// onBlur={() =>
												// 	setDatePickerStyle((currentStyle) => ({
												// 		...currentStyle,
												// 		...{ border: '2px solid #999' },
												// 	}))
												// }
											/>
										)
									}}
								/>
							</label>
						</div>
						<div className='grid md:grid-cols-2 gap-x-20 gap-y-8'>
							<label className='description-text'>
								Время начала занятия
								<Select
									{...register('startTime', {
										required: 'Выберите время',
										valueAsNumber: true,
									})}
									mt={2}
								>
									<option
										value=''
										selected
										disabled
										hidden
										className='truncate'
									>
										Выберите время
									</option>
									{rideSettings.workHours?.map((hour) => (
										<option value={hour?.startTime} key={hour?.startTime}>
											{hour.name}
										</option>
									))}
								</Select>
							</label>
							<label className='description-text'>
								Длительность занятия
								<Select
									{...register('duration', {
										required: 'Выберите длительность',
									})}
									mt={2}
								>
									<option
										value=''
										selected
										disabled
										hidden
										className='truncate'
									>
										Выберите длительность
									</option>
									{rideSettings.durations?.map((duration) => (
										<option value={duration?.duration} key={duration?.duration}>
											{duration?.name}
										</option>
									))}
								</Select>
							</label>
						</div>
						{/* TODO: isPending button */}
						<button
							type='submit'
							className='button-green self-center px-16 py-5 mt-4'
						>
							Отправить
						</button>
					</div>
				</form>
			) : (
				<div className='w-full py-20 flex justify-center items-center'>
					Данные не загружены. Попробуйте позже
				</div>
			)}
		</ConfigProvider>
	)
}

export default RideForm
