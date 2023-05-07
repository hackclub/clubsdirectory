import React from 'react'
import { Box, Card, Label, Grid, Button, Checkbox } from 'theme-ui'

export const ClubPreview = ({club, setSelectedClubs, selectedClubs, setClubOpened, setRecentlyCopied, navigator, recentlyCopied}) => (
	          <Card

          as={'div'}
          variant="primary"
          sx={{p: [1,2] 
            // cursor: "pointer"
          }}
          mb={2}
          >
            <Grid
              columns={[null, "0.15fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr"]} 
              gap={3}
              sx={{pl: [1,3], pr: [1,3], alignItems: "center"}} 
            >
          <Label>
          <Checkbox onClick={() => {
          if (selectedClubs.includes(club.id)) {
          setSelectedClubs(selectedClubs.filter((clubPicked) => clubPicked !== club.id));
          } else {
          setSelectedClubs([...selectedClubs, club.id]);
          }
          }}
          checked={selectedClubs.includes(club.id)} defaultChecked={false} />
          </Label>
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
                  navigator.clipboard.writeText(club.leaders.map((leader) => leader.email).join(", "))
                }}
              >
                {recentlyCopied == club.id ? ("Copied Email") : ("Contact")}

                </Button>
              </Box>
            </Grid>
          </Card>
)
