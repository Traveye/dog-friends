import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries';

function UpdateUserForm({ userID, closeModal }) {
  console.log('userUpdateForm', userID);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: userID },
  });

  const [username, setUsername] = useState(data?.user.username || '');
  const [location, setLocation] = useState(data?.user.location || '');
  const [password, setPassword] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { updateUserId: userID, 
      ...((username && { username }) || {}),
      ...((location && { location }) || {}),
      ...((password && { password }) || {}),
    },
    onCompleted: () => {
      closeModal()
    },
  });

  console.log(error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleUpdate = () => {
    updateUser();
  };

  return (
    <div className="userFormContainer">
      <p>{data?.user.username}</p>
      <button onClick={() => setShowUsernameInput(true)}>🖍️</button>
      {showUsernameInput && (
        <>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </>
      )}

      <p>{data?.user.location}</p>
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
        </>
      )}

      <p>**********</p>
      <button onClick={() => setShowPasswordInput(true)}>🖍️</button>
      {showPasswordInput && (
        <>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}

export default UpdateUserForm;
