import React, { useState } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function SignupModal() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username, email, address, password },
      });
      Auth.login(data.addUser.token);
      Swal({
        title: 'Signup successful!',
        icon: 'success',
      });
    } catch (e) {
      Swal({
        title: 'Error!',
        text: e.message,
        icon: 'error',
      });
    }
  };

  
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>

        <label htmlFor="username" >User Name:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address"  value={address} onChange={(e) => setAddress(e.target.value)}/>

        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">
          Signup
        </button>

      </form>
    </div>
  )
}
export default SignupModal