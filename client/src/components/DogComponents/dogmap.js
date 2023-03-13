// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useLazyQuery } from "@apollo/client";
import { GET_DOGS } from "../../utils/queries";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// on load we wan to query all the dogs from the database and render as markers on the map
// if user searches by location, we want to query all the dogs from the database that are in that location and render as markers on the map

function DogMap() {
    //this will be the query to get all the dogs from the database
    const [getDogs, { loading, data }] = useLazyQuery(GET_DOGS);
    //this will be the state that tracks the search input
    const [search, setSearch] = useState("");
    //this will be the state that tracks the filter input
    const [filter, setFilter] = useState("");
    //this will be the state that tracks the dogs that are rendered on the map
    const [dogs, setDogs] = useState([]);
    //this will be the state that tracks the location of the map
    const [position, setPosition] = useState([34.0195, -118.4912]);


  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "80%", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* //   this will be the search bar */}
      <input type="text" placeholder="Search by location" />
      <button>Search </button>

        {/* //   this will be the filter bar */}

    </div>
  );
}

export { DogMap };

// this page needs to render a map with leaflet all the dogs in the database will be pins on the map -- need to get location information from the database and render it on the map
// should call car component and render it on the map
// should have a search bar that allows you to search by location and render the dogs in that location on the map
// should have a filter that allows you to search by breed and render the dogs of that breed on the map
// should have a filter that allows you to search by play style and render the dogs of that play style on the map
// should have a filter that allows you to search by age and render the dogs of that age on the map
// should have a filter that allows you to search by size and render the dogs of that size on the map

// {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
// <TileLayer
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// />
// {dogs.map((dog) => (
//     <Marker
//     key={dog._id}
//     position={[dog.location.latitude, dog.location.longitude]}
//     icon={icon}
//     >
//     <Popup>
//         <h2>{dog.name}</h2>
//         <p>{dog.breed}</p>
//         <p>{dog.age}</p>
//         <p>{dog.size}</p>
//         <p>{dog.playStyle}</p>
//     </Popup>
//     </Marker>
// ))}
// </MapContainer> */}
