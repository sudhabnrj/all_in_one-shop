// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
import {addWishlistItem} from './wishlistSlice';

export const handleWishlistItem = (items, isLoggedIn, dispatch, navigate, setIsWishlistAdded)=> {

    if(isLoggedIn.loggedIn){
        dispatch(addWishlistItem({
            ...items,
            wishlistId: isLoggedIn.userid,
        }));
        setIsWishlistAdded(true);
        toast.success('Added in Wishlist!')
    }else{
        setIsWishlistAdded(false);
        alert('Please login to add to wishlist');
        navigate('/login');
        
    }
}