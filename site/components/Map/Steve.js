import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Text, Badge, Link, Button, Box } from "theme-ui";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState } from "react";

export const Steve = ({ leaflet }) => {
  const [autoplayStatus, setAutoplayStatus] = useState(true);

  return (
  
  <Marker
    key={"Steve"}
    position={[44.3659, -73.1898]}
    icon={leaflet.icon({
      iconUrl:
        "https://cloud-prlus4eda-hack-club-bot.vercel.app/0apartment.svg",
      iconSize: [48, 32], // set the size of the icon based on whether the club is selected
    })}
  >
    <Popup width={250} closeButton={false}>
      <Box style={{ width: 250 }}>
      <Box style={{ width: 250, marginBottom: 8, borderRadius: 16, overflow: "hidden" }}>
      <Badge
        variant={autoplayStatus ? "pill" : "outline"}
        sx={{
          position: "absolute",
          top: 2,
          left: 2,
          zIndex: 701,
          backgroundColor: !autoplayStatus ? "#fff" : null,
          fontSize: 1,
          cursor: "pointer"
        }}
        color={!autoplayStatus ? "muted" : null}
        onClick={() => setAutoplayStatus(!autoplayStatus)}
      >
        {autoplayStatus ? "Disable Autoplay" : "Enable Autoplay"}
      </Badge>
      <Carousel  useKeyboardArrows={true} autoPlay={autoplayStatus} interval={3000}  infiniteLoop={true} showIndicators={false} emulateTouch={true} showStatus={false} showThumbs={false}>
        <img src="https://cloud-ojce1ooqu-hack-club-bot.vercel.app/0image.png" alt="Outside of Steve" />
        <img src="https://cloud-pms5oryst-hack-club-bot.vercel.app/0image.png" alt="Inside with Staircase and Kitchen" />
        <img src="https://cloud-m0hfc3yp4-hack-club-bot.vercel.app/0image.png" alt="Downstairs view of living room" />
        <img src="https://cloud-5v5zmnwdy-hack-club-bot.vercel.app/0image.png" alt="Functioning Steve Bathroom" />
        <img src="https://cloud-p0m8rnjl0-hack-club-bot.vercel.app/0image.png" alt="Steve Livingroom" />
        <img src="https://cloud-5o9kewhwx-hack-club-bot.vercel.app/0image.png" alt="Outside View" />
        <img src="https://cloud-h8mxt5vrs-hack-club-bot.vercel.app/0image.png" alt="Surroundings" />

      {/* Add more carousel items as needed */}
    </Carousel>
      </Box>

        <Text style={{ marginTop: 2, marginBottom: 2 }}>
        Stay for free at Steve, the Hack Club apartment located across from HQ in Shelburne, Vermont. Work on projects and enjoy your visit to Vermont with us!
        </Text>
        <Box style={{ display: "flex", flexDirection: "row" }}>

        </Box>
      </Box>
    </Popup>
  </Marker>
)}
;
