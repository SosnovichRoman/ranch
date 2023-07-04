import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import Order from '../Order/Order'

const Service = ({ service }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={'800px'} mx={'15px'} bg={'transparent'}>
        <ModalCloseButton top={3} right={3} />
          <Order />
        </ModalContent>
      </Modal>
      <div className='bg-white shadow-card-shadow'>
        <img src={service.img} className='w-full h-[220px] object-cover' />
        <div className='p-5 space-y-5 flex flex-col items-center'>
          <h4 className='heading-4 text-center'>{service.title}</h4>
          <p className='description-text text-center'>{service.description}</p>
          <button onClick={onOpen} className='button-green'>{service.buttonText}</button>
          {/* <a href={service.link} className='button-green'>{service.buttonText}</a> */}
        </div>
      </div>
    </>
  )
}

export default Service