import React from 'react'
import { Link } from 'react-router-dom';

const BreadcumContainer = ({pageName, pageUrl}) => {
    return (
      <li className='flex items-center'>
        {pageUrl ? (<><span className="rounded-full border bg-gray-300 px-2 py-0.5 text-secondary">
            <Link to={pageUrl}>{pageName}</Link>
        </span>
        <span className="nextIcon mx-2 text-lightodark">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </span></>) : (<span className="flex">{pageName}</span>)}
      </li>
    )
}

export default BreadcumContainer
