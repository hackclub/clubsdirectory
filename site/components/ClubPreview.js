import React from "react";
import { Box, Card, Label, Link, Text, Grid, Button, Checkbox } from "theme-ui";

export const ClubPreview = ({
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
    onClick={() => console.log(club)}
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
          <Checkbox
            onClick={() => {
              if (selectedClubs.includes(club.id)) {
                setSelectedClubs(
                  selectedClubs.filter((clubPicked) => clubPicked !== club.id)
                );
              } else {
                setSelectedClubs([...selectedClubs, club.id]);
              }
            }}
            checked={selectedClubs.includes(club.id)}
            defaultChecked={false}
          />
        </Label>
        <p
          // onClick={() =>
          //   setClubOpened(club)
          //   }
          style={{ textDecoration: "underline" }}
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
            const venue = encodeURIComponent(club.venue);
            const location = encodeURIComponent(club.location);

            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
            } else {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
              );
            }
          }}
        >
          {club.venue}
        </Link>
        <p
        // onClick={() =>
        //   // setClubOpened(club)
        //   }
        >
          {club.location.slice(0,128)}{club.location.length > 128 ? ("...") : ("")}
        </p>

        <p
        // onClick={() =>
        //   // setClubOpened(club)
        //   }
        >
          {club.leaders[0].name}
        </p>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button
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
          </Button>
        </Box>
      </Grid>
    ) : (
      <Box sx={{ flexDirection: "column", display: "flex", color: "darkless" }}>
        <Text sx={{ fontSize: 3, fontWeight: 600 }}>{club.name}</Text>
        <Text sx={{ color: "slate" }}>
          Led by {club.leaders[0].name}
          <Text sx={{ color: "darkless" }}></Text>
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
              window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
            } else {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
              );
            }
          }}
        >
          {club.venue}, {club.location.slice(0,128)}{club.location.length > 128 ? ("...") : ("")}
        </Link>
        <Box>
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
        </Box>
      </Box>
    )}
  </Card>
);
