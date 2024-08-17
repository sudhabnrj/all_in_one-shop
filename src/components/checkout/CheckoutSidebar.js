import React from 'react'

const CheckoutSidebar = ({src, productName, sku, price, qty}) => {
    return (
        
        <div className='flex md:flex-col lg:flex-row w-full mb-3'>
            <div className="w-[80px] h-[80px]">
                <img src={src} alt={''} className="border border-light-gray rounded-md w-[80px] h-[80px] object-cover" />
            </div>
            <div className='w-full flex lg:flex-row md:flex-col justify-between items-start pl-2'>
                <div>
                    <h4>{productName}</h4>
                    <p className="mt-1 text-sm mobile-480:text-md"><span className="font-medium">SKU:</span>{sku}</p>
                    <p className='text-sm mobile-480:text-md'>Qty: {qty}</p>
                </div>
                <div>
                    <p className="font-medium text-lg my-3">${price}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSidebar
