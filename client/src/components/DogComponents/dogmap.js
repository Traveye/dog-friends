// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_DOGS } from "../../utils/queries";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

export default function DogMap() {
    //this is to keep track of the search input
    const [search, setSearch] = useState("");
    //this is to keep track of the search results
    const [searchResults, setSearchResults] = useState([]);
    //this is to return the dogs from the database
    const [getDogs, { loading, data }] = useLazyQuery(GET_DOGS);
    // this 
    const [geocoder, setGeocoder] = useState(null);

    //this is to handle the search input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value });
    };
    //this is to handle the search submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        getDogs({ variables: { search: search } });
    };
    //this is to render the search results to the leaflet map
    const renderSearchResults = (data) => {
        if (data) {
            setSearchResults(data.dogs);
        }
    };

    useEffect(() => {
        renderSearchResults(data);
        console.log(data);
    }, [data]);
    
    //this is to render the markers on the map
    const renderMarkers = () => {
        return searchResults.map((dog) => {
            return (
                <Marker position={[dog.location.latitude, dog.location.longitude]}>
                    <Popup>
                        <h1>{dog.name}</h1>
                        <h2>{dog.breed}</h2>
                        <h3>{dog.age}</h3>
                        <h4>{dog.size}</h4>
                        <h5>{dog.playStyle}</h5>
                    </Popup>
                </Marker>
            );
        });
    };

    //don't need to render map as that will be handled by map.js
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input  type="text" name="search" onChange={handleInputChange} />
                <button type="submit">Search</button>
            </form>
            {renderSearchResults()}
            {renderMarkers()}
        </div>
    );


};


// this page needs to render a map with leaflet all the dogs in the database will be pins on the map -- need to get location information from the database and render it on the map
// should call car component and render it on the map
// should have a search bar that allows you to search by location and render the dogs in that location on the map
// should have a filter that allows you to search by breed and render the dogs of that breed on the map
// should have a filter that allows you to search by play style and render the dogs of that play style on the map
// should have a filter that allows you to search by age and render the dogs of that age on the map
// should have a filter that allows you to search by size and render the dogs of that size on the map