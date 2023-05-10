import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  useEffect(() => {
    // Ensuring Leaflet's CSS is applied only on the client side.
    import('leaflet/dist/leaflet.css');
  }, []);

  return (
    <MapContainer style={{width: "100%", height: "600px"}} center={[52.505, -0.09]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
    </MapContainer>
  );
}

export default Map;
