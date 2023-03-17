import React, { useState, useContext } from 'react';
import { useMutation,} from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { UserContext } from "../../utils/UserContext";

function UpdateUserForm({ userID, closeModal }) {
  console.log('userUpdateForm', userID);
  const userContext = useContext(UserContext);
  
console.log("3",userContext.currentUser.username)
  const [username, setUsername] = useState(userContext.currentUser.username || '');
  const [location, setLocation] = useState(userContext.currentUser.location || '');
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
 userContext.setCurrentUser({...userContext.currentUser, username})

      closeModal()
    },
  });


  const handleUpdate = () => {
    updateUser();
  };

  return (
    <div className="userFormContainer">
      <p>{userContext.currentUser.username}</p>
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

      <p>{userContext.currentUser.location}</p>
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
