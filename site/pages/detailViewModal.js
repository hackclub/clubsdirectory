import React from 'react'
import EmbedMapButton from '../components/EmbedMapButton'
import ShareButton from '../components/ShareButton'
import { Container, Image, Flex, Grid, Box, Text, Heading } from 'theme-ui'
import Modal from 'react-modal'
import Icon from '@hackclub/icons'
import Link from 'next/link'

export const DetailViewModal = ({clubOpened, setClubOpened, navigator, urlFriendlyName}) => (
	    <Modal
      isOpen={clubOpened != null}
      onRequestClose={() => setClubOpened(null)}
      preventScroll={false}

      style={{
        overlay: {
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.3)",

        },
        content: {
          
          backgroundColor: "transparent",
          width: "100%",
          maxWidth: [1024, null, 2024], // add this property

          border: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          left: "50%",
          transform: "translate(-50%, 0%)",
          pointerEvents: "none" // add this property
        }

      }}
    >
      <Container sx={{backgroundColor: "#fff", display: "flex", flexDirection: "column", overflow: "hidden", padding: [3,4], borderRadius: 16, width:"100%", pointerEvents: "auto"}}>
      <Box style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <Box>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Heading
          as="h2"
          variant="title"
          sx={{
            color: 'darkless',
            fontSize: '48px',
            fontWeight: "medium",
            my: 0


          }}
        >
          {clubOpened?.name}
        </Heading>
        
      <ShareButton navigator={navigator} urlFriendlyName={urlFriendlyName}/>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Heading
          as="h3"
          variant="headline"
          sx={{
            color: 'blue',
            fontWeight: 500,
            my: 0
          }}
        >
          {clubOpened?.venue}, {clubOpened?.location}
        </Heading>
        <EmbedMapButton navigator={navigator}/>
      </Box>
      </Box>
      <Box style={{height: 48, cursor: "pointer", alignItems: "center", justifyContent: "center", width: 48, borderRadius: 32, color: "#8492A6", padding: 0, margin: 0 }}>
      <Icon
      style={{ border: "1px solid #8492A6", borderRadius: 64}}
        glyph="view-close"
        onClick={() => setClubOpened(null)}
        size={48}
      />
      </Box>
      </Box>
      <Box sx={{mt: [2,3]}}>
      <Text
          sx={{
            fontSize: [18, null, 24],
            fontWeight: 500,
          }}
        >
          {clubOpened?.description}
      </Text> 
      </Box>
      
      <Box sx={{ display: "flex", cursor: "pointer", my: [3,2], flexDirection: "row", gap: 16, flexWrap: "wrap" }}>

      {clubOpened?.socials?.map((social) => (
  <Link href={social?.link} key={social.icon} style={{textDecoration: "none"}}>
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#338EDA10",
        borderRadius: 32,
        gap: 2,
        py: [0.5, 1],
        px: [1, 3],
        color: "accent",
        display: "flex",
        textDecoration: "none"
      }}
    >
      <Icon glyph={social?.icon} size={24} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          textDecoration: "none"
        }}

      >
        {social.handle}
      </Text>
    </Box>
  </Link>
))}

    </Box>
    <Grid
      columns={[null, "1fr 2fr"]} 
      gap={3}
      style={{ width: '100%', overflow: "hidden", height: '100%' }}
      sx={{py: [2,3]}} 
    >
      <Box sx={{backgroundColor: "smoke", overflowY: "hidden", p: [2,3], borderRadius: 16}}>
      <Heading
          as="h4"
          variant="lead"
          style={{
            margin: 0
          }}
          sx={{
            color: 'steel',
            fontSize: '48px',
            fontWeight: "medium",
            my: 0,
            py: 0,
            


          }}
        >
         Club Leaders
        </Heading> 
        <Box sx={{overflowY: "scroll", height: "100%", pb: [2,3]}}>

        {clubOpened?.leaders.map((leader)=> 
        
          <Box sx={{backgroundColor: "white", borderRadius: 16, my: 2, p: [1, 2], flexDirection: "column", display: "flex"}}>
            <Box sx={{flexDirection:'row', alignItems: "center", display: "flex", gap: 2}}>
            {leader?.avatar ? (
            <img style={{height: 32, objectFit: "cover", width: 32, borderRadius: 16 }} src={leader?.avatar}/>
            ) :null}
            <Text>{leader.name}</Text>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                gap: 1,
                color: "accent",
                display: "flex",
                textDecoration: "none"
              }}
            >
              <Icon glyph={"email-fill"} size={24} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: "none"
                }}

              >
                {leader?.email}
              </Text>
            </Box>
            {leader?.socials?.map((social) => (
            <Box
              sx={{
                alignItems: "center",
                gap: 1,
                color: "accent",
                display: "flex",
                textDecoration: "none"
              }}
            >
              <Icon glyph={social?.icon} size={24} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: "none"
                }}

              >
                {social.handle}
              </Text>
            </Box>
        ))}
          </Box>
        )}
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", background: "linear-gradient(180deg, #FF8C37 0%, #F5F5F4 100%)", p: [2,3], height: "100%", borderRadius: 16}}>
      <Link style={{color: "white", textDecoration: "none"}} href={`https://scrapbook.hackclub.com/clubs/${clubOpened?.scrapbook?.scrapbook_id}`}>

        <Box style={{display: "flex", flexDirection: "row"}}>

        <Heading
          as="h4"
          variant="lead"
          style={{
            margin: 0
          }}
          sx={{
            color: 'white',
            fontSize: '48px',
            fontWeight: "medium",
            mt: 0,
            pt: 0,
            pb: 2,
            alignItems: "center",
            display: "flex"


          }}
        >
          {clubOpened?.scrapbook?.name} Scrapbook
        </Heading>
        <Icon
        sx={{color: "white"}}
        glyph="external-fill"
        size={32}
      />
        </Box>
        </Link>

        <Box sx={{ overflowY: "scroll", height: "100%", borderRadius: 16}}>

        <Grid
              columns={[null, "1fr 1fr 1fr"]} 
              gap={3}
              sx={{
                overflowY: "scroll",
                paddingBottom: 32
            }}
        >
        {clubOpened?.scrapbook?.posts?.map((post) => 
    <Box sx={{ 
      display: "grid",
      gridGap: "1px",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "sunken" ,
      
    }}>

    <Box sx={{ 
        padding: "16px",
        backgroundColor: "elevated",
        position: "relative",
        width: "100%" 
      }}>
        <Link style={{textDecoration: "none"}} href={`https://scrapbook.hackclub.com/${post?.author?.name}`}>
      <Flex sx={{ 
          color: "inherit",
          textDecoration: "none",
          alignItems: "center",
          marginBottom: "8px",
          lineHeight: "1"
        }}>
        <Image src={post.author.avatar} alt={post.author.name} sx={{ 
            width: "32px",
            height: "32px",
            borderRadius: "24px"
          }} />
        <Box sx={{ 
            paddingLeft: "8px"
          }}>
          <Heading as="h2" sx={{ 
              fontSize: "16px",
              wordBreak: "break-all",
              wordWrap: "break-word",
              display: "flex",
              alignItems: "center",
              paddingBottom: "0px",
              color: "text",
              fontWeight: "bold",
              marginLeft: "0"
            }}>{post.author.name}</Heading>
          <Text sx={{ 
              color: "muted",
              fontFamily: "16px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>{post.publishDate.toLocaleString()}</Text>
        </Box>
      </Flex>
      </Link>
      <Box sx={{ 
          fontSize: "16px",
          wordWrap: "break-word",
          whiteSpace: "pre-line"
        }}>
        <Text as="p" sx={{ 
            display: "inline-block"
          }}>{post.content}</Text>
      </Box>
      <Image src={post.media} alt="" sx={{ 
          objectFit: "contain",
          borderRadius: "6px",
          backgroundColor: "background",
          maxWidth: "100%",
          maxHeight: "384px"
        }} />
    </Box>
  </Box>
        )}

        </Grid>
        </Box>
      </Box>
    </Grid>
      </Container>
    </Modal>
)
