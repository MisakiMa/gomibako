import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useRecoilState } from "recoil";
import { mainStationState } from "../pages/ComponentSample";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})



const Map = () => {
  
  const [mainStation, setMainStation] = useRecoilState(mainStationState)  

  return (
    <MapContainer
      center={[35.94356, 136.188917]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution = '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[35.946404, 136.185362]}
        eventHandlers={{
          click: (e) => {
            console.log('maker click 0', e)
            setMainStation(0)
          },
        }}>
        <Popup>
          本町中央
        </Popup>
      </Marker>
      <Marker 
        position={[35.943554, 136.200377]}
        eventHandlers={{
          click: (e) => {
            console.log('maker click 1', e)
            setMainStation(1)
          },
        }}>
        <Popup>
          jig.jp前
        </Popup>
      </Marker>
      <Marker 
        position={[35.950103, 136.181823]}
        eventHandlers={{
          click: (e) => {
            console.log('maker click', e)
            setMainStation(2)
          },
        }}>
        <Popup>
          西山公園前
        </Popup>
      </Marker>
    </MapContainer>
  );
};


export default Map;