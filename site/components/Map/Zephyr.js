import React from 'react'
import ZephyrPath from './ZephyrPath'
import { Marker, Popup } from 'react-leaflet'
import { Text, Link, Button, Box } from 'theme-ui'

export const Zephyr = ({pos, leaflet}) => (
	<Marker
    key={"ZephyrStart"}
    
    position={pos[0]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-2g1pp07bd-hack-club-bot.vercel.app/0zephyrstart.svg',
      iconSize: [48, 48], // set the size of the icon based on whether the club is selected
    })}


  >
<Popup width={250} closeButton={false}>
  <Box>
<Text style={{display: "flex", fontSize: 18, fontWeight: 600}}>Zephyr</Text>
<Text style={{marginTop: 2, marginBottom: 2}}>
Zephyr was a train that traveled across America from Burlington, VT to LA, CA, and it also served as the inspiration for a hackathon by Hack Club. The train journey spanned over 3,000 miles and passed through some of the country's most beautiful landscapes. Participants in the Zephyr hackathon were encouraged to draw inspiration from the train journey and create innovative projects that captured the spirit of the trip.

</Text>
<Box style={{display: "flex", flexDirection: "row"}}>
  <Link href="https://zephyr.hackclub.com/">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", backgroundColor: "#B65551", mt: 1}}
    >
      <Text sx={{color: "white"}}>Website</Text>
    </Button>
  </Link>

  <Link href="https://www.youtube.com/watch?v=2BID8_pGuqA">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", mt: 1, ml: 2, backgroundColor: "#B65551"}}
    >
      <Text sx={{color: "#fff"}}>Documentary</Text>
    </Button>
  </Link>
</Box>

  </Box>
</Popup>





</Marker>

<Marker
    key={"ZephyrStop"}
    
    position={pos[5]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-7rqfdiu0t-hack-club-bot.vercel.app/0zephyrend.svg',
      iconSize: [48, 48], // set the size of the icon based on whether the club is selected
    })}


  >
<Popup width={250} closeButton={false}>
  <Box>
<Text style={{display: "flex", fontSize: 18, fontWeight: 600}}>Zephyr</Text>
<Text style={{marginTop: 2, marginBottom: 2}}>
Zephyr was a train that traveled across America from Burlington, VT to LA, CA, and it also served as the inspiration for a hackathon by Hack Club. The train journey spanned over 3,000 miles and passed through some of the country's most beautiful landscapes. Participants in the Zephyr hackathon were encouraged to draw inspiration from the train journey and create innovative projects that captured the spirit of the trip.

</Text>
<Box style={{display: "flex", flexDirection: "row"}}>
  <Link href="https://zephyr.hackclub.com/">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", backgroundColor: "#B65551", mt: 1}}
    >
      <Text sx={{color: "white"}}>Website</Text>
    </Button>
  </Link>

  <Link href="https://www.youtube.com/watch?v=2BID8_pGuqA">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", mt: 1, ml: 2, backgroundColor: "#B65551"}}
    >
      <Text sx={{color: "#fff"}}>Documentary</Text>
    </Button>
  </Link>
</Box>

  </Box>
</Popup>





</Marker>
<ZephyrPath pos={pos}/>
)
