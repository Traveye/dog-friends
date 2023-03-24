// viewing other user dogs

//! Queries
//git single dog return all fields
// get single dog the user and all dogs associated with that dog
//! Mutation 
//update endorsement

// MVP drop down with owner and other dogs at bottom of the page

import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DOG } from '../utils/queries';

import DogHero from '../components/DogComponents/DogHero';
import DogMedia from '../components/DogComponents/DogMedia';


import Auth from '../utils/auth';
import './DogProfile.css'


function DogProfile() {
  const { dogID } = useParams();
  const [currentDog, setCurrentDog] = useState(null); // Initialize to null
  console.log(dogID)
  // Fetch dog data from server
  const { loading, data } = useQuery(GET_DOG, {
    variables: { dogId: dogID },
  });

  useEffect(() => {
    if (data && data.dog) { // Check if data exists and contains dog property
      setCurrentDog(data.dog);
    }
  }, [data, dogID]);


  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(currentDog)

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
