// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useLazyQuery } from "@apollo/client";
import { GET_DOGS } from "../../utils/queries";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const useGeocoder = (geocoder) => {
  const map = useMap();

    useEffect(() => {
    const control = L.Control.geocoder({
      defaultMarkGeocode: false,
      geocoder: geocoder,
    }).addTo(map);

    return () => {
      control.removeFrom(map);
    };
  }, [map, geocoder]);
};

function DogMap() {
  //this is to keep track of 
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [getDogs, { loading, data }] = useLazyQuery(GET_DOGS);

  const geocoder = L.Control.Geocoder.nominatim();


}

export { RenderMap };

// this page needs to render a map with leaflet all the dogs in the database will be pins on the map -- need to get location information from the database and render it on the map
// should call car component and render it on the map
// should have a search bar that allows you to search by location and render the dogs in that location on the map
// should have a filter that allows you to search by breed and render the dogs of that breed on the map
// should have a filter that allows you to search by play style and render the dogs of that play style on the map
// should have a filter that allows you to search by age and render the dogs of that age on the map
// should have a filter that allows you to search by size and render the dogs of that size on the map
