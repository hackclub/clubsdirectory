import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Text, Link, Button, Box } from "theme-ui";

export const Assemble = ({ leaflet }) => (
  <Marker
    key={"Assemble"}
    position={[37.786722, -122.400318]}
    icon={leaflet.icon({
      iconUrl:
        "https://cloud-8rme2lmqd-hack-club-bot.vercel.app/0assemblehorizontal.svg",
      iconSize: [48, 32], // set the size of the icon based on whether the club is selected
    })}
  >
    <Popup width={250} closeButton={false}>
      <Box style={{ width: 250 }}>
        <Text style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>
          Assemble
        </Text>
        <Text style={{ marginTop: 2, marginBottom: 2 }}>
          Assemble: an awesome Hackathon by Hack Club at Figma HQ. Coders,
          designers, and creatives assembled to create awesome projects, and
          showcased their work to the world. It was a social coding experience
          that left everyone inspired.
        </Text>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Link href="https://github.com/hackclub/assemble">
            <Button
              variant="primary"
              as="a"
              sx={{ width: "fit-content", backgroundColor: "#C0362C", mt: 1 }}
            >
              <Text sx={{ color: "white" }}>Repo</Text>
            </Button>
          </Link>

          <Link href="https://www.youtube.com/watch?v=PnK4gzO6S3Q">
            <Button
              variant="primary"
              as="a"
              sx={{
                width: "fit-content",
                mt: 1,
                ml: 2,
                backgroundColor: "#C0362C",
              }}
            >
              <Text sx={{ color: "#fff" }}>Documentary</Text>
            </Button>
          </Link>
        </Box>
      </Box>
    </Popup>
  </Marker>
);
