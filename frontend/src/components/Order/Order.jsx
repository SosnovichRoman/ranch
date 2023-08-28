import React from 'react'
import HouseForm from './HouseForm';
import RideForm from './RideForm';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Order = ({ className, handleCloseModal }) => {

    return (
        <div className={`md:px-10 px-5 py-10 border-primary border-4 border-solid min-mx-[15px] max-w-[1200px] mx-auto ${className} rounded-3xl bg-white`}>
            <div className='space-y-10 max-w-[800px] mx-auto flex flex-col items-center'>
                <h2 className='heading-2 text-center'>Оставьте заявку</h2>
                <p className='default-text text-unactive text-center max-w-[800px] mx-auto'>
                    Выберите интересующую услугу, заполните контактные данные и выберите свободную дату.
                    С вами свяжутся для подтверждения записи.
                </p>
                <Tabs>
                    <TabList sx={{justifyContent: 'center'}}>
                        <Tab px={[0, 5, 10]} pt={0} pb={2} _selected={{borderColor: '#ACD25F'}}><h3 className='heading-3'>Верховая езда</h3></Tab>
                        <Tab px={[0, 5, 10]} pt={0} pb={2} _selected={{borderColor: '#ACD25F'}}><h3 className='heading-3'>Аренда домиков</h3></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p={0}>
                            <RideForm handleCloseModal={handleCloseModal} />
                        </TabPanel>
                        <TabPanel p={0}>
                            <HouseForm handleCloseModal={handleCloseModal} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default Order