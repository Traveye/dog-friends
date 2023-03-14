// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_DOGS } from "../../utils/queries";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// this is to fix the default icon issue with leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // specify the size of the icon image
  iconAnchor: [12, 41] // specify the anchor point of the icon image
});

L.Marker.prototype.options.icon = DefaultIcon;

//on load all dogs queired and added to the map as markers // doing this now
// this will require query to db and geocoding location to lat and long
// when user is logged in, map will auto zoom to their location
// user will also be able to search for a location and the map will zoom to that location
//dogs.userReference.location

function DogMap() {
  //this will be the query to get all the dogs from the database on load
  const { loading, data } = useQuery(GET_DOGS);
  //this will be the state that tracks the search input
  const [search, setSearch] = useState("");
  //this will be the state that tracks the filter input
  const [filter, setFilter] = useState("");
  //this will be the state that tracks the dogs that are rendered on the map
  const [dogs, setDogs] = useState([]);
  //this will be the state that tracks the location of the map
  // const [position, setPosition] = useState([34.0195, -118.4912]);

  useEffect(() => {
    if (data){
      setDogs(data.dogs);
    }
  }, [data]);

  console.log(dogs)

  //this will be the function that handles the search input
  const handleSearch = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <MapContainer
        center={[34.0195, -118.4912]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "80%", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
        {dogs.map((dog) => {
          const { location, name, breed } = dog;
            return (
            <Marker
              key={dog._id}
              position={[location[1], location[0]]} 
              icon={DefaultIcon}
            >
              <Popup>
                <h2>{name}</h2>
                <p>{breed}</p>
              </Popup>
            </Marker>
            );
        })}
        </MarkerClusterGroup>
      </MapContainer>
      {/* //   this will be the search bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by location"
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
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
