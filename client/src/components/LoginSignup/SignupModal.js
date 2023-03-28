import React, { useState, useContext } from "react";
import Swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

function SignupModal() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);


  console.log("error", error);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("j", e);
    try {
      console.log(email, firstName, lastName, location, password )
      const { data } = await addUser({
        
        variables: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          location: location,
          password: password,
        },
      });
      console.log("data", data);
      const userID = data.addUser.user._id;

      userContext.login(data.addUser.token);
      userContext.handleLogin(data.addUser.token);
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
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form className="ourForms" onSubmit={handleFormSubmit}>

        <div className="formItemGroup ourGrid">
          <label htmlFor="email">
            Email⦂
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

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
            Last Name⦂
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

        <button type="submit" className="ourButton">Signup</button>
      </form>
    </div>
  );
}
export default SignupModal;
