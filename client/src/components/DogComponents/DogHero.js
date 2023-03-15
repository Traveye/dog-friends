import React, { useState, useEffect } from "react";
import DogImg from "../DogComponents/DogImg"

export default function DogHero( images ) {
  console.log(images)

  // const [bgUrl, setBgUrl] = useState("https://res.cloudinary.com/datl67gp3/image/upload/v1677896577/20221227_170719_guzznm.jpg");

  // useEffect(() => {
  //   const bannerImage = images.find(image => image.isBanner === true);
  //   if (bannerImage && bannerImage.content) {
  //     setBgUrl(bannerImage.content);
  //   }
  // }, [images]);

  const style = {
    // backgroundImage: `url(${bgUrl})`,
    // backgroundSize: "cover",
    height: "400px",
    width: "100%"
  };

  return (
    <div style={style}>
      <div>
        <DogImg />
      </div>
    </div>
  );
}

