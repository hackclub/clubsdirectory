import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Text, Link, Button, Box } from "theme-ui";
import Image from "next/image";

export const HQ = ({ leaflet }) => (
  <Marker
    key={"HQ"}
    position={[44.3809, -73.2298]}
    icon={leaflet.icon({
      iconUrl:
        "https://assets.hackclub.com/icon-rounded.svg",
      iconSize: [48, 32], // set the size of the icon based on whether the club is selected
    })}
  >
    <Popup width={250} closeButton={false}>
      <Box style={{ width: 250 }}>
        <Text style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>
          Hack Club HQ
        </Text>
        <img width={125} height={87.5} style={{borderRadius: 16, display: "block", marginTop: 4, marginBottom: 4}} src={"https://lh3.googleusercontent.com/p/AF1QipP9dw7bvCpJHKVwxfH3rglDMEOo0osDTNvxJFLl=s1360-w1360-h1020"}/>
        <Text style={{ marginTop: 2, marginBottom: 2 }}>
        Welcome to Hack Club HQ in Shelburne, Vermont—a thriving hub supporting the Hack Club community.
        </Text>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Link href="https://github.com/hackclub">
            <Button
              variant="primary"
              as="a"
              sx={{ width: "fit-content", backgroundColor: "#C0362C", mt: 1 }}
            >
              <Text sx={{ color: "white" }}>Hack Club Repo</Text>
            </Button>
          </Link>

        </Box>
      </Box>
    </Popup>
  </Marker>
);
