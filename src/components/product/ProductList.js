import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import LoadingImg from '../LoadingImg';
import { useDispatch, useSelector } from 'react-redux';
// import { addItem, setItemAdded } from '../../utils/cartSlice';
import { handleCart } from '../../utils/cartUtils';
// import {addWishlistItem} from '../../utils/wishlistSlice';
// import { toast } from 'react-toastify';
import { handleWishlistItem } from '../../utils/wishlistUtils';

const ProductList = ({pName, url, pSrc, pPrice, className, sku, warrantyInformation, availabilityStatus, pWith, hoverCondition, listRow, btnHeight, onClick, items, imgHeight,isGridView }) => {
    const isLoggedIn = useSelector((state)=> state.user.loggedInUser || {});
    const cartItems = useSelector((state)=> state.cart.items || {});
    const wishListItems = useSelector((state)=> state.wishlist.items || {});
    const [isAdded, setIsAdded] = useState(cartItems.some((cartItem)=> cartItem.id === items.id));
    const [isWishlistAdded, setIsWishlistAdded] = useState(wishListItems.some((wishlistItem)=> wishlistItem.id === items.id));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        handleCart(items, cartItems, dispatch, setIsAdded);
    }

    const handleAddToWishlist = (items) => {
        handleWishlistItem(items, isLoggedIn, dispatch, navigate, setIsWishlistAdded);
    };

    console.log(isWishlistAdded);


    return (
        <div className={`w-full text-center product-list ${className}`}>
            <Link to={url} onClick={onClick} className={`relative ${className}`}>
                <div className={`relative ${className}`}>
                    <div className={`${pWith}`}>
                        <LoadingImg className={`rounded-md w-full border border-light-gray hover:shadow-md transition-all ${imgHeight}`} src={pSrc} alt={pName} />
                    </div>
                    <div className={hoverCondition}>
                        <div className="border-t bg-gradient-to-r from-light-gray to-white p-1">
                            <div className="flex flex-wrap  justify-start text-sm flex-col">
                                <div className="flex items-start gap-1 whitespace-nowrap border-b border-white"><span className="font-medium">SKU:</span><span>{sku}</span></div>
                                <div className="flex items-start gap-1 whitespace-nowrap border-b border-white"><span className="font-medium">Availability:</span><span>{availabilityStatus}</span></div>
                                <div className="flex items-start gap-1"><span className="font-medium">Warranty:</span><span className="truncate hover:text-clip" title="Diversified(Sherwin Williams">{warrantyInformation}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={listRow}>
                <div className={`${!isGridView ? 'w-full' : 'w-[65%]'}`}>
                    <Link to={url} onClick={onClick} className='hover:text-primary'><h4 className='font-medium text-md my-3 line-clamp-1 uppercase'>{pName}</h4></Link>
                    <p className='font-semibold my-3'>
                        <span>${pPrice}</span>
                    </p>
                </div>
                <div className={`${!isGridView ? 'w-full gap-x-2' : 'w-[35%] btn-grid-view gap-x-2 2xl:gap-x-0'} flex justify-between items-stretch`}>
                    <AddToCartButton 
                    disabled={isAdded} text={isAdded ? 'Added' : 'Add to cart'} onClick={()=> handleAddToCart(items)} className={` ${btnHeight} ${isAdded ? 'bg-primary opacity-55 font-bold' : 'bg-secondary font-normal'}`}/>
                    
                    <WishlistButton 
                        disabled={isWishlistAdded}
                        onClick={()=> handleAddToWishlist(items)} 
                        className={` ${btnHeight} `}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductList
