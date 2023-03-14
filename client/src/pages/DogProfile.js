// viewing other user dogs

//! Queries
//git single dog return all fields
// get single dog the user and all dogs associated with that dog
//! Mutation 
//update endorsement

// MVP drop down with owner and other dogs at bottom of the page

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DOG } from '../utils/queries';
import { UPDATE_ENDORSEMENT } from '../utils/mutations';

import Endorsements from '../components/DogComponents/Endorsements';
import DogHero from '../components/DogComponents/DogHero';
import DogMedia from '../components/DogComponents/DogMedia';
import OtherDogs from '../components/DogComponents/OtherDogs';

import Auth from '../utils/auth';


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

  // Update endorsement mutation
  const [updateEndorsement] = useMutation(UPDATE_ENDORSEMENT);

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
  // console.log(currentDog)

  return (
    <div>
      <div>
        { currentDog?.media ? <DogHero images={currentDog.media} /> :
        <div>Loading...</div>
        }
      </div>
      <div>
        {currentDog && (
          <Endorsements dog={currentDog} handleEndorsement={handleEndorsement} />
        )}
      </div>
      <div>
        <h3>{currentDog ? currentDog.name : <div>Loading...</div>}</h3>
        <p>
          {currentDog ? currentDog.description : null}
        </p>
      </div>
      <DogMedia images={ currentDog ? currentDog.media : <div>Loading...</div>} />

      <div>
        <OtherDogs owner={ currentDog ? currentDog.userReference : <div>Loading...</div>} />
      </div>
    </div>
  );
}

export default DogProfile;
