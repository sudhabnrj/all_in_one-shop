import React, {useEffect} from 'react'
import { BLOG_API_KEY, BLOG_API } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNewsList } from '../utils/newsSlice';

const useNewsList = () => {

    const dispatch = useDispatch();

    useEffect(()=> {

        const fetchBlogList = async () => {
            try{
                const data = await fetch(`${BLOG_API}q=all&from=2024-08-06&sortBy=popularity&apiKey=${BLOG_API_KEY}`);
                const json = await data.json();
                dispatch(addNewsList(json));
                console.log(json);
            }
            catch(error){
                console.error('Error fetching data',error);
            }
        };

        fetchBlogList();

    }, []);
}

export default useNewsList
