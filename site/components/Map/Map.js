import { ClubMarker } from "./ClubMarker";
import { Assemble } from "./Assemble";
import { HQ } from "./HQ";
import { Steve } from "./Steve";

import { Epoch } from "./Epoch";
import { ZephyrStop } from "./ZephyrStop";
import { ZephyrStart } from "./ZephyrStart";
import { UserLocationDot } from "./UserLocationDot";
import ZephyrPath from "./ZephyrPath";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import { Badge } from "theme-ui";

function Map({
  clubs,
  userLongitude,
  userLatitude,
  search,
  setSelectedClubs,
  selectedClubs,
  recentlyCopied,
  setRecentlyCopied,
  eventsShown,
  setEventsShown,
}) {
  const mapRef = useRef(null);

  const ZephyrPos = [
    [44, -73], // Burlington, VT (44.4765° N, 73.2123° W)
    [40, -74], // New York City, NY (40.7128° N, 74.0060° W)
    [41, -87], // Chicago, IL (41.8781° N, 87.6298° W)
    [39, -105], // Denver, CO (39.7392° N, 104.9903° W)
    [37, -122], // San Francisco, CA (37.7749° N, 122.4194° W)
    [34, -118], // Los Angeles, CA (34.0522° N, 118.2437° W)
  ];
  useEffect(() => {
    // Ensuring Leaflet's CSS is applied only on the client side.
    import("leaflet/dist/leaflet.css");
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    flyToSearchOnChange(map);
  }, [clubs]);
  return (
    <div style={{ position: "relative" }}>
    <MapContainer
      ref={mapRef}
      style={{ width: "100%", height: "600px" }}
      center={[0, 0]}
      zoom={2}
      boundsOptions={{ padding: [50, 50] }}
      whenCreated={(map) => {
        map.fitBounds([
          [90, -180], // Top-left corner
          [-90, 180], // Bottom-right corner
        ]);
      }}
    >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {Array.isArray(clubs) &&
          clubs.map((club) => (
            <ClubMarker
              club={club}
              leaflet={leaflet}
              clubs={clubs}
              encodeURIComponent={encodeURIComponent}
              location={location}
              navigator={navigator}
              setRecentlyCopied={setRecentlyCopied}
              recentlyCopied={recentlyCopied}
              selectedClubs={selectedClubs}
              setSelectedClubs={setSelectedClubs}
            />
          ))}

        {eventsShown ? (
          <>
            <Assemble leaflet={leaflet} />
            <Steve leaflet={leaflet} />
            <HQ leaflet={leaflet} />

            <Epoch leaflet={leaflet} />
            <ZephyrStart pos={ZephyrPos} leaflet={leaflet} />

            <ZephyrStop pos={ZephyrPos} leaflet={leaflet} />
            <ZephyrPath pos={ZephyrPos} />
          </>
        ) : null}
        {userLongitude !== null && userLatitude !== null && (
          <UserLocationDot
            userLatitude={userLatitude}
            userLongitude={userLongitude}
          />
        )}
      </MapContainer>
      <Badge
        variant={eventsShown ? "pill" : "outline"}
        sx={{
          position: "absolute",
          bottom: 2,
          left: 2,
          zIndex: 701,
          fontSize: "1.25rem",
          cursor: "pointer"
        }}
        color={!eventsShown ? "muted" : null}
        onClick={() => setEventsShown(!eventsShown)}
      >
        {eventsShown ? "Hide" : "Show"} Events
      </Badge>
    </div>
  );

  function flyToSearchOnChange(map) {
    if (map && clubs.length > 0 && search != "") {
      const { latitude, longitude } = clubs[0].geo_data.coordinates;
      map.flyTo([latitude, longitude], 10);
    }
  }
}

export default Map;
