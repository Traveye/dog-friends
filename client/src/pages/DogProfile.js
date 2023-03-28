// viewing other user dogs

//! Queries
//git single dog return all fields
// get single dog the user and all dogs associated with that dog
//! Mutation 
//update endorsement

// MVP drop down with owner and other dogs at bottom of the page

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DOG } from '../utils/queries';
import { UPDATE_ENDORSEMENT } from '../utils/mutations';
// import EmailForm from '../components/UserComponents/EmailForm';
import Endorsements from '../components/DogComponents/Endorsements';
import DogHero from '../components/DogComponents/DogHero';
import DogMedia from '../components/DogComponents/DogMedia';
import OtherDogs from '../components/DogComponents/OtherDogs';
import { UserContext } from "../utils/UserContext";
import Auth from '../utils/auth';
import './DogProfile.css'


function DogProfile() {
  const { dogID } = useParams();
  const [currentDog, setCurrentDog] = useState(null); // Initialize to null
  console.log(currentDog)
  // Fetch dog data from server
  const { loading, data } = useQuery(GET_DOG, {
    variables: { dogId: dogID },
  });
  // const userContext = useContext(UserContext);
  useEffect(() => {
    if (data && data.dog) { // Check if data exists and contains dog property
      setCurrentDog(data.dog);
    }
  }, [data, dogID]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  // Update endorsement mutation
  const [updateEndorsement] = useMutation(UPDATE_ENDORSEMENT);
  const modalRef = useRef();
  const backdropRef = useRef();

  //this is for modal

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) ||
        (backdropRef.current && !backdropRef.current.contains(event.target))
      ) {
        setShowEmailForm(false);
       
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showEmailForm]);
  
  // Handle endorsement button click
  const handleEndorsement = async () => {
    try {
      await updateEndorsement({ variables: { dogID } });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  // const handleCloseEmailForm = () => {
  //   setShowEmailForm(false);
  // }

  return (
    <div className='container'>
      {Auth.loggedIn() ? (
        <div>
          <div>
            <DogHero images={currentDog?.media} />
          </div>
          <div className='main card'>
            <h3 id='dog-name'>{currentDog ? currentDog.name : <div>Loading...</div>}</h3>

          </div>
          <div className='info card'>
            <div className='mini card'>
            <p id='dog-breed'>{currentDog ? currentDog.breed : <div>Loading...</div>}</p>
            <p id='dog-play'>{currentDog ? currentDog.playStyle : <div>Loading...</div>}</p>
            </div>

            <div>
            <article id='dog-bio' className='card'>{currentDog ? currentDog.bio : <div>Loading...</div>}</article>
            
           <div>
           <a id='emailUser' className='card' href={`mailto:${currentDog?.userReference[0].email}`}>Email User to arrange a play date!</a>
          </div>

          {/* <>
            <button onClick={() => setShowEmailForm
            (true)}>Email User to arrange a play date!</button>
            {showEmailForm && (
              <>
              {" "}
              <div className="our-modal-backdrop" ref={backdropRef}>
                <div className="our-modal-content" ref={modalRef}>
                  {" "}
                  <EmailForm closeModal={handleCloseEmailForm} email={currentDog?.userReference[0].email}/>
                  </div>
                  </div>
              </>    
            )}
          </> */}



          
          </div>
          <DogMedia images={currentDog?.media} />
          
         

          </div>
          <div>
          </div>
        </div>
      ) : (
        // <Navigate to="/" />
        <div>Need to be logged in!</div>
      )}
    </div>
  );
}

export default DogProfile;
