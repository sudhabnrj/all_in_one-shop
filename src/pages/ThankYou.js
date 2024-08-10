import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../utils/loaderSlice';
import Loader from '../components/Loader';

const ThankYou = () => {
    const loading = useSelector((state) => state.loader.loading);
    const currentUser = useSelector((store) => store.user.currentUser) || {};
    const loggedInUser = useSelector((store) => store.user.loggedInUser) || {};
    const allOrders = useSelector((store)=> store.order.allOrder) || {};
    const dispatch = useDispatch();
    const location = useLocation();

    const order = location.state?.order || {};

    // console.log(order);

    useEffect(()=> {
        dispatch(setLoading(true))
        setTimeout(()=> {
            dispatch(setLoading(false));
        }, 1000)
    }, [dispatch])

    // console.log(allOrders);

    return (
        <div className='w-full bg-gray-50 flex flex-col justify-center items-center min-h-[500px] '>
            {loading && <Loader />}
            <div className='bg-white py-10 rounded-xl shadow-lg w-[800px] text-center min-h-96'>
                <p className='text-2xl mb-5 '>Hey
                    <Link to='/my-account' className='text-secondary ml-2'>
                        {order?.firstName ? `${order?.firstName} ${order?.lastName}` : order?.email}
                    </Link>
                </p>
                <h1 className='text-4xl font-semibold'>Your Order <span className='text-secondary'>{(order.orderid)}</span> Is Confirmed</h1>
                <p className='mb-8 mt-5'>We'll send you a shipping confirmation email as soon as your order ships.</p>
                <Link to='/shop' className='px-4 py-3 bg-secondary text-xl text-white'>Continue Shopping</Link>
            </div>
        </div>
    )
}

export default ThankYou
