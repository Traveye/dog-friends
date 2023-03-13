
// only so that you can see all the 

//leaflet to render map
//! Queries
// get all dogs by location or all- 

//! Mutation 


import React from "react";
import { RenderMap } from "../components/DogComponents/map";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";


const DogSearch = () => {
    return (
        <div>
            <RenderMap />
        </div>
    );
};

export default DogSearch;

