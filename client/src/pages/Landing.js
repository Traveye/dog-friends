import React, { useState } from "react";
import LoginModal from '../components/LoginSignup/LoginModal';
import SignupModal from '../components/LoginSignup/SignupModal';
//! Queries
// login === getUser 
//! Mutations
// signup === addUser username/password/location 


function Landing() {

  const[showSignup, setShowSignup] = useState(false)
  const[showLogin, setShowLogin] = useState(false)

  const handleSignup = () => {
    setShowSignup(true);
  }
  const handleLogin = () => {
    setShowLogin(true);
  }

  const handleCloseSignup = () => {
    setShowSignup(false);
  }
  const handleCloseLogin = () => {
    setShowLogin(false);
  }
  return (
    <div>
      <h1>HOWLER</h1>
    <button onClick={handleLogin}>LogIn</button>
    {showLogin && (
      <LoginModal onClose={handleCloseLogin}/>
    )}
    <button onClick={handleSignup}>Signup</button>
    {showSignup && (
      <SignupModal onClose={handleCloseSignup}/>
    )}
    </div>
  )
}

export default Landing;

