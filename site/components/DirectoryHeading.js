import React from "react";
import { Container, Heading } from "theme-ui";

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
