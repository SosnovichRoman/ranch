import React from 'react'

const Service = ({service}) => {
  return (
    <div className='bg-white shadow-card-shadow'>
        <img src={service.img} className='w-full h-[220px]' />
        <div className='p-5 space-y-5 flex flex-col items-center'>
            <h4 className='heading-4'>{service.title}</h4>
            <p className='description-text'>{service.description}</p>
            <a href={service.link} className='button-green'>{service.buttonText}</a>
        </div>
    </div>
  )
}

export default Service