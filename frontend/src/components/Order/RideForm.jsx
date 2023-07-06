'use client'

import React, { useState, useEffect } from 'react'
import { ConfigProvider, DatePicker } from 'antd'
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import './RideForm.scss'
import { Select, useToast } from '@chakra-ui/react'
import client from '../SanityClient/client';
import { rideDurationsListQuery, rideTypesQuery, rideHoursQuery } from '../Data/data';

const RideForm = ({ handleCloseModal }) => {

    const [rideTypesList, setRideTypesList] = useState([])
    const [rideDurationsList, setRideDurationsList] = useState([])
    const [rideHoursList, setRideHoursList] = useState([])

    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [count, setCount] = useState('');
    const [rideType, setRideType] = useState();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');

    const [startTimeDisabled, setStartTimeDisabled] = useState(true);
    const [durationDisabled, setDurationDisabled] = useState(true);

    const toast = useToast()

    useEffect(() => {
        client.fetch(rideTypesQuery).then((data) => { setRideTypesList(data); setRideType(data[0]?._id) })
    }, [])


    const [datePickerStyle, setDatePickerStyle] =
        useState({
            padding: '10px 20px', display: 'block',
            fontSize: '16px', fontFamily: 'Montserrat', marginTop: '0.5rem',
            borderRadius: '8px', border: '2px solid #999'
        })

    const handleDatePicker = (date, dateString) => {
        setDate(dateString);
        setStartTime('');
        setStartTimeDisabled(true);
        if (date != '') client.fetch(rideHoursQuery(dateString)).then((data) => { setRideHoursList(data); setStartTimeDisabled(false) });
    }

    //on start time change
    useEffect(() => {
        setDuration('')
        setDurationDisabled(true)
        if (startTime != '') {
            client.fetch(rideDurationsListQuery).then((data) => {
                let tempArray = []
                //Необходимо определить, доступна ли прогулка на каждую длительность
                for (let i = 0; i < data.length; i++) {
                    let element = data[i];
                    element.busy = false; // by default you can choose any duration
                    let endTime = Number(startTime) + Number(element?.duration);

                    //Если между временем начала и временем окончания есть занятый час, то такая длительность занята
                    rideHoursList.forEach(rideHour => {
                        if (rideHour?.hour > startTime && rideHour?.hour < endTime && rideHour.busy //Если между временем начала и временем окончания есть занятый час, то такая длительность занята
                            || endTime > rideHoursList[rideHoursList?.length - 1]?.hour + 1) { // Или занятие оканчивается после последнего часа
                            element.busy = true;
                        }
                    });
                    tempArray.push(element)
                }
                setRideDurationsList(tempArray);
                setDurationDisabled(false)
            })
        }
    }, [startTime])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (fio && phone && count && rideType && date && startTime && duration) {
            const doc = {
                "_type": 'rideActivity',
                "clientName": fio,
                "clientPhone": phone,
                "personCount": Number(count),
                "rideType": {
                    _ref: rideType
                },
                "date": date,
                "startTime": {
                    _ref: rideHoursList.find((obj) => obj?.hour == startTime)?._id
                },
                "duration": {
                    _ref: rideDurationsList.find((obj) => obj?.duration == duration)?._id
                },
            };

            client.create(doc).then((resp) => {
                handleCloseModal()
                toast({
                    title: 'Заявка успешно отправлена.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }).catch((err) => {
                console.log('Error create sanity doc:', err)
                toast({
                    title: 'Возникла ошибка, попробуйте позже.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
        }
        else toast({
            title: 'Заполните все поля.',
            status: 'warning',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <ConfigProvider locale={locale}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='pt-10 gap-y-8 flex flex-col px-10'>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            ФИО
                            <input className='input w-full mt-2' type='text' placeholder='Введите ФИО' value={fio} onChange={(e) => setFio(e.target.value)} />
                        </label>
                        <label className=' description-text'>
                            Номер телефона
                            <input className='input w-full mt-2' type='tel' placeholder='+375 (29) 111-22-33' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            Количество человек
                            <input className='input w-full mt-2' type='text' placeholder='Введите количество' value={count} onChange={(e) => setCount(e.target.value)} />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className=' description-text'>
                            Формат поездки
                            <Select
                                value={rideType} onChange={(e) => setRideType(e.target.value)}
                                mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{ color: '#999' }}
                                w='full'
                                sx={{ px: '20px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content' }}>
                                {rideTypesList?.map((type) => <option value={type?._id} key={type?._id}>{type?.name}</option>)}
                            </Select>
                        </label>
                        <label className=' description-text'>
                            Дата
                            <DatePicker
                                onChange={(date, dateString) => handleDatePicker(date, dateString)}
                                style={datePickerStyle}
                                onFocus={() => setDatePickerStyle((currentStyle) => ({ ...currentStyle, ...{ border: '2px solid black' } }))}
                                onBlur={() => setDatePickerStyle((currentStyle) => ({ ...currentStyle, ...{ border: '2px solid #999' } }))}
                            />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-20'>
                        <label className='description-text'>
                            Время начала занятия
                            <Select
                                disabled={startTimeDisabled}
                                defaultValue={""}
                                value={startTime} onChange={(e) => setStartTime(e.target.value)}
                                mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{ color: '#999' }}
                                _disabled={{ backgroundColor: '#eee' }}
                                w='full'
                                sx={{ pl: '20px', pr: '32px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content' }}>
                                <option value="" selected disabled hidden className='truncate'>Выберите время</option>
                                {rideHoursList?.map((hour) => <option value={hour?.hour} key={hour?._id} disabled={hour?.busy}>{hour.hour + ':00'}</option>)}
                            </Select>
                        </label>
                        <label className='description-text'>
                            Длительность занятия
                            <Select
                                disabled={durationDisabled}
                                value={duration} onChange={(e) => setDuration(e.target.value)}
                                mt={2} border={'2px solid #999'} borderRadius={'lg'}
                                _hover={{}} _focusVisible={{}} _focus={{ borderColor: 'black' }}
                                _placeholder={{ color: '#999' }}
                                _disabled={{ backgroundColor: '#eee' }}
                                w='full'
                                sx={{ px: '20px', pr: '32px', py: '10px', fontSize: '16px', lineHeight: '125%', h: 'fit-content' }}>
                                <option value="" selected disabled hidden className='truncate'>Выберите длительность</option>
                                {rideDurationsList?.map((rideDuration) =>
                                    <option value={rideDuration?.duration} key={rideDuration?._id} disabled={rideDuration?.busy}>
                                        {rideDuration?.name}
                                    </option>)}
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