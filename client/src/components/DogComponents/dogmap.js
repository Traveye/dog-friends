// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_DOGS } from "../utils/queries";
import { Marker, Popup } from "react-leaflet";

export default function DogMap = () => {
    //this is to keep track of the search input
    const [search, setSearch] = useState("");
    //this is to keep track of the search results
    const [searchResults, setSearchResults] = useState([]);
    //this is to return the dogs from the database
    const [getDogs, { loading, data }] = useLazyQuery(QUERY_DOGS);
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
    const renderSearchResults = () => {
        if (data) {
            setSearchResults(data.dogs);
        }
    };
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
    //this is to render the popup on the map
    const renderPopup = () => {};
    //don't need to render map as that will be handled by map.js
    return (

    );


};