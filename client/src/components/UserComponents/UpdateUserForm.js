import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries';

function updateUserForm({ userID }) {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const { loading, data } = useQuery(GET_USER, {
    variables: {
      _id: userID,
    },
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleUsernameUpdate = () => {
    updateUser({
      variables: { _id: userID, username },
    });
    setShowUsernameInput(false);
  };

  const handleLocationUpdate = () => {
    updateUser({
      variables: { _id: userID, location },
    });
    setShowAddressInput(false);
  };

  const handlePasswordUpdate = () => {
    updateUser({
      variables: { _id: userID, password },
    });
    setShowPasswordInput(false);
  };



  if (loading) return <p>Loading...</p>;

  return (
    <div>

     <p>{data.getUser.username}</p>
        <button onClick={() => setShowUsernameInput(true)}>🖍️</button>
          {showUsernameInput && (
          <>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleUsernameUpdate}>Save</button>
          </>
          )}

      <p>{data.getUser.location}</p>
         <button onClick={() => setShowAddressInput(true)}>🖍️</button>
          {showAddressInput && (
          <>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleLocationUpdate}>Save</button>
          </>
          )}
  
      <p>**********</p>
        <button onClick={() => setShowPasswordInput(true)}>🖍️</button>
          {showPasswordInput && (  
          <>
            <input
              type="text" 
              id="password" 
              name="password"  
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordUpdate}>Save</button>
          </>
        )}

    </div>
  )
}

export default updateUserForm;