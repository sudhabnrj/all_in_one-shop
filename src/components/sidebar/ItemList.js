import React from 'react'

const ItemList = ({itemName, id, value,handleSelect, checked}) => {
    return (
        <li className='px-3 py-2 hover:bg-light-gray relative flex items-center'>
            <input checked={checked} onChange={handleSelect} className="absolute left-2" id={id} type="radio" value={value} name="priceRange" />
            <label className="w-full cursor-pointer p-1 pl-5 " htmlFor={id}>{itemName}</label>
        </li>
    )
}

export default ItemList
