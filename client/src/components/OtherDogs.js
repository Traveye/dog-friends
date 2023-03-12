import Swal from ''

export default function OtherDogs({ user, otherDogs }) {
   const handleOwnerClick = () => {
     // Create a list of dog names
     const dogNames = otherDogs.map((dog) => dog.name).join(', ');
 
     // Show a SweetAlert modal with the list of dog names
     Swal.fire({
       title: `Other dogs owned by ${user.username}:`,
       text: dogNames,
       icon: 'info',
     });
   };
 
   return (
     <div>
       <h3 onClick={handleOwnerClick}>Other dogs owned by {user.username}:</h3>
       <ul>
         {otherDogs.map((otherDog) => (
           <li key={otherDog.id}>{otherDog.name}</li>
         ))}
       </ul>
     </div>
   );
 }