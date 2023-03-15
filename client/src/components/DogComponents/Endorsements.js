import React from "react";

export default function Endorsements({ dog, handleEndorsement }) {
   return (
     <div>
       <h3>www</h3>
       <button onClick={handleEndorsement}>Endorse {dog.name}</button>
     </div>
   );
 }
 