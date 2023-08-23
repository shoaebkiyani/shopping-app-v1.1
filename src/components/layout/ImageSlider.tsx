import {SetStateAction, useState, useEffect, useRef} from 'react'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx';

function ImageSlider() {

    const slides = [
        {url: '../../public/images/slider/slider_1.jpg'},
        {url: '../../public/images/slider/slider_2.jpg'},
        {url: '../../public/images/slider/slider_3.jpg'},
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const slideRef = useRef<HTMLInputElement>(null);
    
    let slideInterval: NodeJS.Timer | NodeJS.Timeout | number;

    let i: number;
  
    useEffect(()=> {
        slideRef.current?.addEventListener('mouseenter', pauseSlide)
        slideRef.current?.addEventListener('mouseleave', autoPlay);
        pauseSlide();
        autoPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const autoPlay = () => {
       slideInterval = setInterval(()=>{
            if(i <= slides.length - 1){
                dotSlide(i);
                i = i+1
                
            }  else {
                i = 0;
            }
        },5000)
    }

    const pauseSlide = () => {
        clearInterval(slideInterval);
    }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const dotSlide = (slideIndex: SetStateAction<number>) => {
        setCurrentIndex(slideIndex);
    }
   
  return (
    <>
    <div className='xs:flex-wrap flex sm:h-[280px] md:h-[350px] lg:h-[400px]'>
        <div ref={slideRef} onMouseOver={pauseSlide} className='w-full xs:h-[280px] lg:h-[400px] relative group'>
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className='h-full bg-cover bg-no-repeat transition-all duration-500'></div>
            
            {/* Left Arrow */}
            <div className='group-hover:block absolute flex top-[45%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft size={30} onClick={prevSlide} />
            </div>
    
            {/* Right Arrow */}
            <div className='group-hover:block absolute flex top-[45%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight size={30} onClick={nextSlide}/>
            </div>


            {/* Dots */}
            <div className='flex top-4 justify-center py-2 my-[-50px] text-zinc-200'>
            {slides.map((_slide, slideIndex) => (
                <div key={slideIndex} className='text-2xl cursor-pointer'><RxDotFilled onClick={() => (dotSlide(slideIndex))} /></div>
                ))}
            </div>
        </div>
        <div className='sm:h-[280px] md:h-[350px] lg:h-[400px]'>
               <img className='w-full h-[50%]' src='../public/images/banner/banner_1.jpg' alt='banner' />
               <img className='w-full h-[50%]' src='../public/images/banner/banner_2.jpg' alt='banner' />
        </div>
    </div>
    </>
  )
}
export default ImageSlider