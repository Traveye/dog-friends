import React, { useState, useContext } from "react";
import Swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

function SignupModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  console.log("error", error);

  const validatePassword = () => {
    return new Promise((resolve, reject) => {
      if (password !== verifyPassword) {
        reject(
          Swal({
            title: "Error!",
            text: "Please verify your passwords match!",
            icon: "error",
          })
        );
      } else {
        resolve();
      }
    });
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await validatePassword();
    try {
      const AddUserInput = 
      { 
        input: { //declare input
        firstName: firstName, //Variables we are inputting* see typedefs for what is required/not
        lastName: lastName,
        email: email,
        location: location,
        password: password,
      }}
      const { data } = await addUser({ variables: AddUserInput });
      console.log("data", data);
      const userID = data.addUser.user._id;

      // userID = data.addUser.user._id;
      Auth.login(data.addUser.token);
      userContext.setLoggedInUser(userID);

      Swal({
        title: "Signup successful!",
        icon: "success",
      });
      navigate(`/dashboard/${userID}`);
    } catch (err) {
      console.log("catch err", err);
      Swal({
        title: "Error!",
        text: "Something went wrong, please try again!",
        icon: "error",
      });
    }
  };

  return (

    <div>
      <h2>Signup</h2>
      <form className="ourForms" onSubmit={handleFormSubmit}>
        <div className="formItemGroup ourGrid">
          <label htmlFor="firstName">
            First Name⦂
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="formItemGroup ourGrid">
          <label htmlFor="lastName">
            Last name⦂
          </label>
          <input
            type="text"
            name="Last"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="formItemGroup ourGrid">
          <label htmlFor="email">
            email⦂
          </label>
          <input
            type="text"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formItemGroup ourGrid">
          <label htmlFor="address">
            Address⦂
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="formItemGroup ourGrid">
          <label htmlFor="password">
            Password⦂
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="formItemGroup ourGrid">
          <label htmlFor="verifyPassword">
            Confirm Password⦂
          </label>
          <input
            type="password"
            id="verifyPassword"
            name="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}    
          />
        </div>

        <button type="submit" className="ourButton">Signup</button>
      </form>
    </div>
  );
}
export default SignupModal;
