import {useEffect} from 'react';
import { SEARCH_PRODUCT_API } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addSerachResult} from '../utils/searchSlice';
import { setLoading } from '../utils/loaderSlice';

const useSearch = (searchQuery) => {
    const dispatch = useDispatch();

    useEffect(()=> {

        if(!searchQuery) return; 

        const fetchSearchResult = async () => {
            dispatch(setLoading(true));
            try{
                const data = await fetch(SEARCH_PRODUCT_API + searchQuery);
                const result = await data.json();
                dispatch(addSerachResult(result));
                // console.log('Search Result', result);
            }
            catch(error){
                console.error('Error fetching Data:', error);
            }
            finally{
                dispatch(setLoading(false));
            }
        };

        const debounce = setTimeout(() => {
            fetchSearchResult();
        }, 300);

        return ()=> {
            clearTimeout(debounce);
        }

    }, [searchQuery, dispatch]);
}

export default useSearch
