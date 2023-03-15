import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext'
import howlr from '../../assets/HowlrTransparent.png'
import "./navigation.css"


function Navigation() {
  const navigate = useNavigate();
  const { loggedIn, handleLogout, loggedInUser } = useContext(UserContext);
  console.log("+++++",loggedIn)
  console.log("+++++", loggedInUser)

  return (
    <div id="navContainer">
    <img id="howlr" src={howlr} alt="Howler with the R as a dog cartoon"/>
    <div id="btnsContainer">
    <button className="btns" onClick={ () => navigate('/')}> Landing</button>
    <button className="btns" onClick={ () => navigate(`/dashboard/${loggedInUser}`)}> Dashboard</button>
    <button  className="btns" onClick={ () => navigate('/dogSearch')}> Search</button>
    <button  className="btns"onClick={handleLogout}>Log Out</button>
    </div>
    </div>
  )
}

export default Navigation;