import React, { useState } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';



function LoginModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { err }] = useMutation(LOGIN_USER);


  const handleFormSubmit  = async (e) => {
    e.preventDefault();
   
    try {
      const mutationResponse = await login({
        variables: { username: username, password: password },
      });

      const token = mutationResponse.data.login.token;
      Auth.login(token);

    } catch (err) {
      console.error(err);
      Swal.fire('Oops!', 'Something went wrong!', 'error');
    }
  };

  
  return (
    <div className="modal">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>User Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
export default LoginModal


// not checking password issue in the resolvers