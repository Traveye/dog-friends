import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider,
  createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DogSearch from './pages/DogSearch';
import DogProfile from './pages/DogProfile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
            <Route 
                path="/" 
                element={<Landing />}
              />
            <Route 
                path="/dashboard/:userID" 
                element={<Dashboard />}
              />
            <Route 
                path="/dogSearch" 
                element={<DogSearch />}
              />            
              <Route 
              path="/dogProfile/:dogID" 
              element={<DogProfile />}
            />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
