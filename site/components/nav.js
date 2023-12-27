import { Box, Container, Image } from "theme-ui";
import Link from "next/link";

const Flag = () => (
  <Link href="https://hackclub.com/" target="_blank">
    <Box aria-label="Hack Club Homepage" sx={{ mt: -3 }}>
      <Image
        src="https://assets.hackclub.com/flag-orpheus-top.svg"
        alt="Hack Club flag"
        sx={{ width: [96, 128] }}
      />
    </Box>
  </Link>
);

export default () => {
  return (
    <Container style={{ position: "absolute", zIndex: 1, cursor: "pointer" }}>
      <Box
        as="nav"
        sx={{
          py: 3,
          bg: "transparent",
          position: "absolute",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            pr: 2,
            a: {
              fontSize: 1,
              color: "primary",
              textDecoration: "none",
              mr: [3, 4],
            },
          }}
        >
          <Flag />
        </Container>
      </Box>
    </Container>
  );
};
