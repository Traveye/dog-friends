
// only so that you can see all the 

//leaflet to render map
//! Queries
// get all dogs by location or all- 

//! Mutation 


import React from "react";
import renderMap from "../components/DogComponents/map";
import DogMap from "../components/DogComponents/dogmap";




//this needs to take the renderMap and dogMap components and render them on the page
const DogSearch = () => {
    return (
        <div>
            <renderMap />
            <DogMap />
        </div>
    );
};