import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSingleProduct from '../hooks/useSingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from '../components/product/AddToCartButton';
import WishlistButton from '../components/product/WishlistButton';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import ReviewList from '../components/review/ReviewList';
import LoadingImg from '../components/LoadingImg';
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import useCategoryMenu from '../hooks/useCategoryMenu';
import Loader from '../components/Loader';
import { handleCart } from '../utils/cartUtils';
import { updateQuantity } from '../utils/cartSlice';
import { handleWishlistItem } from '../utils/wishlistUtils';

const SingleProduct = ({items}) => {
    const isLoggedIn = useSelector((state)=> state.user.loggedInUser || {});
    const singleProduct = useSelector((state) => state.product.singleProduct);
    const cartItems = useSelector((state)=> state.cart.items || {});
    const wishListItems = useSelector((state)=> state.wishlist.items || {});
    const loading = useSelector((state)=> state.loader.loading);
    const [isAdded, setIsAdded] = useState(cartItems.some((cartItem)=> cartItem.id === singleProduct.id));
    const [quantity, setQuantity] = useState(1); // Initialize quantity state
    const [isWishlistAdded, setIsWishlistAdded] = useState(wishListItems.some((wishlistItem)=> wishlistItem?.id === items?.id));

    // console.log('cart', cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productId } = useParams();
    useSingleProduct(productId);
    useCategoryMenu();

    const {
        availabilityStatus, 
        description,
        id,
        category,
        dimensions,
        images = [], 
        thumbnail, 
        price, 
        rating, 
        sku, 
        title, 
        warrantyInformation, 
        weight,
        returnPolicy,
        shippingInformation,
        reviews = [] 
    } = singleProduct || {};

    const handleAddToCart = () => {
        const updatedProduct = {...singleProduct, quantity};
        handleCart(updatedProduct, cartItems, dispatch, setIsAdded, quantity);
        // console.log(quantity);
    }

    const handleQuantityChange = (e)=> {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);
    }

    useEffect(()=> {
        dispatch(updateQuantity({productId: singleProduct.id, quantity}));
        setIsAdded(false);
        // console.log(dispatch(updateQuantity({productId: singleProduct.id, quantity})));
        // console.log('updated quantity', quantity);
    }, [dispatch, singleProduct.id, quantity]);

    useEffect(()=> {
        setIsAdded(cartItems.some((cartItem)=> cartItem.id === singleProduct.id && cartItem.quantity === quantity));
    }, [quantity, singleProduct.id, cartItems]);

    const handleAddToWishlist = (items) => {
        handleWishlistItem(items, isLoggedIn, dispatch, navigate, setIsWishlistAdded);
    };

    return (
        <section className='my-8'>
            {loading && <Loader/>}
            <div className='container mx-auto sm:px-3 xl:px-0'>
                <ul className="bredcrumb my-4 flex items-center rounded-full bg-light-gray px-4 py-3 md:p-2 capitalize leading-tight text-light-dark flex-wrap">
                    <BreadcumContainer pageName='Home' pageUrl={'/'} />
                    <BreadcumContainer pageName='Shop' pageUrl={'/shop/'} />
                    <BreadcumContainer pageName={category} pageUrl={`/shop/${category}`} />
                    <BreadcumContainer pageName={title}  />
                </ul>
                <div className='flex justify-between items-start flex-col sm:flex-row'>
                    <div className='w-full sm:w-1/3'>
                        <div className='border p-2 border-light-gray text-center'>
                            <LoadingImg src={thumbnail || (images.length > 0 ? images[0] : '')} alt={title} />
                        </div>
                    </div>
                    <div className='w-full sm:w-2/3 mt-5 sm:mt-0'>
                        <div className='sm:pl-8'>
                            <h1 className='text-2xl sm:text-xl 2xl:text-3xl font-bold mb-1'>{title}</h1>
                            <p className='my-2'>{availabilityStatus}</p>
                            <p className='font-medium text-lg my-3'>${price}</p>
                            <hr/>
                            <p className='my-3 text-md'><span className='font-medium'>SKU:</span> {sku}</p>
                            <p>{description}</p>
                            <div className='flex justify-start items-stretch my-5 gap-4'>
                                <div className='w-1/5'>
                                    <input type='number' value={quantity} className='w-full border border-light-gray py-2 px-2 outline-none' onChange={handleQuantityChange} placeholder='Qty'  min='1' />
                                </div>
                                <div className='w-4/5'>
                                    <div className='md:w-[70%] 2xl:w-[40%] flex justify-start items-stretch gap-4'>
                                        <AddToCartButton disabled={isAdded} text={isAdded ? 'Added to Cart' : 'Add to cart'} onClick={()=> handleAddToCart(id, quantity)} className={` ${isAdded ? 'bg-primary opacity-55 font-bold' : 'bg-secondary font-normal'}`}/>
                                        <WishlistButton 
                                            disabled={isWishlistAdded}
                                            onClick={()=> handleAddToWishlist(items)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Tabs>
                        <TabList className=''>
                            <Tab>Details</Tab>
                            <Tab>Description</Tab>
                            <Tab>Reviews</Tab>
                        </TabList>

                        <TabPanel>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className='uppercase'><b>PRODUCT NAME</b> </td>
                                        <td>
                                            <p>{title}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Availability</b> </td>
                                        <td>
                                            <p>{availabilityStatus}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Depth</b> </td>
                                        <td>
                                            <p><span>{dimensions?.depth}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Height</b> </td>
                                        <td>
                                            <p><span>{dimensions?.height}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Width</b> </td>
                                        <td>
                                            <p><span>{dimensions?.width}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Weight</b> </td>
                                        <td>
                                            <p><span>{weight}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Return Policy</b> </td>
                                        <td>
                                            <p>{returnPolicy}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Shipping Information</b> </td>
                                        <td>
                                            <p>{shippingInformation}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='uppercase'><b>Warranty</b> </td>
                                        <td>
                                            <p>{warrantyInformation}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPanel>
                        <TabPanel>
                            <p>{description}</p>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex justify-between items-center">
                                <div className="w-1/2">
                                    <div className="flex items-center justify-start">
                                        <span className='text-primary'>
                                            <StarOutlinedIcon/>
                                            <StarOutlinedIcon/>
                                            <StarOutlinedIcon/>
                                            <StarOutlinedIcon/>
                                            <StarHalfOutlinedIcon/>
                                        </span>
                                        <span className="font-medium text-md ml-4">{rating} ({reviews && reviews.length}) reviews</span>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex justify-end">
                                        <button className="d-flex justify-center items-center border-secondary border-2 text-secondary py-2 px-4">Write A Review</button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-8'>
                                {reviews && reviews.map((review, index)=> (
                                    <ReviewList key={index} thumbnail={review.reviewerName.charAt(0)} autherName={review.reviewerName} date={review.date.substr(0, 10)} comments={review.comment} rating={review.rating}/>
                                ))}
                                
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct;
