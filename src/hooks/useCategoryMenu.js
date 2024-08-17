import { useEffect } from 'react'
import { CATEGORY_API } from '../utils/constants';
import { setCategoryListData } from '../utils/cateoryListSlice';
import { useDispatch } from 'react-redux';

const useCategoryMenu = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchCategoryMenu = async () => {
            try{
                const data = await fetch(CATEGORY_API);
                const json = await data.json();
                dispatch(setCategoryListData(json));
                //console.log('Category Menu:',json);
            }
            catch(error){
                console.error(error);
            }
        };
        fetchCategoryMenu();
    }, []);
}

export default useCategoryMenu
