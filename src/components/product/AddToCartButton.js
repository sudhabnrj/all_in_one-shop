import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const AddToCartButton = ({className, onClick, text, disabled}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} px-3 py-2 w-[75%]  hover:bg-sky-700 flex justify-center items-center rounded-md text-white transition-all text-sm`}>
            <ShoppingCartOutlinedIcon/>
            <span className='ml-2 capitalize'>{text}</span>
        </button>
    )
}

export default AddToCartButton
