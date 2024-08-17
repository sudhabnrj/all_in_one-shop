import React, {useEffect} from 'react'
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import { setLoading } from '../utils/loaderSlice';
import LoadingImg from '../components/LoadingImg';
import MarketsItems from '../components/markets/MarketsItems';

const Markets = () => {
    const loading = useSelector((state)=> state.loader.loading);
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(setLoading(true));
      setTimeout(()=> {
          dispatch(setLoading(false));
      }, 1000);

  }, [dispatch]);

    return (
      <section className='mb-8'>
        {loading && <Loader/>}
        <div className='container mx-auto px-3 xl:px-0'>
          <ul className="bredcrumb my-4 flex items-center rounded-full bg-light-gray p-2 capitalize leading-tight text-light-dark">
            <BreadcumContainer pageName='Home' pageUrl={'/'} />
            <BreadcumContainer pageName='Markets' />
          </ul>
          <div>
            <h1 className='font-bold text-2xl mb-4'><span className="redTriangle"></span><span>Markets</span></h1>
            <div className='flex flex-col'>
                <p> We offer a complete portfolio of <span>next-generation solutions</span> to meet
                    the needs of our customers and serve as a <span>leading value-added distributor</span>of materials and supply chain results.
                </p>
                <MarketsItems />              
            </div>
          </div>
        </div>
      </section>
    )
}

export default Markets
