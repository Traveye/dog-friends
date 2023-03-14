import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext'


function Navigation() {
  const navigate = useNavigate();
  const { loggedIn, logout } = useContext(UserContext);
  console.log(loggedIn)

  return (
    <div>
    <button  onClick={ () => navigate('/')}> Landing</button>
    <button onClick={ () => navigate('/dashboard/:userID')}> Dashboard</button>
    <button  onClick={ () => navigate('/dogSearch')}> Search</button>
    <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Navigation;