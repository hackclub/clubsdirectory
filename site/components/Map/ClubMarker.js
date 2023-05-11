import React from 'react'
import { Tooltip, Marker, Popup } from 'react-leaflet'
import { Text, Link, Button, Box } from 'theme-ui'

export const ClubMarker = ({club, leaflet, console, clubs, venue, encodeURIComponent, location, navigator, window, setRecentlyCopied, leader, recentlyCopied, selectedClubs, setSelectedClubs, clubPicked}) => (
	  <Marker
    key={club.id}
    position={[club?.geo_data?.coordinates?.latitude, club?.geo_data?.coordinates?.longitude]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-je5xcyfo4-hack-club-bot.vercel.app/0clubmarker.svg',
      iconSize: [32, 32], // set the size of the icon based on whether the club is selected
    })}
  >
          <Tooltip direction="bottom">{club.name}</Tooltip>

    <Popup maxWidth={250} closeButton={false} style={{display: "flex", flexDirection: "column"}}>
      <Text onClick={() => console.log(club)} style={{display: "flex", fontSize: 18, fontWeight: 600}} onClick={() => console.log(clubs)}>{club.name}</Text>

      <Link
        sx={{color: "accent",  fontSize: 12, cursor: "pointer", textDecoration: "underline"}}
        onClick={() => {
          const venue = encodeURIComponent(club.venue);
          const location = encodeURIComponent(club.location);

          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
          } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`);
          }
        }}
      >
        {club.venue}, {club.location}
      </Link>
      <Text sx={{color: "slate", display: "flex", fontSize: 12, paddingY: 1}}>Led by {club.leaders[0].name}<Text sx={{color: "darkless"}}></Text></Text>

      <Box>
        <Button
          variant="primary"
          as="a"
          sx={{width: "fit-content", color: "white", mt: 1}}
          onClick={() => {
            setRecentlyCopied(club.id)
            navigator.clipboard.writeText(club.leaders.map((leader) => leader.email).join(", "))
          }}
        >
          <Text sx={{color: "white"}}>{recentlyCopied == club.id ? ("Copied Email") : ("Contact")}</Text>
        </Button>
        <Button
          variant="primary"
          as="a"
          sx={{width: "fit-content", mt: 1, ml: 2, backgroundColor: "#EC375010", color: "primary", fontWeight: 400}}
          onClick={() => {
            if (selectedClubs.includes(club.id)) {
              setSelectedClubs(selectedClubs.filter((clubPicked) => clubPicked !== club.id));
            } else {
              setSelectedClubs([...selectedClubs, club.id]);
            }
          }}
        >
          <Text sx={{color: "primary"}}>
            {!selectedClubs.includes(club.id) ? ("Select") : ("Selected")}
          </Text>
        </Button>
      </Box>
    </Popup>
  </Marker>
)
