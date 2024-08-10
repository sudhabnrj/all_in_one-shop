import React from 'react'
import './categoryMenu.css';
import { Link, useLocation } from 'react-router-dom';
import useCategoryMenu from '../../hooks/useCategoryMenu';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const CategoryMenu = () => {
    const categoryMenu = useSelector((state)=> state.categoryList.categoryListData)
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white';
    useCategoryMenu();

    return (
        <nav className='bg-light-gray'>
            <div className='container mx-auto px-3 xl:px-0'>
                <div className='relative'>
                    <ul className='flex flex-col justify-start text-black md:flex-row'>
                        <Swiper
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
                        </Swiper>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default CategoryMenu
