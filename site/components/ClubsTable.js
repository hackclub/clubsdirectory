import { useState, useEffect } from "react"; // Import useState from 'react'

import { ClubPreviewOld } from "./ClubPreviewOld";

import { ClubPreview } from "./ClubPreview";
import { TableLabel } from "./TableLabel";
import { Container } from "theme-ui";

import { levenshtein } from "underscore.string";

export const ClubsTable = ({
  clubs,
  isMobile,
  isLoading,
  setSelectedClubs,
  selectedClubs,
  searchContent,
  selectedContinent,
  filterResults,
  sortResults,
  setClubOpened,
  setRecentlyCopied,
  navigator,
  recentlyCopied,
}) => {
  function filterOldResults(club) {
    return (
      (selectedContinent == "" ||
        selectedContinent == club?.continent) &&
      (club.name?.toLowerCase().includes(searchContent.toLowerCase()) ||
        club.name
          ?.toLowerCase()
          .split(" ")
          .some((word) =>
            searchContent
              .split(" ")
              ?.some(
                (searchTerm) =>
                  levenshtein(word.toLowerCase(), searchTerm.toLowerCase()) < 2
              )
          ) ||
        club?.country
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club?.country_code
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club?.state
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club?.venue?.toLowerCase().includes(searchContent.toLowerCase()) ||
        club?.location?.toLowerCase().includes(searchContent.toLowerCase()) ||
        club?.postcode
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club?.leaders?.some((leader) =>
          leader.name?.toLowerCase().includes(searchContent.toLowerCase())
        ))
    );
  }
  const [oldClubs, setOldClubs] = useState(["Test"]); // Initialize state using useState hook
  useEffect(() => {
    // Ensuring Leaflet's CSS is applied only on the client side.
    import("leaflet/dist/leaflet.css");
    //Gets the clubs from the ArpanAPI™
    fetch("https://clubs-directory.herokuapp.com/clubs/old")
      .then((response) => response.json())
      .then((data) => {
       
        const dataFormatted = data.filter(
          (anOldClub) =>
            anOldClub?.coordinates?.latitude !== undefined &&
            anOldClub?.coordinates?.longitude !== undefined &&
            anOldClub?.name !== null &&
            !clubs.some(
              (newClub) =>
                newClub?.geo_data?.coordinates?.latitude ==
                  anOldClub?.coordinates?.latitude &&
                newClub?.geo_data?.coordinates?.longitude ==
                  anOldClub?.coordinates?.longitude
            ) 
            ) 
        setOldClubs(dataFormatted);
        console.log(dataFormatted)
      })
      .catch((error) => console.error(error));

  }, []);
  return (
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
      
      {oldClubs.filter((club) => filterOldResults(club, selectedContinent)).map((oldClub) =>  

              (<ClubPreviewOld
              isMobile={isMobile}
              setSelectedClubs={setSelectedClubs}
              selectedClubs={selectedClubs}
              club={oldClub}
              setClubOpened={setClubOpened}
              setRecentlyCopied={setRecentlyCopied}
              navigator={navigator}
              recentlyCopied={recentlyCopied}
            />)
      )}
  </Container>
)};
