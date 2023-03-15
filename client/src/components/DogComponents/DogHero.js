import React, { useState, useEffect } from "react";
import DogImg from "../DogComponents/DogImg"
import './DogHero.css'

export default function DogHero( {images} ) {
  console.log(images)

  const [bgUrl, setBgUrl] = useState("https://res.cloudinary.com/datl67gp3/image/upload/v1677896577/20221227_170719_guzznm.jpg");

  
  let smile;
  if(images){
    smile = images.find((image) => image.isProfile === true);
  }


  useEffect(() => {
    const bannerImage = images && images.find(image => image.isBanner === true);
    if (bannerImage && bannerImage.content) {
      setBgUrl(bannerImage.content);
    }
  }, [images]);

  const style = {
    backgroundImage: `url(${bgUrl})`,
  
  };

  return (
    <div className="banner-container">
      <div className='hero' style={style}>
        <DogImg prop={smile}/>
      </div>
    </div>
  );
}
