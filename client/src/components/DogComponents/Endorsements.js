import React from "react";

export default function Endorsements({ dog, handleEndorsement }) {
   return (
     <div>
       <h3>Endorsements: {dog.endorsements}</h3>
       <button onClick={handleEndorsement}>Endorse {dog.name}</button>
     </div>
   );
 }
 