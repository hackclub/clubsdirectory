import { Container, Box } from 'theme-ui'

export default () => (
  <Box
    as="footer"
    sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: [3, 4], mt: [4, 5] }}
  >
    <Container
      variant="narrow"
      sx={{
        p: { color: 'secondary', lineHeight: 'caption', fontSize: [2, 3] },
        'p:last-of-type': {
          fontSize: 1,
          variant: 'text.caption',
          a: { color: 'secondary' }
        },
        a: { variant: 'styles.a', color: 'primary' }
      }}
    >
      <p variant={"caption"}>Maintained by Hack Club, a nonprofit network of 20k+ high school hackers & coding clubs around the world.
          Want to create your own Hack Club? <a p style={{color: "red"}} href="https://apply.hackclub.com">Get started here.</a><br/>
      </p>

  <p variant={"caption"}> This page is 100% opensource. Want to make this page better? <a p style={{color: "blue"}} href="https://github.com/hackclub/clubsdirectory">Edit this on GitHub!</a><br/>
      </p>
    </Container>
  </Box>
)
