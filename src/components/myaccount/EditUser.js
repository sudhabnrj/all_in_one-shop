import React from 'react'

const EditUser = ({}) => {
    return (
        <form>
             <input 
                type='text' 
                placeholder='First Name' 
                name='firstName' 
                className="border border-transparent text-md px-4 py-3 w-full rounded-md focus:border-secondary outline-none mr-2" 
                // ref={firstName}
            />
        </form>
    )
}

export default EditUser
