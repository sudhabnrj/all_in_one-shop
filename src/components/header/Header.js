import React, {useEffect, useState} from 'react'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TopNav from './TopNav';
import { Link } from 'react-router-dom';
import { LOGO } from '../../utils/constants';  
import SearchBar from '../search/SearchBar';
import CategoryMenu from './CategoryMenu';
// import useNavMenu from '../../hooks/useNavMenu';
import { useSelector } from 'react-redux';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Header = () => {
  const cartItems = useSelector((state)=> state.cart.items || {});

  const [toggleMenu, setToggleMenu] = useState(false);

  const isSticky = (e) => {
    const header = document.getElementById('mainHeader');
    const scrollTop = window.scrollY;
    scrollTop >= 48 ? header.classList.add('isSticky') : header.classList.remove('isSticky');
  };

  useEffect(()=> {
    window.addEventListener('scroll', isSticky);
    return()=> {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const handleOpenNavMenu = () => {
    setToggleMenu(!toggleMenu);
  }

  // useNavMenu();
  return (
    <header className='w-full bg-white' id='mainHeader'>
      <TopNav />
      <div className='container mx-auto px-3 xl:px-0'>
        <div className='relative flex items-center justify-between '>
          <div className='flex w-1/3 items-center gap-3 py-3 sm:gap-2 md:w-1/3 md:gap-4 lg:hidden'>
            <button className='flex items-center flex-col justify-center' onClick={handleOpenNavMenu}>
              {toggleMenu ? (<CloseOutlinedIcon className='!w-8 !h-8' />) : (<MenuOutlinedIcon className='!w-8 !h-8' />)}
              {toggleMenu ? 'Close' : 'Menu'}
            </button>
            <Link to='/login' className='flex items-center flex-col justify-center ml-2'>
              <AccountCircleOutlinedIcon className='!w-8 !h-8' />
              Login
            </Link>
          </div>

          <div className='flex w-1/3 justify-center lg:justify-start'>
            <Link className='py-3'><img src={LOGO} alt='Logo' className='max-w-full w-56' /></Link>
          </div>
          <div className='hidden w-1/3 items-center lg:flex'>
            <SearchBar/>
          </div>
          <div className='flex w-1/3 items-center justify-end gap-3 sm:gap-2 lg:w-1/3 md:gap-4'>
            <ul className='flex items-center gap-x-6 font-medium'>
              <li>
                <Link to='/cart' className='flex flex-col justify-center items-center lg:bg-secondary lg:text-white lg:py-4 lg:px-6 border border-transparent hover:text-secondary hover:bg-transparent hover:border hover:border-secondary relative'>
                  <ShoppingCartIcon className='!w-8 !h-8' />
                  <span className='hidden lg:block'>Cart</span>
                  {cartItems.length > 0 ?
                    (<span className='absolute top-[-10px] right-[-10px] lg:top-[6px] lg:right-[18px] w-5 h-5 bg-primary rounded-full flex justify-center items-center text-white text-xs font-medium text-center'>{cartItems.length}</span>) : ''
                  }
                </Link>
              </li>
            </ul>
          </div>            
        </div>
        <div className='lg:hidden w-full flex mb-3'>
          <SearchBar/>
        </div>
      </div>
      <CategoryMenu/>
      
    </header>
  )
}

export default Header
