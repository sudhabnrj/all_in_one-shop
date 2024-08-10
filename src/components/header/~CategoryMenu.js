import React from 'react'
import './categoryMenu.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryMenu = () => {
    
    const categoryMenu = useSelector((state)=> state.navMenu.navMenuData)

    //console.log(categoryMenu);

    return (
        <nav className='bg-light-gray'>
            <div className='container mx-auto px-3 xl:px-0'>
                <div className='relative'>
                    <ul className='flex flex-col justify-start text-black md:flex-row'>
                        {categoryMenu && categoryMenu.map((menu, index)=> {
                            return(
                                <li key={index} className='categoryItem hasMegamenu hover:bg-black hover:text-white'>
                                    <div className='cursor-pointer text-center'>
                                        <Link to={`/${menu.slug}`} className='flex flex-col items-center p-4 font-bold leading-tight'>
                                            {menu?.name}
                                        </Link>
                                    </div>
                                    <div id="megaMenu" className="megaMenu absolute z-50 w-full rounded-b-lg border border-t-0 border-stone-300 bg-white text-black shadow-lg">
                                        <div className="flex flex-col justify-between md:flex-row md:py-4">
                                            <div className="submenus subMenuL1">
                                                <ul className="flex flex-col overflow-hidden overflow-y-auto text-black" style={{'height': '402px'}}>
                                                    {menu.children.map((children, index)=> {
                                                        return(
                                                            <li key={index} className="subMenuL1Item flex items-center justify-between hover:bg-lightodark-100 hover:shadow hover:bg-light-gray">
                                                                <div className="block cursor-pointer w-full px-4 py-2">{children.name}</div>
                                                                <span className="p-2">❯</span>
                                                                <div className="subMenuL2">
                                                                    {/* <ul className=" flex-col overflow-y-auto text-black">
                                                                        <li className="subMenuL2Item flex items-center justify-between hover:bg-light-gray hover:shadow">
                                                                            <div className="cursor-pointer w-full px-4 py-2 ">dfgdf</div>
                                                                            <span className="p-2">❯</span>
                                                                            <div className="subMenuL3">
                                                                                <ul className="flex flex-col overflow-y-auto text-black">
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Armature</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Armature Blocks and Clips</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Armature Coils</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Armature and Support</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Armature-Insulated Kit</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Balancing Ring</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Brass Sleeve</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Cover</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Disk</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Equalizer</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Key</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Splined Shaft</div>
                                                                                    </li>
                                                                                    <li className="subMenuL3Item hover:bg-light-gray hover:shadow">
                                                                                        <div className="link cursor-pointer w-full px-4 py-2">Split Ring</div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul> */}
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                        }

                        {/* <li className='categoryItem hasMegamenu hover:bg-black hover:text-white'>
                            <div className='cursor-pointer text-center'>
                                <span className='flex flex-col items-center p-4 font-bold leading-tight'>Liquid Insulation</span>
                            </div>
                        </li>
                        <li className='categoryItem hasMegamenu hover:bg-black hover:text-white'>
                            <div className='cursor-pointer text-center'>
                                <span className='flex flex-col items-center p-4 font-bold leading-tight'>Motors & Drives</span>
                            </div>
                        </li>
                        <li className='categoryItem hasMegamenu hover:bg-black hover:text-white'>
                            <div className='cursor-pointer text-center'>
                                <span className='flex flex-col items-center p-4 font-bold leading-tight'>Parts Equipment & Accessories</span>
                            </div>
                        </li>
                        <li className='categoryItem hasMegamenu hover:bg-black hover:text-white'>
                            <div className='cursor-pointer text-center'>
                                <span className='flex flex-col items-center p-4 font-bold leading-tight'>Wire and Cable</span>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default CategoryMenu
