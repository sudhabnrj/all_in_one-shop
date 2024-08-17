import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from '../components/myaccount/UserInfo';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PersonalInfo from './../components/myaccount/PersonalInfo';
import { addAllUser, addAllAddress, setIsDropdown, addCurrentUser, setLoggedInUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const MyAccount = () => {
    const loading = useSelector((state) => state.loader.loading);
    const currentUser = useSelector((store) => store.user.currentUser) || {};
    const loggedInUser = useSelector((store) => store.user.loggedInUser) || {};

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        appt: '',
        city: '',
        country: '',
        zipCode: ''
    });

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(setIsDropdown(false));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        // Initialize form data
        if (currentUser.user && currentUser.address) {
            setUserInfo({
                firstName: currentUser.user.firstName || '',
                lastName: currentUser.user.lastName || '',
                email: currentUser.user.email || '',
                phone: currentUser.user.phone || '',
                address: currentUser.address.address || '',
                appt: currentUser.address.appt || '',
                city: currentUser.address.city || '',
                country: currentUser.address.country || '',
                zipCode: currentUser.address.zipCode || ''
            });
        }

    }, [dispatch, currentUser]);

    useEffect(() => {
        if (!loggedInUser.loggedIn) {
            navigate('/login');
        }
    }, [loggedInUser, navigate]);

    const handleLogout = () => {
        dispatch(addCurrentUser({}));
        dispatch(setLoggedInUser({}));
        dispatch(setIsDropdown(false));
        navigate('/');
    };

    const handleUpdateUser = () => {
        const updatedUser = {
            user: {
                userid: currentUser.user.userid,
                email: currentUser.user.email,
                phone: userInfo.phone,
                password: currentUser.user.password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
            },
            address: {
                userid: currentUser.user.userid,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                appt: userInfo.appt,
                city: userInfo.city,
                country: userInfo.country,
                zipCode: userInfo.zipCode
            }
        };
        dispatch(addCurrentUser(updatedUser));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    return (
        <div className="myAccountPage pt-8 bg-gray-50 pb-12">
            {loading && <Loader />}
            <div className="container mx-auto px-3 xl:px-0">
                <div className='flex justify-between items-center border-b-stone-400 border-b mb-5'>
                    <h1 className="mb-4 font-bold md:mb-6 text-2xl md:text-3xl lg:text-4xl">My Account</h1>
                    <button className='px-4 py-2 text-md bg-primary rounded-md text-white font-medium' onClick={handleLogout}>Logout</button>
                </div>
                <div className="w-full">
                    <Tabs selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} className='flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-10'>
                        <div className='w-1/4'>
                            <div className='border border-light-gray'>
                                <UserInfo userName={`${userInfo.firstName} ${userInfo.lastName}`} userEmail={currentUser.user?.email} />
                                <TabList>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Personal Information</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Order History</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Billing & Payments</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b-0 hover:bg-light-dark hover:text-white cursor-pointer'>Addresses</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Update Personal Information</Tab>
                                </TabList>
                            </div>
                        </div>
                        <div className='w-3/4'>
                            <TabPanel className='w-full'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-semibold text-2xl'>Personal Information</h2>
                                    <button className='text-secondary underline font-semibold cursor-pointer' onClick={() => setSelectedIndex(4)}>
                                        <EditOutlinedIcon /> Edit Personal Information
                                    </button>
                                </div>
                                <PersonalInfo
                                    fullName={`${userInfo.firstName} ${userInfo.lastName}`}
                                    email={currentUser.user?.email}
                                    phone={userInfo.phone}
                                    city={userInfo.city}
                                    country={userInfo.country}
                                    zipCode={userInfo.zipCode}
                                    fullAddress={`${userInfo.appt} ${userInfo.address}`}
                                />
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl'>Order History</h2>
                                <p className='mb-4'>Manage your personal information, including phone numbers and email address where you can be contacted.</p>
                                <div className='flex flex-wrap justify-between items-stretch'>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Name</h4>
                                        <p>Sudha Chandan Banerjee</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Phone numbers</h4>
                                        <p>9836611165</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Email id</h4>
                                        <p>sudha.banerjee@codeclouds.in</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Country</h4>
                                        <p>India</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>State</h4>
                                        <p>WB</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Zipcode</h4>
                                        <p>700456</p>
                                    </div>
                                    <div className='rounded-lg bg-white p-5 border border-light-gray w-[32%] mb-5'>
                                        <h4 className='font-semibold text-lg mb-2'>Address</h4>
                                        <p>46b, flat name, road name, landmark</p>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl'>Billing & Payments</h2>
                                <p className='mb-4'>Manage your personal information, including phone numbers and email address where you can be contacted.</p>
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl'>Addresses</h2>
                                <p className='mb-4'>Manage your personal information, including phone numbers and email address where you can be contacted.</p>
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl mb-5'>Update Personal Information</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                                    <div className="flex justify-between items-stretch">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mr-2"
                                            value={userInfo.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none"
                                            value={userInfo.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex justify-between items-stretch mt-4">
                                        <input
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mr-2"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={currentUser.user?.email}
                                            disabled
                                        />
                                        <input
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none"
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={userInfo.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex justify-between items-stretch mt-4">
                                        <textarea
                                            className="border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary mr-2"
                                            name="address"
                                            placeholder="Address"
                                            value={userInfo.address}
                                            onChange={handleChange}
                                        />
                                        <textarea
                                            className="border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary"
                                            name="appt"
                                            placeholder="Apartment, suite, etc. (optional)"
                                            value={userInfo.appt}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex justify-between items-stretch mt-4">
                                        <input
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={userInfo.city}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mx-2"
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            value={userInfo.country}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none"
                                            type="text"
                                            name="zipCode"
                                            placeholder="Postal code / zip"
                                            value={userInfo.zipCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex justify-start my-5">
                                        <button type="submit" className="px-4 py-2 bg-secondary text-white rounded-md">Save Changes</button>
                                    </div>
                                </form>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
