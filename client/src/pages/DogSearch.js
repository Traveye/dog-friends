
// only so that you can see all the 

//leaflet to render map
//! Queries
// get all dogs by location or all- 

//! Mutation 


import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import { QUERY_DOGS } from "../utils/queries";


// this page needs to render a map with leaflet all the dogs in the database will be pins on the map -- need to get location information from the database and render it on the map
// should call car component and render it on the map
// should have a search bar that allows you to search by location and render the dogs in that location on the map
// should have a filter that allows you to search by breed and render the dogs of that breed on the map
// should have a filter that allows you to search by play style and render the dogs of that play style on the map
// should have a filter that allows you to search by age and render the dogs of that age on the map
// should have a filter that allows you to search by size and render the dogs of that size on the map

const DogSearch = () => {
  //this is to keep track of the search input
  const [search, setSearch] = useState("");
  //this is to keep track of the search results
  const [searchResults, setSearchResults] = useState([]);
  
  //this is to return the dogs from the database
  const [getDogs, { loading, data }] = useLazyQuery(QUERY_DOGS);

  //this is to handle the search input
  const handleInputChange = (event) => {};

  //this is to handle the search submit
  const handleFormSubmit = (event) => {};

  //this is to render the search results to the leaflet map
  const renderSearchResults = () => {};
};