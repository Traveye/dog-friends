import React from "react";

export default function Endorsements({ endorsy, handleEndorsement }) {
  console.log(endorsy)
   return (
     <div>
       <h3>{endorsy.name}</h3>
       <button onClick={handleEndorsement}>+1!</button>
     </div>
   );
 }
 