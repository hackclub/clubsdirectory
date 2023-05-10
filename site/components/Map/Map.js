import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { Text, Link, Button, Box } from 'theme-ui'

function Map({ clubs, setSelectedClubs, selectedClubs, recentlyCopied, setRecentlyCopied }) {
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
    <Popup maxWidth={250} closeButton={false} style={{display: "flex", flexDirection: "column"}}>
      <Text style={{display: "flex", fontSize: 18, fontWeight: 600}} onClick={() => console.log(clubs)}>{club.name}</Text>

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
    key={"Epoch"}
    
    position={[28.504169, 77.090221]}
    icon={leaflet.icon({
      iconUrl: 'https://cloud-457fjhk0h-hack-club-bot.vercel.app/0epochicon.svg',
      iconSize: [32, 32], // set the size of the icon based on whether the club is selected
    })}


  >
<Popup width={250} closeButton={false}>
  <Box style={{  marginTop: -14, color: "white", display: "flex", flexDirection: "column", width: 250, marginBottom: -14, marginLeft: -21, marginRight: -26, borderRadius: 12, padding: 16, backgroundColor: "#000", width: 250, height: '100%' }}>

<Text style={{display: "flex", fontSize: 18, fontWeight: 600}} onClick={() => console.log('Epoch')}>Epoch</Text>
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
    </MapContainer>
  );
}

export default Map;
