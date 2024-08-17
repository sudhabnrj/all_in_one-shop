import React from 'react'
import { Link } from 'react-router-dom';

const CartSidebar = ({subtotalPrice, totalItems, checkoutUrl}) => {
    return (
        <div className='bg-light-gray p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className="font-bold lg:text-xl xl:text-3xl">Order Summary</h2>
                <span className='font-normal text-xl'>Items: {totalItems}</span>
            </div>
            <hr className='border-gray-300' />
            <div className='flex justify-between items-center mt-6 mb-6'>
                <h2 className="font-bold lg:text-md xl:text-2xl">Subtotal</h2>
                <span className='font-bold lg:text-md xl:text-2xl'>${subtotalPrice}</span>
            </div>
            <hr className='border-gray-300' />
            <div className='mt-4 flex flex-col'>
                <Link to={checkoutUrl} className='w-full bg-secondary text-white font-bold text-lg py-4 px-2 text-center'>Checkout</Link>
                <div className="flex justify-between items-start xl:flex-row flex-col mt-4 pt-3">
                    <Link className="text-secondary">Request A Quote</Link>
                    <Link className="text-secondary">Continue Shopping</Link>
                </div>
            </div>
        </div>
    )
}

export default CartSidebar
