// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect } from "react";
import { MapContainer, useMap } from "react-leaflet";
import { useLazyQuery } from "@apollo/client";
import { GET_DOGS } from "../../utils/queries";
import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const useGeocoder = (geocoder) => {
  const map = useMap();

  React.useEffect(() => {
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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [getDogs, { loading, data }] = useLazyQuery(GET_DOGS);
  const geocoder = L.Control.Geocoder.nominatim();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getDogs({ variables: { search: search } });
  };

  useEffect(() => {
    const getSearchResults = async (data) => {
      if (data) {
        const dogs = data.dogs;
        for (let dog of dogs) {
          const results = await geocoder.geocode(dog.userReference.location);
          dog.location = results[0].center;
          console.log(dog.location);
        }
        setSearchResults(dogs);
      }
    };
    getSearchResults(data);
  }, [data, geocoder]);

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

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="search" onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {renderMarkers()}
    </div>
  );
}

function RenderMap() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DogMap />
    </MapContainer>
  );
}

export { RenderMap };


// this page needs to render a map with leaflet all the dogs in the database will be pins on the map -- need to get location information from the database and render it on the map
// should call car component and render it on the map
// should have a search bar that allows you to search by location and render the dogs in that location on the map
// should have a filter that allows you to search by breed and render the dogs of that breed on the map
// should have a filter that allows you to search by play style and render the dogs of that play style on the map
// should have a filter that allows you to search by age and render the dogs of that age on the map
// should have a filter that allows you to search by size and render the dogs of that size on the map
