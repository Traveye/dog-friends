import React, { useState, useContext } from 'react';
import { useMutation,} from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { UserContext } from "../../utils/UserContext";

function UpdateUserForm({ userID, closeModal }) {
  console.log('userUpdateForm', userID);
  const userContext = useContext(UserContext);
  

  const [email, setEmail] = useState(userContext.currentUser.email || '');
  const [firstName, setFirstName] = useState(userContext.currentUser.firstName || '');
  const [lastName, setLastName] = useState(userContext.currentUser.lastName || '');
  const [location, setLocation] = useState(userContext.currentUser.location || '');
  const [password, setPassword] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showFirstNameInput, setShowFirstNameInput] = useState(false);
  const [showLastNameInput, setShowLastNameInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { updateUserId: userID, 
      ...((email && { email }) || {}),
      ...((firstName && { firstName }) || {}),
      ...((lastName && { lastName }) || {}),
      ...((location && { location }) || {}),
      ...((password && { password }) || {}),
    },
    onCompleted: () => {
 userContext.setCurrentUser({...userContext.currentUser, email, firstName, lastName, location, password})

      closeModal()
    },
  });


  const handleUpdate = () => {
    updateUser();
  };

  return (
    <div className="userFormContainer">

      <p>{userContext.currentUser.email}</p>
      <button className='ourButton' onClick={() => setShowEmailInput(true)}>🖍️</button>
      {showEmailInput && (
        <>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}

      <p>{userContext.currentUser.firstName}</p>
      <button className='ourButton' onClick={() => setShowFirstNameInput(true)}>🖍️</button>
      {showFirstNameInput && (
        <>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </>
      )}

      <p>{userContext.currentUser.lastName}</p>
      <button className='ourButton' onClick={() => setShowLastNameInput(true)}>🖍️</button>
      {showLastNameInput && (
        <>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
      )}

      <p>{userContext.currentUser.location}</p>
      <button className='ourButton' onClick={() => setShowAddressInput(true)}>🖍️</button>
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
      <button className='ourButton' onClick={() => setShowPasswordInput(true)}>🖍️</button>
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
      <button className='ourButton' onClick={handleUpdate}>Save</button>
    </div>
  );
}

export default UpdateUserForm;
