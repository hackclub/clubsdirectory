import React from 'react'
import { ClubPreview } from './ClubPreview'
import { TableLabel } from './TableLabel'
import { Container } from 'theme-ui'

export const ClubsTable = ({clubs, club, filterResults, a, b, sortResults, setClubOpened, setRecentlyCopied, navigator, recentlyCopied}) => (
	    <Container>
    <TableLabel/>
        {clubs
        
        .filter((club) => 
            filterResults(club)
          )
          .sort((a, b) => {
            return sortResults(a,b)
        }
          )
        .map((club) => (
        <ClubPreview club={club} setClubOpened={setClubOpened} setRecentlyCopied={setRecentlyCopied} navigator={navigator} recentlyCopied={recentlyCopied}
        />
        
        ))}


    </Container>
)
