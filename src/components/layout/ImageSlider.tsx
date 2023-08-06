import {SetStateAction, useState, useEffect, useRef} from 'react'

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import {RxDotFilled} from 'react-icons/rx';

function ImageSlider() {
 
    const slides = [
        {url: '../../public/images/1.jpg'},
        {url: '../../public/images/2.jpg'},
        {url: '../../public/images/3.jpg'},
        {url: '../../public/images/4.jpg'},
        {url: '../../public/images/5.jpg'}
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    // eslint-disable-next-line prefer-const
    let slideRef = useRef<HTMLInputElement>(null);
    
    let slideInterval: NodeJS.Timer | NodeJS.Timeout | number;

    let i: number;
  
    useEffect(()=> {
        slideRef.current?.addEventListener("mouseenter", pauseSlide)
        slideRef.current?.addEventListener("mouseleave", autoPlay);
        pauseSlide();
        autoPlay();
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
    <div ref={slideRef} className="max-w-[1480px] h-[580px] w-full m-auto py-2 px-4 relative group">
        <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="w-full h-full rounded-2xl bg-center bg-cover transition-all duration-500"></div>

        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
    
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight size={30} onClick={nextSlide}/>
        </div>

        {/* Dots */}
        <div className="flex top-4 justify-center py-2">
            {slides.map((_slide, slideIndex) => (
                <div key={slideIndex} className='text-2xl cursor-pointer'><RxDotFilled onClick={() => (dotSlide(slideIndex))} /></div>
            ))}
        </div>

    </div>
    
  )
}
export default ImageSlider