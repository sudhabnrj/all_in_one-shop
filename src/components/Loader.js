import React from 'react'
import LOADER from '../assets/images/loader.gif';

const Loader = () => {
    return (
        <div className="loader">
            <div className="">
                <img src={LOADER} alt='Loader' />
            </div>
        </div>
    )
}

export default Loader
