import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {addSingleProduct} from '../utils/productSlice';
import { SINGLE_PRODUCT_API } from '../utils/constants';
import { setLoading } from '../utils/loaderSlice';

const useSingleProduct = (productId) => {
    const dispatch = useDispatch();

    useEffect(()=> {

        const fetchSingleProduct = async ()=> {
            dispatch(setLoading(true));
            try{
                const data = await fetch(SINGLE_PRODUCT_API + productId);
                const json = await data.json();
                dispatch(addSingleProduct(json));
                // console.log('single', json);                
            }
            catch(error){
                console.error('Error fetching with data', error);
            }
            finally{
                dispatch(setLoading(false));
            }
        };

        fetchSingleProduct();

    }, [productId, dispatch]);
}

export default useSingleProduct
