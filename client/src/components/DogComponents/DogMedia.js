import React from "react";

export default function DogMedia({ images }) {
   console.log('walalalalalalalal', images)

   const pics = images || [{ content: "https://res.cloudinary.com/datl67gp3/image/upload/v1677896577/20221227_170719_guzznm.jpg"}]
   console.log(pics)




   return (
      <div className="photo card">
         {images?.map((pics, index) => (
            <div className="dog card">
               <img key={index} src={pics.content} alt='doggy' width='20%' />
            </div>
         ))}
      </div>
   );
}