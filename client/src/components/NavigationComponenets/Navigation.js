import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext'


function Navigation() {
  const navigate = useNavigate();
  const { loggedIn, handleLogout, loggedInUser } = useContext(UserContext);
  console.log("+++++",loggedIn)
  console.log("+++++", loggedInUser)

  return (
    <div>
    <button  onClick={ () => navigate('/')}> Landing</button>
    <button onClick={ () => navigate(`/dashboard/${loggedInUser}`)}> Dashboard</button>
    <button  onClick={ () => navigate('/dogSearch')}> Search</button>
    <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Navigation;