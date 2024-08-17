import React from 'react'
import LoadingImg from './LoadingImg';

const HomeSlider = ({src, className, srcSet, sizes}) => {
    return (
        <picture>
            <source srcSet={srcSet} type="image/webp" />
            <LoadingImg 
                className={`${className}`} 
                src={src} 
                srcSet={srcSet} 
                size={sizes} 
                alt='' 
            />
        </picture>    
    )
}

export default HomeSlider;