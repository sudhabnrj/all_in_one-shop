import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { addAllUser, addAllAddress, setIsDropdown, addCurrentUser, setLoggedInUser } from '../../utils/userSlice';

const TopNav = ({className}) => {
  // const currentUser = useSelector((store)=> store.user.currentUser) || [];
  const loggedInUser = useSelector((store)=> store.user.loggedInUser) || [];
  const displayDropdown = useSelector((store)=> store.user.isDropdown); 
  const dispatch = useDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path ? 'bg-white text-black' : 'text-white hover:bg-white hover:text-black';

  // if(!loggedInUser.loggedIn) return;

  const displayName = loggedInUser.loggedIn && loggedInUser.firstName ? loggedInUser.firstName + ' ' + loggedInUser.lastName : loggedInUser.email || '';

  // console.log(loggedInUser.loggedIn);
  // console.log(displayName);

  const handleDropdown = () => {
    dispatch(setIsDropdown(!displayDropdown));
  };

  // console.log('Top Nav - Current User data :', loggedInUser);

  const handleLogout = () => {
    dispatch(addCurrentUser([]));
    dispatch(setLoggedInUser([]));
    dispatch(setIsDropdown(false));
    navigate('/');
  };

  return (
    <div className={`bg-black flex justify-between items-center topNav ${className}`}>
      <div className='container mx-auto px-3 xl:px-0'>
        <div className='flex justify-between items-center'>
          <ul className='flex lg:flex-row flex-col justify-start items-center uppercase text-white max-h-12 font-semibold'>
            <li>
              <Link to='/' className={`px-5 py-3 block ${isActive('/')}`}>
                <HomeIcon className='!w-6 !h-6' />
              </Link>
            </li>
            <li>
              <Link to='/shop' className={`px-5 py-3 block ${isActive('/shop')}`}>SHOP</Link>
            </li>
            <li>
              <Link to='/partnership' className={`px-5 py-3 block ${isActive('/partnership')}`}>PARTNERSHIPS</Link>
            </li>
            <li>
              <Link to='/partnership' className={`px-5 py-3 block ${isActive('/partnership')}`}>MARKETS</Link>
            </li>
            <li>
              <Link to='/blog' className={`px-5 py-3 block ${isActive('/blog')}`}>THE WIRE BLOG</Link>
            </li>
            {/* <li>
              <Link to='/one-essex' className={`px-5 py-3 block ${isActive('/one-essex')}`}>INFO</Link>
            </li> */}
          </ul>
          <ul className='hidden lg:flex justify-start items-center text-white'>
            {loggedInUser.loggedIn ? (
              <li className='px-5 py-3 block relative'>
                <button type='button' className='text-sm flex items-center' onClick={handleDropdown}>
                  <AccountCircleOutlinedIcon className='mr-2' />
                  Welcome <span className='text-md font-medium mx-2'>{displayName}</span> {displayDropdown ? <KeyboardArrowUpOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                </button>
                {displayDropdown && (
                  <div className='w-40 bg-white rounded-md border border-light-gray py-3 absolute top-10 right-5 z-10'>
                    <Link to='/my-account' className='text-light-dark block px-3 py-1 hover:bg-light-dark hover:text-white'>My Account
                    </Link>
                    <a onClick={handleLogout} className='text-light-dark block px-3 py-1 hover:bg-light-dark hover:text-white cursor-pointer'>Logout</a>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li className='px-5 py-3 block'>
                  <Link to='/login' className='hover:text-primary mr-2'>Sign-in</Link> or <Link to='/signup' className='hover:text-primary ml-2'>Create an Account</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
