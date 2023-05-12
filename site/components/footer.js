import { Container, Box, Text, Link } from "theme-ui";

export default () => (
  <Box
    as="footer"
    sx={{ bg: "sunken", textAlign: "center", py: [3, 4], mt: [4, 5] }}
  >
    <Container
      variant="narrow"
      sx={{
        p: { color: "secondary", lineHeight: "caption", fontSize: [2, 3] },
        "p:last-of-type": {
          fontSize: 1,
          variant: "text.caption",
          a: { color: "secondary" },
        },
        a: { variant: "styles.a", color: "primary" },
      }}
    >
      <Text variant="caption">
        Maintained by Hack Club, a nonprofit network of 20k+ high school hackers
        & coding clubs around the world. Want to create your own Hack Club?{" "}
        <Link href="https://apply.hackclub.com" sx={{ color: "red" }}>
          Get started here.
        </Link>
        <br />
        <br />
        The Club Directory is 100% open source.
        <br />
        Want to make this page better?{" "}
        <Link
          href="https://github.com/hackclub/clubsdirectory"
          sx={{ color: "accent" }}
        >
          Edit it on GitHub!
        </Link>
        <br />
      </Text>
    </Container>
  </Box>
);
