import React from 'react'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/shop.png';  

const CheckoutHeader = () => {
    return (
        <header className='bg-slate-200 py-2'>
            <div className='container mx-auto px-3 xl:px-0'>
                <div className='flex justify-between items-center'>
                    <Link className='py-3'><img src={LOGO} alt='Logo' className='max-w-full' /></Link>
                </div>
            </div>
        </header>
    )
}

export default CheckoutHeader
