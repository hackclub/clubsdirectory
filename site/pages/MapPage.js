import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Map from "../components/Map";

const MapPage = () => {

  const mapContainerRef = useRef(null);
  const [clubs, setClubs] = useState([]);
  const [recentlyCopied, setRecentlyCopied] = useState("");
  const [eventsShown, setEventsShown] = useState(true);

  useEffect(() => {
    fetch("https://directory.hackersreboot.tech/clubs")
    .then((response) => response.json())
    .then((data) => {
      setClubs(data);
    })
    .catch((error) => console.error(error));

  }, []);

  return (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <div
        ref={mapContainerRef}
        style={{ width: '100vw', height: '100vh' }}
      >
      <Map
              fullScreen={true}
              search={""}
              setSelectedClubs={null}
              selectedClubs={[]}
              userLongitude={null}
              userLatitude={null}
              ref={mapContainerRef}
              clubs={clubs}
              recentlyCopied={recentlyCopied}
              setRecentlyCopied={setRecentlyCopied}
              eventsShown={eventsShown}
              setEventsShown={setEventsShown}
            />    
        </div>
    </>
  );
};

export default MapPage;
