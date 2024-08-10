import {useEffect} from 'react'
import { HOME_SLIDER } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addHomeSlider } from '../utils/sliderSlice';

const useSlider = () => {

    const dispatch = useDispatch();

    useEffect(()=> {
        const fetchSlider = async () => {
            try{
                const data = await fetch(HOME_SLIDER);
                const json = await data.json();
                dispatch(addHomeSlider(json['home-slider'][0].data?.blocks[0]?.component));
                //console.log(json['home-slider'][0]);

            }catch(error){
                console.error(error);
            }
        }
        fetchSlider();
        
    }, []);
}

export default useSlider
