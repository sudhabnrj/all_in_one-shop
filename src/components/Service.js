import React from 'react'
import ServiceList from './ServiceList';
import { serviceList } from '../utils/mockData/serviceData';

const Service = () => {
    return (
        <section className='bg-neutral-900 home-Service mt-5 pb-8'>
            <div className='container mx-auto sm:px-3 xl:px-0'>
                <h2 className='text-center font-bold text-white text-3xl py-8'>SERVICES</h2>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
                    {serviceList && serviceList.map((service, index)=> (
                        <ServiceList key={index} src={service.src} title={service.name} description={service.description} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Service
