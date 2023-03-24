import React, { useState, useContext  } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../utils/UserContext'

function LoginModal() {
  
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("")
  const userContext = useContext(UserContext);
  
  console.log("===", loggedInUser)

  const handleFormSubmit  = async (e) => {
    e.preventDefault();

    try {
      const loginInput = {input:{email: email, password: password}}

      const mutationResponse = await login({variables: loginInput});

      const token = mutationResponse.data.login.token;
      const userID = mutationResponse.data.login.user.git;
      // console.log("token",token)
      // console.log("userID",userID)
      Auth.login(token);
      userContext.setLoggedInUser(userID);
      navigate(`/dashboard/${userID}`);
    } catch (err) {
      console.error(err);
      Swal('Oops!', 'Something went wrong!', 'error');

    }
  };



  return (
    <div>
      <h2>Login</h2>
      <form className="ourForms" onSubmit={handleFormSubmit}>
        <div className="formItemGroup ourGrid">
        <label htmlFor="username">User Name⦂</label>
        <input type="text" name="email" value={email} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="formItemGroup ourGrid">
        <label  htmlFor="password">Password⦂</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className='ourButton'>
          Login
        </button>
      </form>
    </div>

  )
}
export default LoginModal

