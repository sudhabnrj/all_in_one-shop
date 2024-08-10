import React from 'react'
import { Link } from 'react-router-dom';
import LoadingImg from '../LoadingImg';

const NewsItem = ({ title, des, author, src, url, date }) => {
    return (
        <div className="blog-list mb-3 flex flex-wrap items-center border-b border-gray-300 pb-3 last:mb-0 last:border-0 last:pb-0 md:mb-4 md:pb-4 lg:mb-5 lg:pb-5">
            <div className="md:1/4 w-1/4 sm:w-1/3 lg:w-1/5">
                <figure className="relative max-w-5xl overflow-hidden">
                    <LoadingImg alt={title} className="h-full w-full object-cover rounded-full aspect-square" src={src} />
                </figure>
            </div>
            <div className="md:3/4 w-3/4 pl-2 sm:w-2/3 sm:pl-3 md:pl-5 lg:w-4/5 lg:pl-8">
                <div className="">
                    <Link to={url} target='_blank'>
                        <h4 className="mb-0 font-bold sm:mb-2 md:mb-3 text-lg xl:text-2xl"> {title}</h4>
                    </Link>
                    <div className="mb-1 sm:mb-3 md:mb-5 lg:mb-8">{des}</div>
                    <p className="text-sm text-light-dark flex items-center justify-start">
                        <i>{author}</i>
                        <span className='mx-4'>|</span>
                        <span>{date}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
