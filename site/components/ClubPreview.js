import React from 'react'
import { Box, Card, Grid, Button } from 'theme-ui'

export const ClubPreview = ({club, setClubOpened, setRecentlyCopied, navigator, recentlyCopied}) => (
	          <Card

          as={'div'}
          variant="primary"
          sx={{p: [1,2] 
            // cursor: "pointer"
          }}
          mb={2}
          >
            <Grid
              columns={[null, "1.5fr 1.5fr 1.5fr 1.5fr 1fr"]} 
              gap={3}
              sx={{pl: [1,3], pr: [1,3]}} 
            >
            
              <p 
              // onClick={() => 
              //   setClubOpened(club)
              //   } 
                style={{textDecoration: "underline"}}>{club.name}</p>
              <p 
              // onClick={() => 
              //   // setClubOpened(club)
              //   }
                >{club.venue}</p>
              <p 
              // onClick={() => 
              //   // setClubOpened(club)
              //   }
                >{club.location}</p>
              
              <p 
              // onClick={() => 
              //   // setClubOpened(club)
              //   }
                >{club.leaders[0].name}</p>
              <Box style={{display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center"}}>
              <Button
                variant="primary"
                as="a"
                onClick={() => {
                  setRecentlyCopied(club.id)
                  navigator.clipboard.writeText(club.leaders[0].email)
                }}
              >
                {recentlyCopied == club.id ? ("Copied Email") : ("Contact")}

                </Button>
              </Box>
            </Grid>
          </Card>
)
