import React, { createContext, useState } from 'react';
import AuthService from './auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(AuthService.loggedIn());
  const [loggedInUser, setLoggedInUser] = useState("")
  const [currentUser, setCurrentUser] = useState({});
console.log("+CurrentUser+", currentUser)
  function handleLogin(idToken) {
    AuthService.login(idToken);
    setLoggedIn(true);
  }

  function handleLogout() {
    AuthService.logout();
    setLoggedIn(false);
  }

  return (
    <UserContext.Provider value={{ loggedIn, handleLogin, handleLogout, loggedInUser, setLoggedInUser, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
