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


const MainContainer = () => {
  const displaySlider = useSelector((state)=> state.homeSlider.sliderData?.options?.slides);
  //console.log(displaySlider);
  useSlider();

  if(!displaySlider){
    return <SliderShimmer/>
  }

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
        <div className='container mx-auto px-3 xl:px-0'>
          <section className='heroSlider'>
            <Slider {...settings}>
              {displaySlider && displaySlider.map((item, index)=> {
                return (
                  <HomeSlider 
                    key={index} 
                    src={item?.content[0]?.component?.options?.image} 
                    className={`max-w-full w-full min-h-[617px]`}
                    srcSet={item?.content[0]?.component?.options?.srcset}
                    sizes={item?.content[0]?.component?.options?.sizes}
                  />
                )
              })}
            </Slider>
            <SliderThumb/>
          </section>
          <About 
            srcset={ABOUT_SRCSET}
            src={ABOUT_IMG_SRC}
            sizes='100vw' 
            url={'/one-essex'}/>
          <HomeVideoBg/>
        </div>
        <Service/>
      </div>
    </div>
  )
}

export default MainContainer
