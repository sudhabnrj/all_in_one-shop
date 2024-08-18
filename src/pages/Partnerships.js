import React, {useEffect} from 'react'
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import { setLoading } from '../utils/loaderSlice';
import LoadingImg from '../components/LoadingImg';

const Partnerships = () => {
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
            <BreadcumContainer pageName='Supplier Partnerships' />
          </ul>
          <div>
            <h1 className='font-bold text-2xl mb-4'><span class="redTriangle"></span><span>Supplier Partnerships</span></h1>
            <div className='flex flex-col'>
              <p>We believe in partnerships. Finding high-quality products and premier companies interested in a lasting partnership with Essex Brownell is our m.o. The ultimate goal is to provide our customers with unmatched products and services. Our partnerships are mutually beneficial, driving us all to do better.</p>
              <p className='my-5'>We have the breadth and the depth to provide lots of solutions within many different industries. As a global distributing leader, we have the capacity to offer a plethora of products as well as comprehensive solutions for our customer’s business needs.</p>
              <picture className='w-1/2 mx-auto'>
                <LoadingImg alt='img' src="https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0" /></picture>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Partnerships
