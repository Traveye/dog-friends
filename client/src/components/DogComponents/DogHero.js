import React, { useState, useEffect } from "react";
import DogImg from "../DogComponents/DogImg"

export default function DogHero(images) {

   console.log(images)
//   const [bgUrl, setBgUrl] = useState("");

//   useEffect(() => {
//     if (currentDog[0].content) {
//       setBgUrl(currentDog[0].content);
//     }
//   }, [currentDog]);

  const style = {
   //  backgroundImage: `url(${bgUrl})`,
   //  backgroundSize: "cover",
    height: "400px",
    width: "100%"
  };

  return (
    <div style={style}>
      <div>
        {/* <DogImg /> */}
      </div>
    </div>
  );
}

