import React from 'react'
import LoadingImg from './LoadingImg';

const HomeSlider = ({src, className, srcSet, sizes}) => {
    return (
        <picture>
            <source srcSet={srcSet} type="image/webp" />
            <LoadingImg role="presentation" loading="lazy" className={className} 
                src={src} 
                srcSet={srcSet} 
                sizes={sizes} alt='' 
            />
        </picture>    
    )
}

export default HomeSlider;