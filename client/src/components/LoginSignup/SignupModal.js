import React, { useState } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function SignupModal() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER);
  // console.log(username, email, address, password)

console.log("error", error)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("j", e)
    try {
      console.log("in try")
      const { data } = await addUser({
        variables: { 
          username: username, 
          location: location, 
          password: password },
      });
      console.log("data", data)
      Auth.login(data.addUser.token);
      Swal({
        title: 'Signup successful!',
        icon: 'success',
      });
    } catch (err) {
      console.log("catch err", err)
      Swal({
        title: 'Error!',
        text: err.message,
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

        <label htmlFor="address">Address:</label>
        <input type="text" id="location" name="location"  value={location} onChange={(e) => setLocation(e.target.value)}/>

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