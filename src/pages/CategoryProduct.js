import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useProductByCategory from '../hooks/useProductByCategory';
import { useParams, Link } from 'react-router-dom';
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ItemList from '../components/sidebar/ItemList';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ProductList from '../components/product/ProductList';
import Loader from '../components/Loader';
import { setIsGridView } from '../utils/productSlice';
import {priceRange} from '../utils/mockData/PriceFilterData';

const CategoryProduct = () => {
    const categoryProduct = useSelector((state)=> state.categoryList.productByCategory);
    const loading = useSelector((state)=> state.loader.loading);
    const { slug } = useParams();
    useProductByCategory(slug);
    const isGridView = useSelector((state)=> state.product.isGridView);
    const dispatch = useDispatch();
    
    const [ isAccordian, isSetAccordian ] = useState(true);
    const [filteredProduct, setFilteredProduct] = useState(categoryProduct);
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRange[0]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const totalPage = Math.ceil(categoryProduct.length / itemsPerPage);
    // console.log(totalPage);

    useEffect(()=> {
        setFilteredProduct(categoryProduct);
      }, [categoryProduct]);
    
      useEffect(()=> {
        handlePriceFilter(selectedPriceRange.min, selectedPriceRange.max);
    
      }, [selectedPriceRange]);

    const handleProductGridView = () => {
        dispatch(setIsGridView());
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const paginatedProducts = filteredProduct.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleItemsPerPage = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    const handleAccordian = () => {
        isSetAccordian(!isAccordian);
      }

    const handlePriceFilter = (min, max)=>{
        // setSelectedPriceRange(e.target.value);
        const priceFilterProduct = categoryProduct.filter((product)=> product.price >= min && product.price <= max);
        setFilteredProduct(priceFilterProduct);
        setCurrentPage(1);
        console.log(selectedPriceRange);
      }
    
      const handlePriceRangeChange = (price) => {
        setSelectedPriceRange(price);
        handlePriceFilter(price.min, price.max);
      }

    return (
        <section className='mb-8'>
            {loading && <Loader/>}
            <div className='container mx-auto px-3 xl:px-0'>
                <ul className="bredcrumb my-4 flex items-center rounded-full bg-light-gray p-2 capitalize leading-tight text-light-dark">
                    <BreadcumContainer pageName='Home' pageUrl={'/'} />
                    <BreadcumContainer pageName='Shop' pageUrl={'/shop/'} />
                    <BreadcumContainer pageName={slug}  />
                </ul>
                <div>
                    <h1 className='font-bold text-2xl mb-4'>Shop With Us</h1>
                    <div className='flex'>

                    <div className='w-1/4 pr-4 sidebar'>
                        <div className='flex flex-col border border-light-gray'>
                            <h4 className='border-b-light-gray border font-semibold text-lg px-3 py-2 capitalize flex justify-between items-center'>
                                Price {isAccordian ? <KeyboardArrowUpOutlinedIcon className='cursor-pointer' onClick={handleAccordian} /> :
                                <KeyboardArrowDownOutlinedIcon className='cursor-pointer' onClick={handleAccordian} />}
                            </h4>
                            {isAccordian && <ul>
                                {priceRange && priceRange.map((price, index)=> (
                                    <ItemList 
                                    key={index} 
                                    id={`item-${index}`} 
                                    value={`${price.min}-${price.max}`} 
                                    itemName={`$${price?.min} - $${price?.max}`} 
                                    checked={selectedPriceRange.min === price.min && selectedPriceRange.max === price.max}
                                    handleSelect={()=> handlePriceRangeChange(price)}
                                    />
                                ))}
                            </ul>}
                        </div>
                        </div>

                        <div className='w-3/4'>
                        <ul className='flex bg-light-gray p-4 shortingSection'>
                            <li className='mr-2'>
                            <button onClick={()=> handleProductGridView()} className={`w-10 h-10 ${!isGridView ? 'bg-white' : 'bg-gray-300'} hover:bg-white  flex items-center justify-center`}><GridViewOutlinedIcon /></button>
                            </li>
                            <li className='mr-3'>
                            <button onClick={()=> handleProductGridView()} className={`w-10 h-10 ${isGridView ? 'bg-white' : 'bg-gray-300'} bg-gray-300 hover:bg-white flex items-center justify-center`}><FormatListBulletedOutlinedIcon /></button>
                            </li>
                            <li className='mr-1 flex items-center justify-center'>
                            Items {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProduct.length)} of {filteredProduct.length}
                            </li>
                        </ul>

                            <div className={`grid ${!isGridView ? 'grid-cols-4' : 'grid-cols-1'} gap-8 mt-5`}>
                                {paginatedProducts && paginatedProducts.length > 0 ? (paginatedProducts.map((item)=> (
                                    <ProductList
                                        key={item.id}
                                        url={`/product/${item.id}`}                                       
                                        pWith = {`${!isGridView ? '' : 'overflow-hidden rounded border hover:shadow-md hidden h-[4.6rem] w-[4.6rem] sm:flex mr-3'}`}
                                        imgHeight={`${!isGridView ? 'min-h-[271px]' : 'min-h-[71px]'}`}
                                        hoverCondition={`${!isGridView ? 'absolute bottom-0 left-0 right-0 top-0 m-auto flex flex-col justify-end transition-all duration-300 hover:opacity-0 ' : '!hidden'}`}
                                        listRow={`${!isGridView ? '' : 'flex flex-row w-full text-left justify-between'}`}
                                        btnHeight={`${!isGridView ? '' : 'h-[48px]'}`}
                                        className={`${isGridView ? 'flex' : ''}`}                     
                                        sku={item.sku}
                                        pSrc={item.thumbnail} 
                                        pName={item.title}
                                        pPrice={item.price}
                                        warrantyInformation={item.warrantyInformation}
                                        availabilityStatus={item.availabilityStatus}
                                        items={item}
                                    />
                                ))) : (
                                    <h3 className="">No Product found!</h3>
                                )}
                            </div>

                            <div className='flex justify-start mt-8 w-full'>
                                <div className="paginationBlock flex flex-row flex-wrap justify-between rounded border bg-white p-2 sm:items-center md:bg-neutral-100 mb-4 md:mb-6 lg:mb-8 w-full">
                                <div className="pagination mt-2 flex items-center justify-center gap-2 sm:mt-0">
                                    <ul className="showItems flex items-center gap-2 text-center">
                                        {Array.from({ length: totalPage }, (_, index) => (
                                        <li 
                                            key={index} 
                                            value={index + 1} 
                                            className={`${currentPage === index + 1 ? 'active' : ''}`} 
                                            onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="showPerPage">
                                    <div className="flex items-center gap-2">
                                        <label>Show:</label>
                                        <select className="px-2 py-2 outline-none" value={itemsPerPage} onChange={handleItemsPerPage}>
                                            <option value="12">12 per page</option>
                                            <option value="24">24 per page</option>
                                            <option value="36">36 per page</option>
                                        </select>
                                    </div>
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </section>
    )
}

export default CategoryProduct
