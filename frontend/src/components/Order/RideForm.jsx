'use client'

import React, { useState } from 'react'
import { ConfigProvider, DatePicker } from 'antd'
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import './RideForm.scss'
import { ChakraProvider, Select, border } from '@chakra-ui/react'

const RideForm = () => {


    const [datePickerStyle, setDatePickerStyle] = 
    useState({ padding: '10px 20px', display: 'block', width: '240px',
     fontSize: '16px', fontFamily: 'Montserrat', marginTop: '0.5rem' ,
      borderRadius: '8px', border: '2px solid #999' })

    return (
        <ConfigProvider locale={locale}>

            <form>
                <div className='pt-10 gap-y-8 flex flex-col px-10'>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            ФИО
                            <input className='input w-full mt-2' type='text' placeholder='Введите ФИО' />
                        </label>
                        <label className=' description-text'>
                            Номер телефона
                            <input className='input w-full mt-2' type='tel' placeholder='+375 (29) 111-22-33' />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            Количество человек
                            <input className='input w-full mt-2' type='text' placeholder='Введите количество' />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            Формат поездки
                            <Select mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{color: '#999'}}
                                w='full'
                                sx={{ px: '20px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content'}}>
                                <option value='11:00'>Тренировка</option>
                                <option value='12:00'>Прогулка</option>
                                <option value='13:00'>Галопные поля</option>
                            </Select>
                        </label>
                        <label className=' description-text'>
                            Дата
                            <DatePicker onChange={(value) => console.log(value)}
                                style={datePickerStyle}
                                onFocus={() => setDatePickerStyle((currentStyle) => ({ ...currentStyle, ...{ border: '2px solid black' } }))}
                                onBlur={() => setDatePickerStyle((currentStyle) => ({ ...currentStyle, ...{ border: '2px solid #999' } }))}
                            />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className='description-text'>
                            Время начала занятия
                            <Select mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{color: '#999'}}
                                w='full'
                                sx={{ px: '20px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content'}}>
                                <option value='11:00'>11:00</option>
                                <option value='12:00'>12:00</option>
                                <option value='13:00'>13:00</option>
                            </Select>
                        </label>
                        <label className='description-text'>
                            Длительность занятия
                            <Select mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{color: '#999'}}
                                w='full'
                                sx={{ px: '20px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content'}}>
                                <option value='0.5'>30 минут</option>
                                <option value='1'>1 час</option>
                                <option value='2'>2 часа</option>
                                <option value='3'>3 часа</option>
                            </Select>
                        </label>

                    </div>
                    <button type='submit' className='button-green self-center px-16 py-5 mt-4'>
                        Отправить
                    </button>
                </div>
            </form>

        </ConfigProvider>
    )
}

export default RideForm