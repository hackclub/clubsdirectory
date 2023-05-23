import React from "react";
import { ClubPreview } from "./ClubPreview";
import { TableLabel } from "./TableLabel";
import { Container } from "theme-ui";

export const ClubsTable = ({
  clubs,
  isMobile,
  isLoading,
  setSelectedClubs,
  selectedClubs,
  selectedContinent,
  filterResults,
  sortResults,
  setClubOpened,
  setRecentlyCopied,
  navigator,
  recentlyCopied,
}) => (
  <Container>
    {!isMobile ? (
      <TableLabel
        filterResults={filterResults}
        clubs={clubs}
        setSelectedClubs={setSelectedClubs}
        selectedClubs={selectedClubs}
      />
    ) : null}
    <Container>
      {isLoading && selectedClubs.length == 0 ? <p>Loading...</p> : null}
    </Container>

    
    {
      selectedContinent == "Antarctica" ?
      <div style={{width: "100%"}}>
        <img style={{alignSelf: "center", height: 256}}src="https://hackclub.com/stickers/sledding.png"></img>
        <p>In a world dominated by the Outernet government, rumors spread like wildfire that Orpheus, the Hack Club Dinosaur, had sought refuge in the most absurd place imaginable—Antarctica! <br/><br/> Yes, that icy wasteland where penguins waddled and polar bears roamed, supposedly harbored the infamous hacker. As whispers of his frozen hideout grew louder, people couldn't help but chuckle at the idea of a giant dinosaur huddled among glaciers, furiously typing away on a laptop. <br/><br/> The image of Orpheus evading the Outernet government's grasp, camouflaged amidst the snow, became the talk of underground forums and encrypted networks. But hey, if anyone could outsmart those tech-savvy oppressors, perhaps a dinosaur with coding skills was just the unexpected hero the world needed. And who knows, maybe the penguins even joined forces, providing backup servers and tactical support while waddling around in stylish hacker gear. <br/><br/> The legend of Orpheus in Antarctica became a hilarious rallying cry, reminding everyone that in the strangest of places, rebellion and a touch of absurdity could bring about the most unexpected triumphs.</p>
      </div> : null
    }

    {clubs

      .filter((club) => filterResults(club))
      .sort((a, b) => {
        return sortResults(a, b);
      })
      .map((club) => (
        <ClubPreview
          isMobile={isMobile}
          setSelectedClubs={setSelectedClubs}
          selectedClubs={selectedClubs}
          club={club}
          setClubOpened={setClubOpened}
          setRecentlyCopied={setRecentlyCopied}
          navigator={navigator}
          recentlyCopied={recentlyCopied}
        />
      ))}
  </Container>
);
