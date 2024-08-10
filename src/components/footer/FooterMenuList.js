import React from 'react'
import { Link } from 'react-router-dom';

const FooterMenuList = ({title, url}) => {
    return (
        <li>
            <Link className='py-1 block' to={url}>{title}</Link>
        </li>
    )
}

export default FooterMenuList
