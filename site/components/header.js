import React from "react";
import { Box, Container, Heading, Text } from "theme-ui";

export const DirectoryVideoSection = () => (
  <Box
    as="section"
    id="network"
    sx={{ overflow: "hidden", pt: [5, 6], pb: [7, 6], position: "relative" }}
  >
    <Box
      as="video"
      autoPlay
      muted
      loop
      playsInline
      poster="https://cloud-dq1e294hq-hack-club-bot.vercel.app/0screenshot_2023-04-29_at_3.17.40_pm.png"
      duration={2000}
      sx={{
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        zIndex: -1,
        width: "100vw",
        objectFit: "cover",
        filter: "brightness(60%)",
      }}
    >
      <source
        src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
        type="video/mp4; codecs=hevc"
      />
      <source
        src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
        type="video/webm; codecs=vp9,opus"
      />
      <source
        src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
        type="video/quicktime"
      />
    </Box>
    <Container sx={{ textAlign: "center", color: "white", pb: 4 }}>
      <Heading
        as="h1"
        variant="title"
        sx={{
          fontSize: [5, 6, null, 7],
          span: {
            WebkitTextStroke: "currentColor",
            WebkitTextStrokeWidth: ["2px", "3px"],
            WebkitTextFillColor: "transparent",
          },
        }}
      >
        Clubs Directory
      </Heading>
      <Text variant="lead">
        Hack Together, Club Together because <strong>We're Better Together</strong>
      </Text>
    </Container>
  </Box>
);

export const DirectoryHeading = () => (
  <Container>
    <Heading
      as="h2"
      variant="title"
      sx={{
        color: "red",
        pt: [3, 4],
        pb: [3, 4],
        span: {
          WebkitTextStroke: "currentColor",
          WebkitTextStrokeWidth: ["1.5px", "2.5px"],
          WebkitTextFillColor: "transparent",
        },
      }}
    >
      Clubs Directory unlocks the power of <span>cross-club collaboration</span>
      , empowering clubs to transcend boundaries and hack together.
    </Heading>
  </Container>
);

