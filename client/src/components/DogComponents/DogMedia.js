import React, { useRef, useState, useEffect } from "react";
import './DogMedia.css'

export default function DogMedia({ images }) {
   const [slideIndex, setSlideIndex] = useState(0);
   const slideRef = useRef(null);
   
   const pics = images || [{ content: "https://res.cloudinary.com/datl67gp3/image/upload/v1677896577/20221227_170719_guzznm.jpg" }];

   const handlePrevClick = () => {
      if (slideIndex === 0) {
         setSlideIndex(pics.length - 1);
      } else {
         setSlideIndex(slideIndex - 1);
      }
   };

   const handleNextClick = () => {
      if (slideIndex === pics.length - 1) {
         setSlideIndex(0);
      } else {
         setSlideIndex(slideIndex + 1);
      }
   };

   const handleDotClick = (index) => {
      setSlideIndex(index);
   };

   useEffect(() => {
      if (slideRef.current) {
         slideRef.current.scrollTo({
            left: slideIndex * slideRef.current.offsetWidth,
            behavior: "smooth"
         });
      }
   }, [slideIndex]);

   return (
      <div className="dog-media">
         <div className="slide-container" ref={slideRef}>
            {pics.map((x, index) => (
               <div key={index} className="slide">
                  <div className="image-wrapper">
                  <img src={x.content} alt="doggy" />
                  </div>
               </div>
            ))}
         </div>
         <div className="dots">
            {pics.map((_, index) => (
               <span
                  key={index}
                  className={slideIndex === index ? 'dot active' : 'dot'}
                  onClick={() => handleDotClick(index)}
               />
            ))}
         </div>
         {/* <button className="prev" onClick={handlePrevClick}>
            LEFT
         </button>
         <button className="next" onClick={handleNextClick}>
            RIGHT
         </button> */}
      </div>
   );
}