import React from 'react'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

const OrderViewItemPrice = ({shippingCharges, paymentMethod, totalAmount}) => {
    return (
        <>
            <div className='flex justify-between items-center mt-4'>
                <span className='text-xl'>Shipping Charges: </span>
                <span className='text-xl font-semibold flex items-center'>
                    <CurrencyRupeeOutlinedIcon className='!w-4 !h-4' />
                    {shippingCharges}
                </span>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <span className='text-xl'>Payment method: </span>
                <span className='text-xl font-semibold uppercase'>{paymentMethod}</span>
            </div>
            <div className='flex justify-between items-center mt-4 border-light-gray border-t-2 pt-2'>
                <span className='text-2xl font-semibold'>Total: </span>
                <span className='text-2xl font-semibold uppercase flex items-center'>
                    <CurrencyRupeeOutlinedIcon/>
                    {totalAmount.toFixed(2)}</span>
            </div>
        </>
    )
}

export default OrderViewItemPrice;
