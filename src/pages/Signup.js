import React, { useEffect, useState, useRef } from 'react'
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice';
import { useSelector, useDispatch } from 'react-redux';
import registerAvatar from '../assets/images/register-avatar.png';
import { Validate } from '../utils/Validate';
import { addAllUser, addCurrentUser, setLoggedInUser, setIsDropdown } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { generateUserId } from '../utils/generateId';
import bcrypt from "bcryptjs-react";

const Signup = () => {
    const loading = useSelector((state) => state.loader.loading);
    const userExist = useSelector((store)=> store.user.allUsers) || [];
    const loggedInUser = useSelector((store)=> store.user.loggedInUser) || [];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({});

    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const addressRef = useRef(null);
    const appt = useRef(null);
    const city = useRef(null);
    const country = useRef(null);
    const zipCode = useRef(null);
    const password = useRef(null);    
    const rePassword = useRef(null);
    const isLogin = useRef(null);

    useEffect(()=> {
        dispatch(setLoading(true));
        setTimeout(()=> {
            dispatch(setLoading(false));
        }, 1000);

    }, [dispatch]);

    if(loggedInUser.loggedIn){
        navigate('/my-account');
    }

    const handleCreateAccount = () => {
        const errorMessages = Validate({
            email: email.current.value,
            phone: phone.current.value,
            city: city.current.value,
            country: country.current.value,
            zipCode: zipCode.current.value,
            password: password.current.value,
            rePassword: rePassword.current.value,
        });

        setErrors(errorMessages);
        if (Object.keys(errorMessages).length > 0) return;
        const userid = generateUserId();

        const hashedPassword = bcrypt.hashSync(password.current.value, 10);

        const user = {
            userid: userid,
            email: email.current.value,
            phone: phone.current.value,
            password: hashedPassword,
        }
        const address = {
            userid: userid,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            address: addressRef.current.value,
            appt: appt.current.value,
            city: city.current.value,
            country: country.current.value,
            zipCode: zipCode.current.value,
        };

        // Normalize email to lower case
        const userEmail = user.email.toLowerCase();
        const existingUsers = userExist.some((existingUser) => existingUser.user?.email.toLowerCase() === userEmail);

        if(existingUsers){
            alert('User already Exist!');
            navigate('/login');
            return;
        }

        dispatch(addAllUser({user, address}));
        dispatch(addCurrentUser({user, address}));
        dispatch(setLoggedInUser({
            userid: userid,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            loggedIn: true,
        }));
        dispatch(setIsDropdown());
        navigate('/my-account');
    }
    

   

    return (
        <div className="signupPage pt-8">
            {loading && <Loader />}
            <div className=" container mx-auto sm:px-3 xl:px-0">
                <h1 className="mb-4 font-bold md:mb-6 text-2xl md:text-3xl lg:text-4xl">Create New Customer Account</h1>
                <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-10">
                    <div className='w-full lg:w-1/2 mb-8 lg:mb-0'>
                        <div className='bg-light-gray p-4'>
                            <h2 className='text-2xl mb-4 font-medium'>Register</h2>
                            <p className='my-3'>Join Essex brownel today. Start earning rewards points that can be redeemed for rewards cards to a wide variety of merchants.</p>
                            <div className='flex flex-col sm:flex-row justify-between items-stretch'>
                                <input 
                                    type='text' 
                                    placeholder='First Name' 
                                    name='firstName' 
                                    className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mr-2" 
                                    ref={firstName}
                                />
                                <input 
                                    type='text' 
                                    placeholder='Last Name' 
                                    name='listName' 
                                    className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5 sm:mt-0"
                                    ref={lastName}
                                />
                            </div>
                            <input 
                                className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5" 
                                type="email" 
                                name="email" 
                                placeholder='Email' 
                                ref={email}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            <input
                                className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                type='text'
                                name='phoneNumber'
                                placeholder='Phone Number'
                                ref={phone}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            <div className='w-full mt-4'>
                                <textarea
                                    className='border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary'
                                    name='address'
                                    placeholder='Address'
                                    ref={addressRef}
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
                            <div className='w-full flex items-start justify-between'>
                                <div className=''>
                                    <input
                                        className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                        type='text'
                                        name='city'
                                        placeholder='City'
                                        ref={city}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div className=''>
                                    <input
                                        className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                        type='text'
                                        name='country'
                                        placeholder='Country'
                                        ref={country}
                                    />
                                </div>
                                <div className=''>
                                    <input
                                        className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                        type='text'
                                        name='zip'
                                        placeholder='Postal code / zip'
                                        ref={zipCode}
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                </div>
                            </div>
                            <input
                                className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                type='password'
                                name='password'
                                placeholder='Password'
                                ref={password}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            <input
                                className='border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mt-5'
                                type='password'
                                name='rePassword'
                                placeholder='Confirm Password'
                                ref={rePassword}
                            />
                            {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>}
                            <div className="inputBox flex items-center gap-2 my-4">
                                <input id="showpassword" type="checkbox" />
                                <label htmlFor="showpassword">
                                    * I agree to the <a href="" className='text-secondary'>XCEL Rewards Terms </a> and have read the <a href="" className='text-secondary'>XCEL Rewards Privacy Statement</a>
                                </label>
                            </div>
                            <button type="button" className="bg-secondary text-white w-full py-3 mt-4 mb-2" title="Create an Account" onClick={handleCreateAccount}>
                                <span> Create an Account </span>
                            </button>
                        </div>
                        <p className='mt-4 mb-3'>Thank you for your interest in setting up a B2B account. Since there are so many working pieces involved in setting up a new B2B account we are currently asking that you please call us directly.</p>
                    </div>
                    <div className='lg:flex items-end hidden'>
                        <img src={registerAvatar} className='max-w-full' alt='Register avatar' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
