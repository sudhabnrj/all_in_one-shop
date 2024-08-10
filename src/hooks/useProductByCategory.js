import { useEffect } from 'react'
import { PRODUCT_BY_CATEGORY_API } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setProductByCategory } from '../utils/cateoryListSlice';
import { setLoading } from '../utils/loaderSlice';

const useProductByCategory = (slug) => {
  const dispatch = useDispatch();

  useEffect(()=> {

    const fetchProductByCategory = async () =>{
      dispatch(setLoading(true));
        try{
            const response = await fetch(PRODUCT_BY_CATEGORY_API + slug);
            const json = await response.json();
            dispatch(setProductByCategory(json.products));
            // console.log('Product By Category', json.products);
        }
        catch(error){
            console.error('Error fetching Data', error);
        }
        finally{
          dispatch(setLoading(false));
        }
    }

    fetchProductByCategory();

  }, [slug, dispatch]);
}

export default useProductByCategory
