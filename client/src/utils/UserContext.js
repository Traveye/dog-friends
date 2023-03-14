import React, { createContext, useState } from 'react';
import AuthService from './auth';

export const UserContext = createContext();

export function UserProvider(props) {
  const [loggedIn, setLoggedIn] = useState(AuthService.loggedIn());

  function handleLogin(idToken) {
    AuthService.login(idToken);
    setLoggedIn(true);
  }

  function handleLogout() {
    AuthService.logout();
    setLoggedIn(false);
  }

  return (
    <UserContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
      {props.children}
    </UserContext.Provider>
  );
}
