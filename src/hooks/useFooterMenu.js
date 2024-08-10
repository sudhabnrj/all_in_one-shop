import {useEffect} from 'react'
import { menuList } from '../utils/mockData/FooterMenuData';
import { useDispatch } from 'react-redux';
import {addFooterMenu} from '../utils/footerSlice';

const useFooterMenu = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        
        const fetchfooterMenu= async () => {
            try{
                const json = await menuList;
                dispatch(addFooterMenu(json.data));
                //console.log(json.data);
            }
            catch(error){
                console.error("Error fetching data", error);
            }
        };

        fetchfooterMenu();

    }, []);
}

export default useFooterMenu;
