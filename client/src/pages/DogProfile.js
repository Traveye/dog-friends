// viewing other user dogs

//! Queries
//git single dog return all fields
// get single dog the user and all dogs associated with that dog
//! Mutation 
//update endorsement

// MVP drop down with owner and other dogs at bottom of the page

import React, {useState, useEffect, useRef } from 'react';
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
  const { dogId } = useParams();
  // const [currentDog, setCurrentDog] = useState({});
  
  // Fetch dog data from server
  const { loading, data } = useQuery(GET_DOG, {
    variables: { dogId: dogId },
  });
  // console.log(useQuery(GET_DOG, {
    //   variables: { dogId },
    // }))
    console.log(data);

  // useEffect( () => {
  //   if (data) {
  //      const dog = data.dogs.find((dogs) => dogs._id === dogId);
  //      setCurrentDog(dog);
  //   };
  //  },[data, dogId]);

  const { dog } = data




  
  // Update endorsement mutation
  const [updateEndorsement] = useMutation(UPDATE_ENDORSEMENT);

  // Handle endorsement button click
  const handleEndorsement = async () => {
    try {
      await updateEndorsement({ variables: { dogId } });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // const dog = currentDog

  return (
    <div>

      <div>
        <DogHero dog={ dog } />
      </div>
      <h2>{dog.name}</h2>
      <div>
        <Endorsements dog={ dog } handleEndorsement={handleEndorsement} />
      </div>
      <div>
        <p>
          { dog.bio }
        </p>
      </div>
      <DogMedia dogPhotos={ dog.media } />

      <div>
        <OtherDogs user={dog.userRef} />
      </div>
    </div>
  );
}

export default DogProfile;
