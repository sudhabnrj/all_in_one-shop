import React from "react";
import Slider from "react-slick";
import HomeSlider from './HomeSlider';
import useSlider from '../hooks/useSlider';
import { useSelector } from 'react-redux';
import SliderShimmer from './shimmer/SliderShimmer';
import SliderThumb from './SliderThumb';
import About from './About';
import HomeVideoBg from './HomeVideoBg';
import { ABOUT_SRCSET, ABOUT_IMG_SRC } from '../utils/constants';
import Service from './Service';
import {SliderData} from '../utils/mockData/SliderData';
import HomeVideo from '../assets/images/homeVideo.mp4'


const MainContainer = () => {
  // const displaySlider = useSelector((state)=> state.homeSlider.sliderData?.options?.slides);
  // console.log(displaySlider);
  // useSlider();

  // if(!displaySlider){
  //   return <SliderShimmer/>
  // }

  console.log(SliderData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='w-full mt-5'>
      <div className='flex flex-col'>
        <div className='container mx-auto sm:px-3 xl:px-0'>
          <section className='heroSlider overflow-hidden pb-8 lg:pb-5'>
            <Slider {...settings}>
              {SliderData && SliderData.map((item)=> {
                return (
                  <HomeSlider 
                    key={item?.Id} 
                    src={item?.src} 
                    className={`banner-slider`}
                  />
                )
              })}
            </Slider>
            <SliderThumb className={`hidden lg:flex`} />
          </section>
          <About 
            srcset={ABOUT_SRCSET}
            src={ABOUT_IMG_SRC}
            sizes='100vw' 
            url={'/partnership'}/>
          <HomeVideoBg src={HomeVideo}/>
        </div>
        <Service/>
      </div>
    </div>
  )
}

export default MainContainer
