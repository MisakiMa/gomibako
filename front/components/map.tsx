import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useRecoilState } from "recoil";
import {
  mainStationDistance,
  mainStationState,
} from "../pages/ComponentSample";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const [mainStation, setMainStation] = useRecoilState(mainStationState);
  const [distance, setMainDistance] = useRecoilState(mainStationDistance);

  return (
    <MapContainer
      center={[35.94356, 136.188917]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Marker
        position={[35.946404, 136.185362]}
        icon={distance <= 15 ? redIcon : greenIcon}
        eventHandlers={{
          click: (e) => {
            console.log("maker click 0", e);
            setMainStation(0);
          },
        }}
      >
        <Popup>本町中央</Popup>
      </Marker>
      <Marker
        position={[35.943554, 136.200377]}
        icon={greenIcon}
        eventHandlers={{
          click: (e) => {
            console.log("maker click 1", e);
            setMainStation(1);
          },
        }}
      >
        <Popup>jig.jp前</Popup>
      </Marker>
      <Marker
        position={[35.950103, 136.181823]}
        icon={greenIcon}
        eventHandlers={{
          click: (e) => {
            console.log("maker click 2", e);
            setMainStation(2);
          },
        }}
      >
        <Popup>西山公園前</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
