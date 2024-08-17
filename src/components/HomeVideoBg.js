import React from 'react'
import { Link } from 'react-router-dom';
import VideoBg from './VideoBg';
// import { HOME_VIDEO_BG } from '../utils/constants';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const HomeVideoBg = ({src}) => {
  return (
    <section className="relative group">
        <Link to='/partnership'>
            <div className='relative group'>
                <VideoBg src={src} />
                <span className='bg-black hidden absolute w-full h-full left-0 top-0 bottom-0 transition-all bg-opacity-50 group-hover:block'></span>
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex text-white uppercase font-bold text-2xl items-center transition-all">Meet Our Team <ChevronRightOutlinedIcon className='!w-8 !h-8' /></span>
        </Link>
    </section>
  )
}

export default HomeVideoBg
