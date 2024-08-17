import React from 'react'

const SliderThumb = ({className}) => {
    return (
        <div className={`flex items-center justify-between mt-2 ${className}`}>
            <div className='flex items-center justify-center lg:w-[19%] bg-light-gray text-center rounded-md py-2 h-[50px] xl:text-md text-sm font-semibold'>
                <p>10% Off Magnet Wire</p>
            </div>
            <div className='flex items-center justify-center lg:w-[19%] bg-light-gray text-center rounded-md py-2 h-[50px] xl:text-md text-sm font-semibold'>
                <p>New Reno, Nevada Expansion</p>
            </div>
            <div className='flex items-center justify-center lg:w-[19%] bg-light-gray text-center rounded-md py-2 h-[50px] xl:text-md text-sm font-semibold'>
                <p>EASA: Booth 529</p>
            </div>
            <div className='flex items-center justify-center lg:w-[19%] bg-light-gray text-center rounded-md py-2 h-[50px] xl:text-md text-sm font-semibold'>
                <p>Collaborate (Essex Active)</p>
            </div>
            <div className='flex items-center justify-center lg:w-[19%] bg-light-gray text-center rounded-md py-2 h-[50px] xl:text-md text-sm font-semibold'>
                <p>Wire Harness Solutions</p>
            </div>
        </div>
    )
}

export default SliderThumb
