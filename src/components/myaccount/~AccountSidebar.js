import React from 'react'
import { Tab } from 'react-tabs';

const AccountSidebar = ({title}) => {
    return (
        <>
            <Tab className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white'>
                {title}</Tab>
            {/* <li className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white'><Link className='w-full' to=''>Order History</Link></li>
            <li className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white'><Link className='w-full' to=''>Billing & Payments</Link></li>
            <li className='px-4 py-2 bg-light-gray border-b border-b-gray-300 hover:bg-light-dark hover:text-white'><Link className='w-full' to=''>Addresses</Link></li> */}

        </>
    )
}

export default AccountSidebar
