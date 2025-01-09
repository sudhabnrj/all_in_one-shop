import React, {useEffect, useState} from 'react'
import { BLOG_API_KEY, BLOG_API } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNewsList } from '../utils/newsSlice';

const useNewsList = () => {

    const dispatch = useDispatch();

    const [getCurrentDate, setGetCurrentDate] = useState('');

    const handleCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        setGetCurrentDate(`${yyyy}-${mm}-${dd}`);
    };

    useEffect(() => {
        handleCurrentDate(); // Set the current date when the component mounts
    }, []);

    useEffect(()=> {

        if (!getCurrentDate) return;

        const fetchBlogList = async () => {
            try{
                // const data = await fetch(`${BLOG_API}&q=all&from=${getCurrentDate}&sortBy=popularity`);
                const data = await fetch(`${BLOG_API}`);
                const json = await data.json();
                dispatch(addNewsList(json));
                console.log('News List:',json);
            }
            catch(error){
                console.error('Error fetching data',error);
            }
        };

        fetchBlogList();

    }, [getCurrentDate]);
}

export default useNewsList
