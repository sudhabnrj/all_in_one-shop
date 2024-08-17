import React, { useEffect, useState } from 'react'
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import useNewsList from '../hooks/useNewsList';
// import BlogSidebar from '../components/blog/BlogSidebar';
import NewsItem from './../components/blog/NewsItem';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice'

const Blog = () => {
    const loading = useSelector((state)=> state.loader.loading);
    const newsResult = useSelector((store)=> store.blog.list.articles) || [];
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    

    useNewsList();

    const filterNewsResult = newsResult.filter((item)=> item.urlToImage !== null && item.urlToImage !== '');

    //Total Page calculation
    const totalPage = Math.ceil(filterNewsResult.length / itemPerPage);

    

    useEffect(()=> {
        dispatch(setLoading(true));
        setTimeout(()=> {
            dispatch(setLoading(false));
        }, 1000);
    }, [dispatch]);
    
    if(!filterNewsResult){
        return <Loader/>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const paginatedList = filterNewsResult.slice(
        (currentPage - 1) * itemPerPage,
        currentPage * itemPerPage
    );

    const handleItemsPerPage = (e)=>{
        setItemPerPage(Number(e.target.value));
    }
    

    return (
        <section className='mb-8'>
            {loading && <Loader/>}
            <div className='container mx-auto px-3 xl:px-0'>
                <ul className="bredcrumb my-4 flex items-center rounded-full bg-light-gray p-2 capitalize leading-tight text-light-dark">
                    <BreadcumContainer pageName='Home' pageUrl={'/'} />
                    <BreadcumContainer pageName='Blog' />
                </ul>
                <div>
                    {/* <h1 className='font-bold text-2xl mb-4'>Blog</h1> */}
                    <div className="flex justify-start items-start mx-4 my-5 flex-wrap md:my-6 lg:my-8 lg:pt-1">
                        
                        {/* <div className="blog-cat w-full px-4 sm:w-1/3 lg:w-1/4 xl:w-1/5">
                            <BlogSidebar />
                        </div> */}
                            
                        <div className="mt-5 w-full px-4 sm:w-2/3 md:mt-0 lg:w-3/4 xl:w-4/5">
                            {paginatedList && paginatedList.map((item)=> (
                                <NewsItem key={item?.id} src={item?.urlToImage} title={item?.title} des={item?.description} url={item?.url} author={item?.author} date={item?.publishedAt.slice(0, 10)} />
                            ))}

                            <div className='flex justify-start mt-8 w-full'>
                                <div className="paginationBlock flex flex-row flex-wrap justify-between rounded border bg-white p-2 sm:items-center md:bg-neutral-100 mb-4 md:mb-6 lg:mb-8 w-full">
                                    <div className="pagination mt-2 flex items-center justify-center gap-2 sm:mt-0">
                                        <ul className="showItems flex items-center gap-2 text-center">
                                            {Array.from({length: totalPage}, (_, index)=> (
                                                <li
                                                    key={index}
                                                    value={index+1}
                                                    className={`${currentPage === index+1 ? 'active' : ''}`} 
                                                    onClick={()=> handlePageChange(index+1)}> {index+1}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="showPerPage">
                                        <div className="flex items-center gap-2">
                                            <label>Show:</label>
                                            <select className="px-2 py-2 outline-none" value={itemPerPage} onChange={handleItemsPerPage}>
                                                <option value="12">20 per page</option>
                                                <option value="24">50 per page</option>
                                                <option value="36">100 per page</option>
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

export default Blog
