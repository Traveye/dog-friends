import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider,
  createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

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

// Screenshot_20221005-190041_Instagram_1_ylcgst
function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'datl67gp3'
    }
  });

const myImage = cld.image('IMG_5034_teojbe'); 
myImage.resize(fill().width(250).height(250));
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
