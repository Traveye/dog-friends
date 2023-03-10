import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DogSearch from './components/DogSearch';
import DogProfile from './components/DogProfile';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});





function App() {
  return (
    <ApolloProvider>
      <Router>
        <Routes>
            <Route 
                path="/" 
                element={<Landing />}
              />
            <Route 
                path="/dashboard" 
                element={<Dashboard />}
              />
            <Route 
                path="/dogSearch" 
                element={<DogSearch />}
              />            
              <Route 
              path="/dogProfile" 
              element={<DogProfile />}
            />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
