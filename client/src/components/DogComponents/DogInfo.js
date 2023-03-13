import React from "react";

export default function DogInfo({ dog }) {
   return (
      <div>
         <h1>{dog.name}'s Profile</h1>
         <div>{dog.playstyle}</div>
         <div>
         <p>{dog.bio}</p>
         </div>
      </div>
   );
}

