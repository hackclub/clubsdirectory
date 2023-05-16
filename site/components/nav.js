import {
  Box,
  Container,
  IconButton,
  Image,
  Link as A,
  useColorMode,
} from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";


const Flag = () => (
  <Box
  onClick={() => 
  {
    window.open("https://hackclub.com/", "_blank");
  }}
    href="https://hackclub.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hack Club homepage"
    sx={{ mt: -3,}}
  >
    <Image
      src="https://assets.hackclub.com/flag-orpheus-top.svg"
      alt="Hack Club flag"
      sx={{ width: [96, 128] }}
    />
  </Box>
);


export default () => {
  return (
    <Container style={{position: "absolute", zIndex: 1, cursor: "pointer"}}>
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
