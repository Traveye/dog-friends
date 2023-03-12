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
import { GET_DOG } from '../utils/queries';
import { UPDATE_ENDORSEMENT } from '../utils/mutations';

function DogProfile() {
  const { dogId } = useParams();

  // Fetch dog data from server
  const { loading, error, data } = useQuery(GET_DOG, {
    variables: { dogId },
  });

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { dog, user } = data;

  return (
    <div>
      <h1>{dog.name}'s Profile</h1>
      <p>{dog.bio}</p>

      <h2>Owned by {user.username}</h2>

      <h3>Endorsements: {dog.endorsements}</h3>
      <button onClick={handleEndorsement}>Endorse {dog.name}</button>

      <h3>Other dogs owned by {user.username}:</h3>
      {/* <ul>
        {otherDogs.map((otherDog) => (
          <li key={otherDog.id}>{otherDog.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default DogProfile;
