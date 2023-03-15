import React, { useRef, useState} from "react";
import './DogMedia.css'

export default function DogMedia({ images }) {
   console.log('walalalalalalalal', images)
const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef(null);

  const pics = images || [{ content: "https://res.cloudinary.com/datl67gp3/image/upload/v1677896577/20221227_170719_guzznm.jpg"}];

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

  const handleSlideChange = () => {
    if (slideRef.current) {
      setSlideIndex(slideRef.current.scrollLeft / slideRef.current.offsetWidth);
    }
  };

  return (
    <div className="dog-media">
      <div className="slide-container" ref={slideRef} onScroll={handleSlideChange}>
        {pics.map((x, index) => (
          <div key={index} className="slide">
            <img src={x.content} alt="doggy" />
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
      <button className="prev" onClick={handlePrevClick}>
        &#10094;
      </button>
      <button className="next" onClick={handleNextClick}>
        &#10095;
      </button>
    </div>
  );
}