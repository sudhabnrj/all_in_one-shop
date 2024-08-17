import React from 'react'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/shop.png';  
import SocialIcons from './SocialIcons';
import useFooterMenu from '../../hooks/useFooterMenu';
import FooterMenuList from './FooterMenuList';
import { useSelector } from 'react-redux';

const Footer = () => {
    const displayFooterMenu = useSelector((state)=> state.footerMenu.menuItem);
    useFooterMenu();
    return (
        <footer className='bg-light-gray text-black py-10'>
            <div className='container mx-auto sm:px-3 xl:px-0'>
                <div className='flex justify-between items-start gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full lg:w-[25%] xl:w-[20%]'>
                        <Link to='/'><img className='max-w-[200px]' src={LOGO} alt='logo' /></Link>
                        <SocialIcons/>
                    </div>
                    <div className='w-full lg:w-[75%] xl:w-[80%] flex justify-between flex-wrap items-start'>
                        {displayFooterMenu && displayFooterMenu.map((menu)=> (
                            <ul className='w-full mobile-480:w-[50%] xl:w-[25%] mb-5' key={menu.id}>
                                <li><h3 className='font-bold text-xl mb-3'>{menu.name}</h3></li>
                                {menu.children.map((child)=> (
                                    <FooterMenuList key={child.id} title={child.name} to='one-essex' />
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='text-center border border-t-gray-400'>
                    <p className='pt-5'>Copyright © 2023-2024 Shop Easy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
