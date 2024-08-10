import React from 'react'
import { Link } from 'react-router-dom';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

const OrderViewItemList = ({title, quantity, price, id}) => {
    return (
        <div className='flex justify-between items-center mb-3'>
            <Link className='text-xl underline' to={`/product/${id}`}>{title}</Link>
            <div className='flex items-center'>
                <span className='mr-10'>x {quantity}</span>
                <span className='text-xl font-semibold flex items-center'>
                    <CurrencyRupeeOutlinedIcon className='!w-4 !h-4' />
                    {price}
                </span>
            </div>
        </div>
    )
}

export default OrderViewItemList;
