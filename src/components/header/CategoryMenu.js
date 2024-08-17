import React, {useEffect, useState} from 'react'
import './categoryMenu.css';
import { Link, useLocation } from 'react-router-dom';
import useCategoryMenu from '../../hooks/useCategoryMenu';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const CategoryMenu = ({className}) => {
    const categoryMenu = useSelector((state)=> state.categoryList.categoryListData)
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white';
    useCategoryMenu();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(()=> {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <nav className={`bg-light-gray ${className}`}>
            <div className='container mx-auto lg:px-3 xl:px-0'>
                <div className='relative'>
                    <ul className='flex flex-col justify-start text-black lg:flex-row'>
                        {!isMobile ? (<Swiper
                            slidesPerView={4}
                            spaceBetween={0}
                            loop={false}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {categoryMenu && categoryMenu.map((category)=> {
                                return(
                                    <SwiperSlide key={category.slug}>
                                        <li className={`categoryItem hasMegamenu ${isActive(`/shop/${category.slug}`)} cursor-pointer text-center`}>
                                            <Link to={`/shop/${category.slug}`} className='flex flex-col items-center p-4 font-bold leading-tight whitespace-nowrap'>
                                                {category?.name}
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>) : 
                            (categoryMenu && categoryMenu.map((category)=> {
                                return(
                                    <li key={category.slug} className={`border border-b-gray-400 categoryItem hasMegamenu ${isActive(`/shop/${category.slug}`)} cursor-pointer text-left`}>
                                        <Link to={`/shop/${category.slug}`} className='flex flex-col p-4 px-5 font-bold leading-tight whitespace-nowrap'>
                                            {category?.name}
                                        </Link>
                                    </li>
                                );
                            }))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default CategoryMenu
