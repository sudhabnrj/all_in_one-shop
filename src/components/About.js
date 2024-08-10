import React from 'react'
import { Link } from 'react-router-dom';
import LoadingImg from './LoadingImg';

const About = ({ srcset, src, sizes, url }) => {
  return (
    <section className='my-10 shadow-xl relative group '>
        <picture className=''>
            <source srcSet={srcset} type="image/webp" />
            <LoadingImg role="presentation" loading="lazy" className="max-w-full" 
            src={src} 
            srcSet={srcset} sizes={sizes} alt='' />
        </picture>
        <Link to={url} className='absolute bottom-5 left-5 rounded-full bg-primary border border-red-400 text-white py-2 px-6 group-hover:px-10 transition-all group-hover:border-red-300'>Learn More</Link>
    </section>
  )
}

export default About
