import React from 'react'
import { ClubPreview } from './ClubPreview'
import { TableLabel } from './TableLabel'
import { Container } from 'theme-ui'

export const ClubsTable = ({clubs, isMobile, isLoading, setSelectedClubs, selectedClubs, filterResults, sortResults, setClubOpened, setRecentlyCopied, navigator, recentlyCopied}) => (
	    <Container>
    {!isMobile ? (<TableLabel filterResults={filterResults} clubs={clubs} setSelectedClubs={setSelectedClubs} selectedClubs={selectedClubs}/>) : null}
    <Container>
    {isLoading && selectedClubs.length == 0 ? (
        <p>Loading...</p>
      ) : (
        null
      )}
      </Container>
        {clubs
        
        .filter((club) => 
            filterResults(club)
          )
          .sort((a, b) => {
            return sortResults(a,b)
        }
          )
        .map((club) => (
          
        <ClubPreview isMobile={isMobile} setSelectedClubs={setSelectedClubs} selectedClubs={selectedClubs} club={club} setClubOpened={setClubOpened} setRecentlyCopied={setRecentlyCopied} navigator={navigator} recentlyCopied={recentlyCopied}
        />
        
        ))}


    </Container>
)
