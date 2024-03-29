// this coponent's responsibility is to query all the dogs from the database and provide markers for the map based on the data received. it will be passed to the map component as a prop.
// It should also handle interactions with the map, such as clicking on a marker to view the dog's profile.
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_DOGS } from "../../utils/queries";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/dogmap.module.css"

// this is to fix the default icon issue with leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // specify the size of the icon image
  iconAnchor: [12, 41], // specify the anchor point of the icon image
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
  //this will be the state that tracks the dogs that are rendered on the map
  const [dogs, setDogs] = useState([]);
  //this will be the ref that will be used to jump the map to a location on search
  const mapJump = useRef(null);

  useEffect(() => {
    if (data) {
      setDogs(data.dogs);
    }
  }, [data]);

  console.log(dogs);

  //this will be the function that handles the search input
  const handleSearch = async (event) => {
    event.preventDefault();
    const MAPBOX_TOKEN = "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";
    console.log("this is our search " + search );

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    const [longitude, latitude] = data.features[0].center;
    console.log("this is our " + longitude, latitude);

    mapJump.current.setView([latitude, longitude], 10);
  };


  return (
    <div className={styles.dogSearch}>
      {/* //   this will be the search bar */}
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by location"
          onChange={(event) => setSearch(event.target.value)}
          className={styles.input}
        />
        {/* changed button classname to ourButton from button */}
        <button className="ourButton" type="submit">
          Search
        </button>
      </form>
      <MapContainer
        center={[34.0195, -118.4912]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100vh" }}
        ref={mapJump}
        className={styles.map}
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
                  <Link to={`/dogProfile/${dog._id}`}>Go to profile</Link>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      <div className={styles.cards}>
      {dogs.map((dog) => {
          const {  name, breed } = dog;
          const imageURL = dog.media?.[0]?.content || "https://res.cloudinary.com/datl67gp3/image/upload/v1677887118/cld-sample.jpg"
            return (
        <div className={styles.card}>
          <h2>{name}</h2>
          <img src={imageURL} alt="pics yo" width="200px" ></img>
          <p>{breed}</p>
          <Link to={`/dogProfile/${dog._id}`}>Go to profile</Link>
      </div>
    );})}
    </div>
    </div>
  );
}

export { DogMap };
