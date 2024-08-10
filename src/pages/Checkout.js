import React, { useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../utils/loaderSlice';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import PaymentInfo from '../components/checkout/PaymentInfo';
import { VISALOGO, AMEXLOGO, MASTERCARDLOGO, PAYPALLOGO, shippingCharges } from '../utils/constants';
import { Validate } from '../utils/Validate';
import { addAllUser, addCurrentUser, setLoggedInUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { addOrder } from '../utils/orderSlice';
import { generateUserId, generateOrderId } from '../utils/generateId';
import { clearCart } from '../utils/cartSlice';

const Checkout = () => {
    const loading = useSelector((state) => state.loader.loading);
    const cartItems = useSelector((state) => state.cart.items);
    const userExist = useSelector((store) => store.user.allUsers) || [];
    const currentUser = useSelector((store) => store.user.currentUser) || {};
    const loggedInUser = useSelector((store) => store.user.loggedInUser) || {};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [userExistingError, setUserExistingError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

    const email = useRef(null);
    const phone = useRef(null);
    const password = useRef(null);
    const rePassword = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const address = useRef(null);
    const appt = useRef(null);
    const city = useRef(null);
    const country = useRef(null);
    const zipCode = useRef(null);

    useEffect(() => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }, [dispatch, cartItems, navigate]);

    if (cartItems.length === 0) {
        navigate('/shop');
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // console.log(loggedInUser);

    const handlePlaceOrder = () => {
        // Clear previous errors
        setErrors({});
        setUserExistingError('');
    
        // Validate form fields only if the user is not logged in
        if (!loggedInUser.loggedIn) {
            const errorMessages = Validate({
                email: email.current?.value,
                phone: phone.current?.value,
                password: password.current?.value,
                rePassword: rePassword.current?.value,
                city: city.current?.value,
                country: country.current?.value,
                zipCode: zipCode.current?.value,
            }, false); // Pass `false` to indicate it's a new user registration
    
            setErrors(errorMessages);
    
            if (Object.keys(errorMessages).length > 0) {
                return;
            }
    
            // Check if the email already exists
            const existingUser = userExist.find(user => user.user.email === email.current?.value);
            if (existingUser) {
                setUserExistingError('User already registered.');
                return;
            }
        }
    
        let userid = loggedInUser.loggedIn ? currentUser.user.userid : generateUserId();

        // console.log('userId :', userId);

        let user = {
            userid: userid,
            email: email.current?.value,
            phone: phone.current?.value,
            password: password.current?.value,
        };
        let address = {
            userid: userid,
            firstName: firstName.current?.value,
            lastName: lastName.current?.value,
            city: city.current?.value,
            country: country.current?.value,
            zipCode: zipCode.current?.value,
        };
    
        if (!loggedInUser.loggedIn) {
            dispatch(addAllUser({ user, address }));
            dispatch(addCurrentUser({ user, address }));
            dispatch(setLoggedInUser({
                userId: userid,
                firstName: firstName.current?.value,
                lastName: lastName.current?.value,
                email: email.current?.value,
                loggedIn: true,
            }));
            // console.log('userId :', userid);
        } else {
            user = {
                userid: userid,
                firstName: firstName.current?.value,
                lastName: lastName.current?.value,
                email: currentUser.user.email,
                phone: currentUser.user.phone,
                password: currentUser.user.password,
            };
            address = {
                userid: userid,
                firstName: currentUser.address.firstName || address.firstName,
                lastName: currentUser.address.lastName || address.lastName,
                city: currentUser.address.city || address.city,
                country: currentUser.address.country || address.country,
                zipCode: currentUser.address.zipCode || address.zipCode,
            };
        }
    
        const orderId = generateOrderId();
        // let userId = loggedInUser.loggedIn ? loggedInUser.userId : generateUserId();
        const now = new Date();
        const order = {
            orderid: orderId,
            userid: userid,
            items: cartItems,
            email: user.email,
            phone: user.phone,
            firstName: address.firstName,
            lastName: address.lastName,
            city: address.city,
            country: address.country,
            zipCode: address.zipCode,
            shippingCharges: shippingCharges,
            totalAmount: subtotal + shippingCharges,
            paymentMethod: selectedPaymentMethod,
            orderDate: now.toLocaleString(),
        };
    
        dispatch(addOrder(order));
        dispatch(clearCart());
        navigate('/thankyou', {state: {order}});
        // console.log('login user details', loggedInUser);
    };
    
    

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChangePaymentMethod = (e) => {
        setSelectedPaymentMethod(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <section className='mb-8'>
            {loading && <Loader />}
            
            {/* <CheckoutHeader /> */}
            <div className='container mx-auto px-3 xl:px-0'>
                <form onSubmit={(e) => e.preventDefault()} className='flex mt-12'>
                    <div className='w-2/3 pr-8'>
                        <h1 className='font-bold text-2xl mt-8 mb-4 flex justify-between items-center'>
                            Checkout 
                            {!loggedInUser.loggedIn && <p className='text-base'>Already registered? <Link className='ml-2 text-primary underline' to='/login'>Login</Link></p>}
                        </h1>
                        {/* Display Error */}
                        {userExistingError && <div className='flex justify-start items-center px-4 py-4 bg-[#cce5ff] border border-[#cce5ff] rounded-md text-[#004085] mb-4'>{userExistingError} <Link className='bg-secondary px-5 rounded-md text-white py-2 ml-3' to='/login'>Login</Link></div>}

                        {!loggedInUser.loggedIn ? (
                            <>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>}
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                <div className='flex flex-col w-full'>
                                    <div className='border border-light-gray rounded-md p-4'>
                                        <h2 className='text-xl mb-4'>Contact Information</h2>
                                        <div className='flex w-full justify-between items-stretch flex-wrap'>
                                            <div className='w-[49%]'>
                                            <input
                                                className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                                ref={email}
                                            />
                                            </div>
                                            <div className='w-[49%]'>
                                            <input
                                                className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                type='text'
                                                name='phoneNumber'
                                                placeholder='Phone Number'
                                                ref={phone}
                                            />
                                            </div>
                                            <div className='w-[49%] mt-4'>
                                                <div className='relative'>
                                                    <input
                                                        className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                        type={showPassword ? 'text' : 'password'}
                                                        name='password'
                                                        placeholder='Password'
                                                        ref={password}
                                                    />
                                                    {!showPassword ? 
                                                        <VisibilityOutlinedIcon className='absolute top-1/2 right-2 cursor-pointer -translate-y-1/2 text-gray-500' onClick={handleShowPassword} /> :
                                                        <VisibilityOffOutlinedIcon className='absolute top-1/2 right-2 cursor-pointer -translate-y-1/2 text-gray-500' onClick={handleShowPassword} />
                                                    }
                                                </div>
                                            </div>
                                            <div className='w-[49%] mt-4'>
                                                <div className='relative'>
                                                <input
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    type='password'
                                                    name='rePassword'
                                                    placeholder='Re-enter Password'
                                                    ref={rePassword}
                                                />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col w-full mt-4'>
                                    <div className='border border-light-gray rounded-md p-4'>
                                        <h2 className='text-xl mb-4'>Shipping Address</h2>
                                        <div className='flex w-full justify-between items-stretch flex-wrap'>
                                            <div className='w-[49%]'>
                                                <input
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    type='text'
                                                    name='firstName'
                                                    placeholder='First name (optional)'
                                                    ref={firstName}
                                                />
                                            </div>
                                            <div className='w-[49%]'>
                                                <input
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    type='text'
                                                    name='lastName'
                                                    placeholder='Last name (optional)'
                                                    ref={lastName}
                                                />
                                            </div>
                                            <div className='w-full mt-4'>
                                                <textarea
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    name='address'
                                                    placeholder='Address'
                                                    ref={address}
                                                />
                                            </div>
                                            <div className='w-full mt-4'>
                                                <textarea
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    name='appartment'
                                                    placeholder='Apartment, suite, etc. (optional)'
                                                    ref={appt}
                                                />
                                            </div>
                                            <div className='w-full mt-4 mb-4'>
                                            <input
                                                className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                type='text'
                                                name='city'
                                                placeholder='City'
                                                ref={city}
                                            />
                                            </div>
                                            <div className='w-[49%]'>
                                            <input
                                                className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                type='text'
                                                name='country'
                                                placeholder='Country'
                                                ref={country}
                                            />
                                            </div>
                                            <div className='w-[49%]'>
                                                <input
                                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                                    type='text'
                                                    name='zip'
                                                    placeholder='Postal code / zip'
                                                    ref={zipCode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col w-full mt-4'>
                                <div className='border border-light-gray rounded-md p-4'>
                                    <h2 className='text-xl mb-4'>Contact Information</h2>
                                    <p><span className=''>Email:</span> <span className='font-medium'>{currentUser.user.email}</span></p>
                                    <p><span className=''>Phone:</span> <span className='font-medium'>{currentUser.user.phone}</span></p>
                                    <p><span className=''>City:</span> <span className='font-medium'>{currentUser.address.city}</span></p>
                                    <p><span className=''>Country:</span> <span className='font-medium'>{currentUser.address.country}</span></p>
                                    <p><span className=''>Zip code:</span> <span className='font-medium'>{currentUser.address.zipCode}</span></p>
                                </div>
                            </div>
                        )}

                        <div className='flex flex-col w-full mt-4'>
                            <div className='border border-light-gray rounded-md p-4'>
                                <h2 className='text-xl mb-4'>Payment Information</h2>
                                <PaymentInfo paymentMethod='cod' title='COD' VISALOGO={VISALOGO} MASTERCARDLOGO={MASTERCARDLOGO} AMEXLOGO={AMEXLOGO} PAYPALLOGO={PAYPALLOGO} handleSelect={handleChangePaymentMethod} checked={selectedPaymentMethod === 'cod'} />
                                <PaymentInfo paymentMethod='paypal' title='Paypal' VISALOGO={VISALOGO} MASTERCARDLOGO={MASTERCARDLOGO} AMEXLOGO={AMEXLOGO} PAYPALLOGO={PAYPALLOGO} handleSelect={handleChangePaymentMethod} checked={selectedPaymentMethod === 'paypal'} />
                                <PaymentInfo paymentMethod='card' title='Debit Card / Credit Card' VISALOGO={VISALOGO} MASTERCARDLOGO={MASTERCARDLOGO} AMEXLOGO={AMEXLOGO} PAYPALLOGO={PAYPALLOGO} handleSelect={handleChangePaymentMethod} checked={selectedPaymentMethod === 'card'} />
                            </div>
                        </div>

                    </div>
                    <div className='w-1/3 mt-8'>
                        <div className='p-4 pt-0'>
                            <h2 className='font-bold text-2xl mb-4'>Order Summary</h2>
                            <div className='flex flex-col w-full custom-scrollbar max-h-[290px] overflow-y-auto pr-2'>
                                {cartItems && cartItems.map((item) => (
                                    <CheckoutSidebar
                                        key={item.id}
                                        src={item.thumbnail}
                                        productName={item.title}
                                        sku={item.sku}
                                        price={item.price * item.quantity}
                                        qty={item.quantity}
                                    />
                                ))}
                            </div>

                            <div className='border-t border-light-gray mt-6 pt-4'>
                                <div className='flex justify-between items-center mb-3'>
                                    <span className='font-bold text-xl'>Subtotal</span>
                                    <span>{subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between items-center mt-6'>
                                    <span className='font-bold text-xl'>Shipping</span>
                                    <span>${shippingCharges.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className='border-t border-light-gray mt-6'>
                                <div className='flex justify-between items-center mt-4'>
                                    <span className='font-bold text-2xl'>Total</span>
                                    <span className='font-bold text-2xl'>${(subtotal + shippingCharges).toFixed(2)}</span>
                                </div>
                                <button type='button' className='mt-10 w-full bg-secondary flex justify-center items-center text-white py-4 rounded-md text-xl' onClick={handlePlaceOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Checkout;
