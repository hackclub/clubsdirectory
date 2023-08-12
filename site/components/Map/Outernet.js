import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Text, Link, Button, Box } from "theme-ui";

export const Outernet = ({ leaflet }) => (
  <Marker
    key={"Outernet"}
    position={[44.3591, -72.26]}
    icon={leaflet.icon({
      iconUrl: "https://cloud-d001eai9w-hack-club-bot.vercel.app/0image.png",
      iconSize: [32, 32], // set the size of the icon based on whether the club is selected
    })}
  >
    <Popup width={250} closeButton={false}>
      <Box style={{ width: 250 }}>
        <Text style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>
          Outernet
        </Text>
        <Text style={{ marginTop: 2, marginBottom: 2 }}>
          Outernet was a four-day coding and camping trip in nature for high
          school hackers, in the beautiful Northeast Kingdom of Vermont.
          Together, hackers turned a semi-abandonded campsite into a bustling
          hacker oasis filled with fun and awesome projects.
        </Text>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Link href="https://github.com/hackclub/outernet" target="_blank">
            <Button
              variant="primary"
              as="a"
              sx={{ width: "fit-content", backgroundColor: "#C0362C", mt: 1 }}
            >
              <Text sx={{ color: "white" }}>Repo</Text>
            </Button>
          </Link>

          {/* <Link
            href="https://www.youtube.com/watch?v=PnK4gzO6S3Q"
            target="_blank"
          >
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
          </Link> */}
        </Box>
      </Box>
    </Popup>
  </Marker>
);
