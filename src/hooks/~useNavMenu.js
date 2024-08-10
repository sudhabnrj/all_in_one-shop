import {useEffect} from 'react'
import { NAV_MENU } from '../utils/constants';
import { setNavMenuData } from '../utils/navMenuSlice';
import { useDispatch } from 'react-redux';

const useNavMenu = () => {
  const dispatch = useDispatch();
  useEffect(()=> {

    const fetchNavMenu = async () => {
        try{
            const data = await fetch(NAV_MENU);
            const json = await data.json();
            dispatch(setNavMenuData(json?.data));
            //console.log(json);
        }
        catch(error){
            console.error(error);
        }
    };
    fetchNavMenu();

  }, []);
}

export default useNavMenu
