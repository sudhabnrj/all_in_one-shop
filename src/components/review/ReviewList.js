import React from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';

const ReviewList = ({thumbnail, autherName, date, comments, rating}) => {
    return (
        <div className="flex justify-start items-start border-t border-gray-300 py-8">
            <div className="flex justify-center items-center">
                <span className='w-8 h-8 rounded-full bg-gray-400 flex justify-center items-center text-white'>
                    {thumbnail}
                </span>
            </div>
            <div className="ml-5 w-full">
                <div className="flex">
                    <div className="w-1/2">
                        <span className="font-bold text-xl">{autherName}</span>
                    </div>
                    <div className="w-1/2 flex justify-end items-start">
                        <span className="ess_r_post_date">{date}</span>
                    </div>
                </div>
                <div className="">
                    <span className='text-primary'>
                        {rating}
                    </span>
                </div>
                <div className="mb-5 pb-2 mt-3">
                    <p>{comments}</p>
                </div>
                <div className="">
                    <div className="w-full flex justify-start items-center">
                        <div className="flex justify-start items-center">
                            <span className="block text-gray-500 mr-4">Was This Review Helpful?</span>
                            <button className="text-gray-600 mr-4" type="button"><ThumbUpAltOutlinedIcon/></button>
                            <button className="text-gray-600" type="button"><ThumbDownAltOutlinedIcon/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewList
