import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from '../components/myaccount/UserInfo';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PersonalInfo from './../components/myaccount/PersonalInfo';
import { addAllUser, addAllAddress, setIsDropdown, addCurrentUser, updateUserInAllUsers, setLoggedInUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DataTable from 'react-data-table-component';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import getOrderColumns from '../utils/getOrderColumns';
import OrderViewItemList from '../components/vieworder/OrderViewItemList';
import OrderViewItemPrice from '../components/vieworder/OrderViewItemPrice';
import ProductList from '../components/product/ProductList';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { removeWishlistItem } from '../utils/wishlistSlice';

const MyAccount = () => {
    const loading = useSelector((state) => state.loader.loading);
    const currentUser = useSelector((store) => store.user.currentUser) || {};
    const loggedInUser = useSelector((store) => store.user.loggedInUser) || {};
    const allUsers = useSelector((store)=> store.user.allUsers) || {};
    const allOrders = useSelector((store)=> store.order.allOrder) || {};
    const wishListItems = useSelector((state)=> state.wishlist.items) || {};

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);

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
                userid: currentUser.user?.userid,
                email: currentUser.user.email,
                phone: userInfo.phone,
                password: currentUser.user.password
            },
            address: {
                userid: currentUser.user?.userid,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                appt: userInfo.appt,
                city: userInfo.city,
                country: userInfo.country,
                zipCode: userInfo.zipCode
            }
        };
        dispatch(updateUserInAllUsers(updatedUser));
        dispatch(addCurrentUser(updatedUser));       

        dispatch(setLoggedInUser({
            loggedIn: true,
            userid: currentUser.user.userid,
            email: currentUser.user.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const orderByUser = allOrders.filter((order)=> order.userid === currentUser.user.userid);
    const wishlistByUser = wishListItems.filter((item)=> item.wishlistId === currentUser.user.userid);

    const handleRemoveWishlist = (itemId) => {
        dispatch(removeWishlistItem(itemId));
    }

    const handleViewClick = (orderid)=> {
        const order = orderByUser.find((order)=> order.orderid === orderid)
        // console.log(order);
        setSelectedOrder(order);
        setSelectedIndex(4);
    };

    const orderColumns = getOrderColumns(handleViewClick);
    
    const tableStyles = {
        headCells: {
            style: {
                fontSize: '16px',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
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
                        <div className='w-1/4 userTabMenu'>
                            <div className='border border-light-gray'>
                                <UserInfo userName={`${currentUser.address.firstName} ${currentUser.address.lastName}`} userEmail={currentUser.user?.email || ''} />
                                <TabList>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Personal Information</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Order History</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Wishlist</Tab>
                                    <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white cursor-pointer'>Update Personal Information</Tab>
                                    <Tab className='hidden'>Order Details</Tab>
                                </TabList>
                            </div>
                        </div>
                        <div className='w-3/4'>
                            <TabPanel className='w-full'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-semibold text-2xl'>Personal Information</h2>
                                    <button className='text-secondary underline font-semibold cursor-pointer' onClick={() => setSelectedIndex(3)}>
                                        <EditOutlinedIcon /> Edit Personal Information
                                    </button>
                                </div>
                                <PersonalInfo
                                    fullName={currentUser.address.firstName ? `${currentUser.address.firstName} ${currentUser.address.lastName}` : `Edit you name`}
                                    email={currentUser.user?.email || ''}
                                    phone={userInfo.phone}
                                    city={userInfo.city}
                                    country={userInfo.country}
                                    zipCode={userInfo.zipCode}
                                    fullAddress={userInfo.address && userInfo.appt ? `${userInfo.appt} ${userInfo.address}` : `Edit Address`}
                                />
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl mb-5'>Order History</h2>
                                
                                    <DataTable
                                        columns={orderColumns}
                                        data={orderByUser}
                                        direction="auto"
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                        responsive
                                        subHeaderAlign="right"
                                        subHeaderWrap
                                        customStyles={tableStyles}
                                    />
                                
                            </TabPanel>
                            <TabPanel className='w-full'>
                                <h2 className='font-semibold text-2xl'>Your Wishlist Items</h2>
                                {wishlistByUser.length > 0 ? <div className={'grid grid-cols-4 gap-8 mt-5'}>
                                    { wishlistByUser && wishlistByUser.map((wishlist, index)=> (
                                        <div className='relative' key={index}>
                                            <button onClick={()=> handleRemoveWishlist(wishlist.id)} type='button' className='absolute top-1 right-1 z-10'>
                                                <CloseOutlinedIcon/>
                                            </button>
                                            <ProductList
                                                key={wishlist.id}
                                                url={`/product/${wishlist.id}`}
                                                hoverCondition={'absolute bottom-0 left-0 right-0 top-0 m-auto flex flex-col justify-end transition-all duration-300 hover:opacity-0'}
                                                imgHeight={'min-h-[271px]'}
                                                pWith = {''}
                                                className={'w-full'}                     
                                                sku={wishlist?.sku}
                                                pSrc={wishlist?.thumbnail} 
                                                pName={wishlist?.title}
                                                pPrice={wishlist?.price}
                                                warrantyInformation={wishlist?.warrantyInformation}
                                                availabilityStatus={wishlist?.availabilityStatus}
                                                items={wishlist}
                                            />
                                        </div>
                                    ))}
                                    </div> : 
                                    <div className='bg-sky-200 text-sky-500 rounded-md px-5 py-2 w-full mt-5'>
                                        Your Wishlist is empty!
                                    </div>
                                }
                                
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
                            <TabPanel>
                                {selectedOrder && (<> 
                                        <h2 className='font-semibold text-2xl mb-5'>Order Details</h2>
                                        <p>Order <span className='font-semibold'>#{selectedOrder.orderid}</span> was placed on <span className='font-semibold'>{selectedOrder.orderDate}</span> and currently Completed</p>
                                    </>
                                )}

                                <div className='flex flex-col mt-6'>
                                    {selectedOrder?.items?.map((item)=> (
                                        <OrderViewItemList 
                                            key={item?.id} 
                                            id={item?.id} 
                                            title={item?.title} 
                                            quantity={item?.quantity} 
                                            price={item?.price} 
                                        />
                                    ))}
                                </div>
                                    
                                {selectedOrder && <OrderViewItemPrice 
                                    shippingCharges={selectedOrder?.shippingCharges.toFixed(2)}
                                    paymentMethod={selectedOrder?.paymentMethod}
                                    totalAmount={selectedOrder?.totalAmount}
                                />}
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
