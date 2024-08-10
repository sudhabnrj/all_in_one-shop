import React from 'react'
import LoadingImg from './LoadingImg';

const ServiceList = ({title, src, description}) => {
  return (
    <div className=''>
        <LoadingImg className='rounded-md' src={src} alt={title} />
        <h4 className='text-white font-bold text-xl py-3 pl-8 relative'>
            <span className='redTriangle absolute top-[18px] left-0'></span>
           {title}
        </h4>
        <p className='text-white'>{description}</p>
    </div>
  )
}

export default ServiceList
