import React from "react";
import { Box, Card, Label, Link, Text, Grid, Button, Checkbox } from "theme-ui";

export const ClubPreviewOld = ({
  club,
  isMobile,
  setSelectedClubs,
  selectedClubs,
  setClubOpened,
  setRecentlyCopied,
  navigator,
  recentlyCopied,
}) => (
  <Card
    as={"div"}
    variant="primary"
    sx={{
      p: [3, 4, 2],
      // cursor: "pointer"
    }}
    mb={2}
  >
    {!isMobile ? (
      <Grid
        columns={[null, "0.15fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr"]}
        gap={3}
        sx={{ pl: [1, 3], pr: [1, 3], alignItems: "center" }}
      >
        <Label>
          <Box>🔒</Box>
        </Label>
        <p
        // onClick={() =>
        //   setClubOpened(club)
        //   }
        >
          {club.name}
        </p>
        <Link
          sx={{
            color: "accent",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              window.location.href = `https://maps.apple.com/?q=${club.coordinates.latitude},${club.coordinates.longitude}`;
            } else {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${club.coordinates.latitude},${club.coordinates.longitude}`
              );
            }
          }}
        >
          {club.name}
        </Link>
        <p
        // onClick={() =>
        //   // setClubOpened(club)
        //   }
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
              borderBottom: "1px dotted black",
            }}
          >
            <strong>Redacted</strong>
          </div>
        </p>

        <p
          onClick={() =>
            // setClubOpened(club)
            null
          }
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
              borderBottom: "1px dotted black",
            }}
          >
            <strong>Redacted</strong>
          </div>{" "}
        </p>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/* <Button
            variant="primary"
            as="a"
            onClick={() => {
              setRecentlyCopied(club.id);
              navigator.clipboard.writeText(
                club.leaders.map((leader) => leader.email).join(", ")
              );
            }}
          >
            {recentlyCopied == club.id ? "Copied Email" : "Contact"}
          </Button> */}
        </Box>
      </Grid>
    ) : (
      <Box sx={{ flexDirection: "column", display: "flex", color: "darkless" }}>
        <Text sx={{ fontSize: 3, fontWeight: 600 }}>{club.name}</Text>
        <Text sx={{ color: "slate" }}>
          Led by{" "}
          <strong>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                borderBottom: "1px dotted black",
              }}
            >
              Redacted
            </div>
          </strong>
        </Text>
        <Link
          sx={{
            color: "accent",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            const venue = encodeURIComponent(club.venue);
            const location = encodeURIComponent(club.location);

            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              window.location.href = `https://maps.apple.com/?q=${club.coordinates.latitude},${club.coordinates.longitude}`;
            } else {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${club.coordinates.latitude},${club.coordinates.longitude}`
              );
            }
          }}
        >
          {club.name}
        </Link>
        {/* <Box>
          <Button
            variant="primary"
            as="a"
            sx={{ width: "fit-content", mt: 3 }}
            onClick={() => {
              setRecentlyCopied(club.id);
              navigator.clipboard.writeText(
                club.leaders.map((leader) => leader.email).join(", ")
              );
            }}
          >
            {recentlyCopied == club.id ? "Copied Email" : "Contact"}
          </Button>
          <Button
            variant="primary"
            as="a"
            sx={{
              width: "fit-content",
              mt: 3,
              ml: 2,
              backgroundColor: "#EC375010",
              color: "primary",
              fontWeight: 400,
            }}
            onClick={() => {
              if (selectedClubs.includes(club.id)) {
                setSelectedClubs(
                  selectedClubs.filter((clubPicked) => clubPicked !== club.id)
                );
              } else {
                setSelectedClubs([...selectedClubs, club.id]);
              }
            }}
          >
            {!selectedClubs.includes(club.id) ? "Select" : "Selected"}
          </Button>
        </Box> */}
      </Box>
    )}
  </Card>
);
