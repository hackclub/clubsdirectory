import ZephyrPath from './ZephyrPath'
import { useEffect } from 'react';
import { MapContainer, Tooltip, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { Text, Link, Button, Box } from 'theme-ui'

function Map({ clubs, setSelectedClubs, selectedClubs, recentlyCopied, setRecentlyCopied }) {
  
  const pos = [
    [44, -73],  // Burlington, VT (44.4765° N, 73.2123° W)
    [40, -74],  // New York City, NY (40.7128° N, 74.0060° W)
    [41, -87],  // Chicago, IL (41.8781° N, 87.6298° W)
    [39, -105], // Denver, CO (39.7392° N, 104.9903° W)
    [37, -122], // San Francisco, CA (37.7749° N, 122.4194° W)
    [34, -118]  // Los Angeles, CA (34.0522° N, 118.2437° W)
  ]
  useEffect(() => {
    // Ensuring Leaflet's CSS is applied only on the client side.
    import('leaflet/dist/leaflet.css');
  }, []);

  return (
    <MapContainer style={{width: "100%", height: "600px"}} center={[37.0902, -95.7129]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
{Array.isArray(clubs) && clubs.map((club) => (
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
))}

<Marker
    key={"Assemble"}
    
    position={[37.786722, -122.400318]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-8rme2lmqd-hack-club-bot.vercel.app/0assemblehorizontal.svg',
      iconSize: [48, 32], // set the size of the icon based on whether the club is selected
    })}


  >
<Popup width={250} closeButton={false}>
<Box style={{width: 250}}>
<Text style={{display: "flex", fontSize: 18, fontWeight: 600}}>Assemble</Text>
<Text style={{marginTop: 2, marginBottom: 2}}>
Assemble: an awesome Hackathon by Hack Club at Figma HQ. Coders, designers, and creatives assembled to create awesome projects, and showcased their work to the world. It was a social coding experience that left everyone inspired.




</Text>
<Box style={{display: "flex", flexDirection: "row"}}>
  <Link href="https://github.com/hackclub/assemble">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", backgroundColor: "#C0362C", mt: 1}}
    >
      <Text sx={{color: "white"}}>Repo</Text>
    </Button>
  </Link>

  <Link href="https://www.youtube.com/watch?v=PnK4gzO6S3Q">
    <Button
      variant="primary"
      as="a"
      sx={{width: "fit-content", mt: 1, ml: 2, backgroundColor: "#C0362C"}}
    >
      <Text sx={{color: "#fff"}}>Documentary</Text>
    </Button>
  </Link>
</Box>
</Box>

</Popup>





</Marker>
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
    </MapContainer>
  );
}

export default Map;
