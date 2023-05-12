import React from "react";
import { Container, Heading } from "theme-ui";

export const DirectoryHeading = ({ undefined }) => (
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
          WebkitTextStrokeWidth: ["2px", "3px"],
          WebkitTextFillColor: "transparent",
        },
      }}
    >
      Clubs Directory unlocks the power of <span>cross-club collaboration</span>
      , empowering clubs to transcend boundaries and hack together.
    </Heading>
  </Container>
);
