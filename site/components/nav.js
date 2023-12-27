import { Box, Container, Image, useColorMode } from "theme-ui";
import Link from "next/link";
import ColorSwitcher from "@/components/old/color-switcher";
import { useEffect, useState } from "react";

const Flag = () => (
  <Link href="https://hackclub.com/" target="_blank">
    <Box aria-label="Hack Club Homepage" sx={{ mt: -3 }}>
      <Image
        src="/images/flag-orpheus-top.png"
        alt="Hack Club flag"
        sx={{ width: [96, 128] }}
      />
    </Box>
  </Link>
);

export default function Navbar() {
  const [mode] = useColorMode();
  const [scrolled, setScrolled] = useState(false);

  const onScroll = () => {
    const newState = window.scrollY >= 16;

    setScrolled(newState);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
  
  return (
    <Container style={{ position: "absolute", zIndex: 1, cursor: "pointer" }}>
      <Box
        as="nav"
        sx={{
          bg:
            scrolled &&
            (mode === "light"
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.15)"),
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          cursor: "default",
          position: "fixed",
          top: 0,
          left: 0,
          backdropFilter: scrolled && "saturate(180%) blur(20px)",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            a: {
              fontSize: 1,
              color: "primary",
              textDecoration: "none",
              mr: [3, 4],
            },
          }}
        >
          <Flag />
          <ColorSwitcher />
        </Container>
      </Box>
    </Container>
  );
}
