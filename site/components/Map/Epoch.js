import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Text, Link, Button, Box } from 'theme-ui'

export const Epoch = ({leaflet}) => (
	<Marker
    key={"Epoch"}
    
    position={[28.504169, 77.090221]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-hx1v4exha-hack-club-bot.vercel.app/0epochhorizontal.svg',
      iconSize: [48, 32], // set the size of the icon based on whether the club is selected
    })}


  >
<Popup width={250} closeButton={false}>
  <Box style={{  marginTop: -14, color: "white", display: "flex", flexDirection: "column", width: 250, marginBottom: -14, marginLeft: -21, marginRight: -26, borderRadius: 12, padding: 16, backgroundColor: "#000", width: 250, height: '100%' }}>

<Text style={{display: "flex", fontSize: 18, fontWeight: 600}}>Epoch</Text>
<Text style={{marginTop: 2, marginBottom: 2}}>
Epoch was a 42 hour social coding event that brought Hack Clubbers together to explore the world of coding, unleash their creativity, and showcase their projects.





</Text>
<Box style={{display: "flex", flexDirection: "row"}}>
  <Link href="https://epoch.hackclub.com/">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", backgroundColor: "#FF4794", mt: 1}}
    >
      <Text sx={{color: "white"}}>Website</Text>
    </Button>
  </Link>

  <Link href="https://www.youtube.com/watch?v=KLx4NZZPzMc">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", mt: 1, ml: 2, backgroundColor: "#FF4794"}}
    >
      <Text sx={{color: "#fff"}}>Documentary</Text>
    </Button>
  </Link>
</Box>

  </Box>
</Popup>





</Marker>
)
