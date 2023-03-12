// this is the leaflet map component
// the main responsibility of the "map" component is to render the map and handle interactions with it, such as adding markers or changing the view.
import { MapContainer, TileLayer,} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function RenderMap() {
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
        
        </MapContainer>
    );
};