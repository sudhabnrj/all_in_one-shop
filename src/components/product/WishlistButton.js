import React from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const WishlistButton = ({className, onClick, disabled}) => {
    // console.log('wishlist', disabled);
    return (
        <button onClick={onClick} disabled={disabled} className={`${className} px-4 py-2 w-[70px] border border-secondary flex justify-center items-center rounded-md text-secondary hover:bg-secondary hover:text-white transition-all`}>
            {!disabled ? 
                <FavoriteBorderOutlinedIcon/> : <FavoriteOutlinedIcon/>
            }
            
        </button>
    )
}

export default WishlistButton
