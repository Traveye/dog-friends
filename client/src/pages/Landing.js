import React, { useState, useRef } from "react";
import LoginModal from '../components/LoginSignup/LoginModal';
import SignupModal from '../components/LoginSignup/SignupModal';
import "../components/DogComponents/createDogForm.css"
import howlr from '../assets/HowlrTransparent.png'
import './Landing.css'


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
    <div id="landingParent">
      
    <div id="landingContainer">
      <p><img id="howlrP" src={howlr} alt="Howler with the R as a dog cartoon"/> is a wonderful platform for dog owners who are looking for playmates for their furry friends. By creating an account and adding information about their dogs, users can easily search for other dogs in their area and arrange playdates. This not only provides an opportunity for dogs to socialize and exercise, but also helps to foster a sense of community among dog owners. Whether you're new to an area and looking to make friends for your pup, or simply want to expand your dog's social circle, your website offers a convenient and user-friendly solution.</p>



    <button className="landingbtn" onClick={handleLogin}>LogIn</button>
    {showLogin && (<> <div className="modal-backdrop" ref={backdropRef}>
    <div className="modal-content" ref={modalRef}>
      <LoginModal onClose={handleCloseLogin}/>
      </div>
        </div>
        </>)}


    <button className="landingbtn" onClick={handleSignup}>Signup</button>
    {showSignup && (<> <div className="modal-backdrop" ref={backdropRef}>
    <div className="modal-content" ref={modalRef}>
      <SignupModal onClose={handleCloseSignup}/>
      </div>
        </div>
        </>)}
    </div>
    </div>
  )
}

export default Landing;

