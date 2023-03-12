// viewing other user dogs

//! Queries
//git single dog return all fields
// get single dog the user and all dogs associated with that dog
//! Mutation 
//update endorsement

// MVP drop down with owner and other dogs at bottom of the page

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DOG, UPDATE_ENDORSEMENT } from '../utils/queries';

import Endorsements from '../components/Endorsements';
import DogInfo from '../components/DogInfo';
// import OtherDogs from '../components/OtherDogs';


function DogProfile() {
  const { dogId } = useParams();

  // Fetch dog data from server
  const { loading, error, data } = useQuery(GET_DOG, {
    dogId: { dogId },
  });

  // Update endorsement mutation
  const [updateEndorsement] = useMutation(UPDATE_ENDORSEMENT);

  // Handle endorsement button click
  const handleEndorsement = async () => {
    try {
      await updateEndorsement({ dogId: { dogId } });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { dog } = data;

  return (
    <div>
      <div>
        <DogInfo dog={ dog } />
      </div>

      <div>
        <Endorsements dog={ dog } handleEndorsement={handleEndorsement} />
      </div>

      {/* <div>
        <OtherDogs user={user} />
      </div> */}
    </div>
  );
}

export default DogProfile;
