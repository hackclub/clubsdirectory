"use client";

import { useEffect, useState, useRef } from "react";
import Map from "@/components/map-components";

import { InitializeColorMode, ThemeProvider } from "theme-ui";
import theme from "@hackclub/theme";

export function MapPage() {
  const mapContainerRef = useRef(null);
  const [clubs, setClubs] = useState([]);
  const [recentlyCopied, setRecentlyCopied] = useState("");
  const [eventsShown, setEventsShown] = useState(true);

  useEffect(() => {
    fetch("https://clubs-directory.herokuapp.com/clubs")
      .then((response) => response.json())
      .then((data) => {
        setClubs(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <InitializeColorMode />
      <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh" }}>
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
    </ThemeProvider>
  );
}
