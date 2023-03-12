import React, { useState, useRef } from "react";
import LoginModal from '../components/LoginSignup/LoginModal';
import SignupModal from '../components/LoginSignup/SignupModal';
import "../components/DogComponents/createDogForm.css"



function Landing() {

  const modalRef = useRef();
  const backdropRef = useRef();

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
    {showLogin && (<> <div className="modal-backdrop" ref={backdropRef}>
    <div className="modal-content" ref={modalRef}>
      <LoginModal onClose={handleCloseLogin}/>
      </div>
        </div>
        </>)}


    <button onClick={handleSignup}>Signup</button>
    {showSignup && (<> <div className="modal-backdrop" ref={backdropRef}>
    <div className="modal-content" ref={modalRef}>
      <SignupModal onClose={handleCloseSignup}/>
      </div>
        </div>
        </>)}
    </div>
  )
}

export default Landing;

