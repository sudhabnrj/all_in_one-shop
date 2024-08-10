import {useEffect} from 'react'
import { PRODUCT_LIST_API } from '../utils/constants'; 
import { useDispatch } from 'react-redux';
import { addAllProducts } from '../utils/productSlice';
import { setLoading } from '../utils/loaderSlice';

const useAllProducts = () => {

    const dispatch = useDispatch();

    useEffect(()=> {

        const fetchAllProducts = async () => {
            dispatch(setLoading(true));
            try{
                const data = await fetch(PRODUCT_LIST_API);
                const json = await data.json();
                dispatch(addAllProducts(json.products));
                // console.log(json);
            }
            catch(error){
                console.error('Error fetching data',error);
            }
            finally{
                dispatch(setLoading(false));
            }
        };

        fetchAllProducts();

    }, [dispatch]);
}

export default useAllProducts;
