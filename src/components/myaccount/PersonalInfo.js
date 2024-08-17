import React from 'react'

const PersonalInfo = ({email, phone, fullName, fullAddress, city, country, zipCode}) => {
    return (
        <>
            <p className='mb-4'>Manage your personal information, including phone numbers and email address where you can be contacted.</p>
            <div className='flex flex-wrap justify-between items-stretch md:gap-x-2 gap-0'>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Name</h4>
                    <p>{fullName}</p>
                </div>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Phone numbers</h4>
                    <p>{phone}</p>
                </div>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Email Id</h4>
                    <p>{email}</p>
                </div>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>City</h4>
                    <p>{city}</p>
                </div>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Country</h4>
                    <p>{country}</p>
                </div>
                <div className='rounded-lg bg-white p-5 border border-light-gray w-full mobile-480:w-[48%] md:w-[32%] mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Zipcode</h4>
                    <p>{zipCode}</p>
                </div>
                {fullAddress && <div className='rounded-lg bg-white p-5 border border-light-gray w-full mb-5'>
                    <h4 className='font-semibold text-lg mb-2'>Address</h4>
                    <p>{fullAddress}</p>
                </div>}
            </div>
        </>
    )
}

export default PersonalInfo
