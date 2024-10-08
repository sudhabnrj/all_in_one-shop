import React from 'react';
import ProductList from '../product/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSearchSuggestion } from '../../utils/searchSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const SearchSuggestion = () => {
    const searchResult = useSelector((state) => state.search.searchResult.products);
    // const showSearchSuggestion = useSelector((state) => state.search.showSearchSuggestion);
    const loading = useSelector((state)=> state.loader.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleItemClick = (productId) => {
        dispatch(setShowSearchSuggestion(false));
        navigate(`/product/${productId}`);
        // console.log(productId);
    };

    return (
        <div className='search-suggestion absolute top-[140px] lg:top-[70px] 2xl:top-[90px] w-full left-0 right-0 z-10 p-5 h-[430px] overflow-y-auto shadow-lg bg-white pb-10 rounded-b-lg'>
            {loading && <Loader />}
            {searchResult && searchResult.length > 0 ? (
                <div className='grid grid-cols-1 mobile-480:grid-cols-2 gap-6 2xl:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 xl:gap-8 md:gap-4 mt-5'>
                    {searchResult.map((item) => (
                        <ProductList
                            key={item.id} 
                            onClick={() => handleItemClick(item.id)}
                            url={`/product/${item.id}`}
                            className=''                            
                            sku={item.sku}
                            pSrc={item.thumbnail} 
                            pName={item.title}
                            pPrice={item.price}
                            warrantyInformation={item.warrantyInformation}
                            availabilityStatus={item.availabilityStatus}
                            items={item}
                        />
                    ))}
                </div>
            ) : (
                <h1 className="text-3xl text-light-dark text-center">Sorry, no result found </h1>
            )}
        </div>
    )
}

export default SearchSuggestion;
