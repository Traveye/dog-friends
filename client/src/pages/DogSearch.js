
// only so that you can see all the 

//leaflet to render map
//! Queries
// get all dogs by location or all- 

//! Mutation 


import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import { QUERY_DOGS } from "../utils/queries";

const DogSearch = () => {
  const [searchedDogs, setSearchedDogs] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [getDogs, { loading, data }] = useLazyQuery(QUERY_DOGS);

  const handleChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDogs({ variables: { location: searchLocation } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const dogs = data?.dogs || [];

  setSearchedDogs(dogs);

  return (
    <div>
      <h2>Search for a dog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a dog by location"
          value={searchLocation}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchedDogs.map((dog) => (
          <div key={dog._id}>
            <h3>{dog.name}</h3>
            <p>{dog.breed}</p>
            <p>{dog.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogSearch;
