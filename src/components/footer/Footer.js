import React from 'react'
import { Link } from 'react-router-dom';
import { LOGO } from '../../utils/constants'; 
import SocialIcons from './SocialIcons';
import useFooterMenu from '../../hooks/useFooterMenu';
import FooterMenuList from './FooterMenuList';
import { useSelector } from 'react-redux';

const Footer = () => {
    const displayFooterMenu = useSelector((state)=> state.footerMenu.menuItem);
    useFooterMenu();
    return (
        <footer className='bg-light-gray text-black py-10'>
            <div className='container mx-auto px-3 xl:px-0'>
                <div className='grid grid-cols-5 gap-8'>
                    <div className=''>
                        <Link to='/'><img src={LOGO} alt='logo' /></Link>
                        <SocialIcons/>
                    </div>
                    {displayFooterMenu && displayFooterMenu.map((menu)=> (
                        <ul key={menu.id}>
                            <li><h3 className='font-bold text-xl mb-3'>{menu.name}</h3></li>
                            {menu.children.map((child)=> (
                                <FooterMenuList key={child.id} title={child.name} to='one-essex' />
                            ))}
                        </ul>
                    ))}
                </div>
                <div className='text-center border border-t-gray-400'>
                    <p className='pt-5'>Copyright © 2023-2024 Essex Brownell. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
