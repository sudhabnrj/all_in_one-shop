import React from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const UserInfo = ({ userName, userEmail }) => {
    return (
        <div className='flex flex-col text-center mb-8 bg-white'>
            <div className='w-20 h-20 rounded-full bg-light-gray flex justify-center items-center m-auto my-3'>
                <PersonOutlinedIcon className='!w-16 !h-16 text-gray-400'  />
            </div>
            {userName && <h3 className='text-black text-lg font-medium'>{userName}</h3>}
            <a href={`mailto:${userEmail}`}>{userEmail}</a>
        </div>
    )
}

export default UserInfo
