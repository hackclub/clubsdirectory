import { Box, Container, Badge, Card, Grid, Label, Input, Select, Checkbox, Flex, Radio, Textarea, Slider, Button, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import { useState } from 'react'
import Icon from '@hackclub/icons'
import { levenshtein } from 'underscore.string';

import toast from 'react-hot-toast'
//Considering toast for success messages

const continents = [
  "Asia",
  "North America",
  "Europe",
  "South America",
  "Africa",
  "Australia/Oceania",
  "Antarctica"
];


function NetworkPage() {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filter, setFilter] = useState('Relevancy');
  const [view, setView] = useState('List');
  const [recentlyCopied, setRecentlyCopied] = useState('');

  return (
  
  <>
    <Meta
      as={Head}
      title="Hack Clubs Directory"
      description="The Clubs Directory unlocks the power of cross-club collaboration, allowing clubs to transcend boundaries and create together."
      //Need to add an image here
      image="https://cloud-dq1e294hq-hack-club-bot.vercel.app/0screenshot_2023-04-29_at_3.17.40_pm.png"
    />
    <ForceTheme theme="light" />
    <Container>
    <Nav/>

    </Container>

    <Box
        as="section"
        id="network"
        sx={{ overflow: 'hidden',
        pt: [5, 6],
        pb: [4, 5],
        position: 'relative' }}
    >
      
        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://cloud-dq1e294hq-hack-club-bot.vercel.app/0screenshot_2023-04-29_at_3.17.40_pm.png"
          duration={2000}
          sx={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: -1,
            width: '100vw',
            objectFit: 'cover',
            filter: "brightness(60%)"
            
          }}
        >
          <source
            src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://cloud-mfkqbt4c2-hack-club-bot.vercel.app/0background__2_.mp4"
            type="video/quicktime"
          />
        </Box>
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: [5, 6, null, 7],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          The Clubs Directory
        </Heading>
        <Text variant="lead" >Hack Together, Club Together  because We're Better Together</Text>
      
      </Container>
    </Box>
    <Container>
      <Heading
          as="h2"
          variant="title"
          sx={{
            color: 'red',
            pt: [3, 4],
            pb: [3, 4],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
        Clubs Directory unlocks the power of <span>cross-club collaboration</span>, empowering clubs to transcend boundaries and hack together.
      </Heading>
    </Container>
    <Container mb={4}>
      <Container as="form" variant="cards.sunken">
          <Grid
            columns={[null, '3fr 1fr 1fr']} // 5 column grid
            gap={3} // gap between columns
          >
          <Box gridColumn={[null, 'span 3']}>
          <Label>
            Search Clubs
          </Label>
  
            <Box sx={{ display: 'flex', paddingLeft: 2, borderRadius: 4, flexDirection: 'row', alignItems: "center", backgroundColor: "white" }}>

              <Icon color="muted" glyph="search" size={24}/>
              <Input value={searchContent} onChange={(event) => {
                setSearchContent(event.target.value)
                console.log(levenshtein(event.target.value, 'sitting'))
              }} placeholder="Leader, School, City, State, or Country" />
            </Box>
          </Box>
          <Box gridColumn={[null, 'span 1']}> 

          <Label>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Icon glyph="filter" size={24}/>
              Filter
            </Box>
            </Label>

            <Select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="Relevancy">Relevancy</option>
              <option value="Alphabetic">Alphabetic</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>

            </Select>
          </Box>
          <Box gridColumn={[null, 'span 1']}>
          <Label>
            View
          </Label>

            <Select value={view} onChange={(event) => setView(event.target.value)}>
              <option value="List">List View</option>
              <option value="Map">Map View</option>
            </Select>
          </Box>

          </Grid>
          <Badge
            key={"World"}
            variant={selectedContinent == "" ? "pill" : "outline"}
            mr={2}
            sx={{
              cursor: "pointer"
            }}
            mt={3}
            onClick={() => setSelectedContinent("")}

            color={selectedContinent !== "" ? 'muted' : null}
          >
            World
          </Badge>
          {continents.map((continent) => (
            <Badge
            key={continent}
            variant={selectedContinent == continent ? "pill" : "outline"}
            mt={2}
            mr={2}
            sx={{
              cursor: "pointer"
            }}
            color={selectedContinent !== continent ? 'muted' : null}
            onClick={() => setSelectedContinent(continent)}
          >
            {continent}
          </Badge>            
          ))}
        </Container>
    </Container>
    <Container>
          <Card
          as={'div'}
          variant="sunken"
          sx={{p: [1,2]}}
          mb={2}
          
          >
            <Grid
              columns={[null, "1.5fr 1.5fr 1.5fr 1.5fr 1fr"]} 
              gap={3}
              sx={{pl: [1,3], pr: [1,3]}} 
            >
            
              <p>Club Name</p>
              <p>School</p>
              <p>Location</p>
              <p>Leader(s)</p>
            </Grid>

          </Card>
        {clubs
        
        .filter((club) => 

          
          club.name.toLowerCase().includes(searchContent.toLowerCase())
          ||
          club.name.toLowerCase().split(" ").some((word) => 
            searchContent.split(" ").some((searchTerm) => 
              levenshtein(word.toLowerCase(), searchTerm.toLowerCase()) < 2
            )
          )
          ||
          club.venue.toLowerCase().includes(searchContent.toLowerCase())
          ||
          club.location.toLowerCase().includes(searchContent.toLowerCase())
          ||
          club.leaders.some((leader) => leader.name.toLowerCase().includes(searchContent.toLowerCase()))
          )
          .sort((a, b) => {
          if(filter == "Relevancy") {

          
          // Split the name of each item and the search content into arrays of words
          const aWords = a.name.toLowerCase().split(" ").filter((word) => word != " ");
          const bWords = b.name.toLowerCase().split(" ").filter((word) => word != " ");
          const searchWords = searchContent.toLowerCase().split(" ").filter((word) => word != " ");

          // Calculate the Levenshtein distance between each input name and the search content
          let aDistance = 0;
          searchWords.forEach((targetWord) => {
            let minDistance = Infinity;
            aWords.forEach((word) => {
              // Calculate the Levenshtein distance between the target word and the input word
              const distance = levenshtein(targetWord, word);
              // If the distance is smaller than the minimum distance so far, update the minimum distance
              if (distance < minDistance) {
                minDistance = distance;
              }
            });
            // Add the minimum distance to the distance for this item
            aDistance += minDistance;
          });

          let bDistance = 0;
          searchWords.forEach((targetWord) => {
            let minDistance = Infinity;
            bWords.forEach((word) => {
              // Calculate the Levenshtein distance between the target word and the input word
              const distance = levenshtein(targetWord, word);
              // If the distance is smaller than the minimum distance so far, update the minimum distance
              if (distance < minDistance) {
                minDistance = distance;
              }
            });
            // Add the minimum distance to the distance for this item
            bDistance += minDistance;
          });

          // Sort the items based on the difference between their distances
          return aDistance - bDistance;    
          
          } else if (filter == "Alphabetic") {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
          else if (filter == "Latest") {
            if (a.startDate > b.startDate) {
              return -1;
            }
            if (a.startDate < b.startDate) {
              return 1;
            }
            return 0;
          }
          else if (filter == "Oldest") {
            if (a.startDate < b.startDate) {
              return -1;
            }
            if (a.startDate > b.startDate) {
              return 1;
            }
            return 0;
          }
        }
          )
        .map((club) => (
          <Card
          as={'div'}
          variant="primary"
          sx={{p: [1,2]}}
          mb={2}
          >
            <Grid
              columns={[null, "1.5fr 1.5fr 1.5fr 1.5fr 1fr"]} 
              gap={3}
              sx={{pl: [1,3], pr: [1,3]}} 
            >
            
              <p style={{textDecoration: "underline"}}>{club.name}</p>
              <p>{club.venue}</p>
              <p>{club.location}</p>
              
              <p>{club.leaders[0].name}</p>
              <Box style={{display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center"}}>
              <Button
                variant="primary"
                as="a"
                onClick={() => {
                  setRecentlyCopied(club.id)
                  navigator.clipboard.writeText(club.leaders[0].email)
                }}
              >
                {recentlyCopied == club.id ? ("Copied Email") : ("Contact")}

                </Button>
              </Box>
            </Grid>
          </Card>

        ))}


    </Container>
    <Footer/>

  </>
)};

export default NetworkPage

const clubs = [
  {
    "id": 1,
    "name": "Code Explorers",
    "venue": "Pioneer High School",
    "location": "San Francisco, CA, USA",
    "startDate": "2022-05-01",
    "leaders": [
      {
        "name": "Alice",
        "email": "alice@codeexplorers.app"
      },
      {
        "name": "Sammy",
        "email": "Sammy@codeexplorers.app"
      }
    ]
  },
  {
    "id": 2,
    "name": "Robotics Innovators",
    "startDate": "2042-09-01",
    "venue": "Liberty High School",
    "location": "Seattle, WA, USA",
    "leaders": [
      {
        "name": "Bob",
        "email": "bob@roboticsinnovators.app"
      }
    ]
  },
  {
    "id": 3,
    "name": "Data Wizards",
    "startDate": "2012-09-01",
    "venue": "Lincoln High School",
    "location": "Chicago, IL, USA",
    "leaders": [
      {
        "name": "Cathy",
        "email": "cathy@datawizards.app"
      }
    ]
  },
  {
    "id": 4,
    "name": "AI Pioneers",
    "startDate": "2072-09-01",

    "venue": "Jefferson High School",
    "location": "Austin, TX, USA",
    "leaders": [
      {
        "name": "David",
        "email": "david@aipioneers.app"
      }
    ]
  },
  {
    "id": 5,
    "name": "Virtual Reality Visionaries",
    "startDate": "2024-09-01",
    "venue": "Washington High School",
    "location": "Miami, FL, USA",
    "leaders": [
      {
        "name": "Eva",
        "email": "eva@vrvisionaries.app"
      }
    ]
  },
  {
    "id": 6,
    "name": "Web Designers United",
    "startDate": "2022-09-01",

    "venue": "Franklin High School",
    "location": "Atlanta, GA, USA",
    "leaders": [
      {
        "name": "Frank",
        "email": "frank@webdesignersunited.app"
      }
    ]
  },
  {
    "id": 7,
    "name": "Tech Innovators",
    "startDate": "2022-09-01",
    "venue": "Roosevelt High School",
    "location": "Denver, CO, USA",
    "leaders": [
      {
        "name": "Grace",
        "email": "grace@techinnovators.app"
      }
    ]
  },
  {
    "id": 8,
    "name": "Cybersecurity Crusaders",
    "startDate": "2022-09-01",
    "venue": "Hamilton High School",
    "location": "Boston, MA, USA",
    "leaders": [
      {
        "name": "Hank",
        "email": "hank@cybersecuritycrusaders.app"
      }
    ]
  },
  {
    "id": 9,
    "name": "Mobile App Architects",
    "startDate": "2022-09-01",
    "venue": "Madison High School",
    "location": "Phoenix, AZ, USA",
    "leaders": [
      {
        "name": "Ivy",
        "email": "ivy@mobileapparchitects.app"
      }
    ]
  },
  {
    "id": 10,
    "name": "Game Developers Guild",
    "startDate": "2022-09-01",
    "venue": "Monroe High School",
    "location": "Los Angeles, CA, USA",
    "leaders": [
      {
        "name": "Jack",
        "email": "jack@gamedevelopersguild.app"
      }
    ]
  },  {
    "id": 11,
    "name": "Electronics Enthusiasts",
    "startDate": "2022-09-01",
    "venue": "Kennedy High School",
    "location": "Houston, TX, USA",
    "leaders": [
      {
        "name": "Karen",
        "email": "karen@electronicsenthusiasts.app"
      }
    ]
  },
  {
    "id": 12,
    "name": "Green Tech Guardians",
    "startDate": "2022-09-01",
    "venue": "Adams High School",
    "location": "Portland, OR, USA",
    "leaders": [
      {
        "name": "Leo",
        "email": "leo@greentechguardians.app"
      }
    ]
  },
  {
    "id": 13,
    "name": "Software Crafters",
    "startDate": "2022-08-01",
    "venue": "Harrison High School",
    "location": "San Diego, CA, USA",
    "leaders": [
      {
        "name": "Mia",
        "email": "mia@softwarecrafters.app"
      }
    ]
  },
  {
    "id": 14,
    "name": "Machine Learning Mavericks",
    "startDate": "2025-09-01",
    "venue": "Taylor High School",
    "location": "Dallas, TX, USA",
    "leaders": [
      {
        "name": "Nate",
        "email": "nate@machinelearningmavericks.app"
      }
    ]
  },
  {
    "id": 15,
    "name": "Internet of Things Innovators",
    "startDate": "2042-09-01",
    "venue": "Grant High School",
    "location": "Philadelphia, PA, USA",
    "leaders": [
      {
        "name": "Olivia",
        "email": "olivia@iotinnovators.app"
      }
    ]
  },
  {
    "id": 16,
    "name": "Quantum Computing Crew",
    "startDate": "2022-04-01",
    "venue": "Jackson High School",
    "location": "Detroit, MI, USA",
    "leaders": [
      {
        "name": "Paul",
        "email": "paul@quantumcomputingcrew.app"
      }
    ]
  },
  {
    "id": 17,
    "name": "Digital Art Alliance",
    "startDate": "2022-03-01",
    "venue": "Baker High School",
    "location": "Nashville, TN, USA",
    "leaders": [
      {
        "name": "Quincy",
        "email": "quincy@digitalartalliance.app"
      }
    ]
  },
  {
    "id": 18,
    "name": "3D Printing Pioneers",
    "startDate": "2022-01-01",
    "venue": "Carter High School",
    "location": "Indianapolis, IN, USA",
    "leaders": [
      {
        "name": "Rachel",
        "email": "rachel@3dprintingpioneers.app"
      }
    ]
  },
  {
    "id": 19,
    "name": "Blockchain Builders",
    "startDate": "2022-08-01",
    "venue": "Dixon High School",
    "location": "Columbus, OH, USA",
    "leaders": [
      {
        "name": "Steve",
        "email": "steve@blockchainbuilders.app"
      }
    ]
  },
  {
    "id": 20,
    "name": "Augmented Reality Architects",
    "startDate": "2042-09-01",
    "venue": "Edison High School",
    "location": "Charlotte, NC, USA",
    "leaders": [
      {
        "name": "Tina",
        "email": "tina@augmentedrealityarchitects.app"
      }
    ]
  },
  {
    "id": 21,
    "name": "Drone Racing League",
    "startDate": "2022-09-01",
    "venue": "Ford High School",
    "location": "San Jose, CA, USA",
    "leaders": [
      {
        "name": "Uma",
        "email": "uma@droneracingleague.app"
      }
    ]
  },
  {
    "id": 22,
    "name": "Wearable Tech World",
    "startDate": "2022-09-21",
    "venue": "Gibson High School",
    "location": "Memphis, TN, USA",
    "leaders": [
      {
        "name": "Victor",
        "email": "victor@wearabletechworld.app"
      }
    ]
  },
  {
    "id": 23,
    "name": "Smart Home Society",
    "startDate": "2024-09-01",
    "venue": "Hillcrest High School",
    "location": "Las Vegas, NV, USA",
    "leaders": [
      {
        "name": "Wendy",
        "email": "wendy@smarthomesociety.app"
      }
    ]
  },
  {
    "id": 24,
    "name": "Open Source Alliance",
    "startDate": "2022-11-01",
    "venue": "Irving High School",
    "location": "Baltimore, MD, USA",
    "leaders": [
      {
        "name": "Xander",
        "email": "xander@opensourcealliance.app"
      }
    ]
  },
  {
    "id": 25,
    "name": "Digital Nomads Network",
    "startDate": "2022-12-01",
    "venue": "Johnson High School",
    "location": "Kansas City, MO, USA",
    "leaders": [
      {
        "name": "Yvonne",
        "email": "yvonne@digitalnomadsnetwork.app"
      }
    ]},
    {
      "id": 26,
      "name": "Code Wizards",
      "startDate": "2025-09-01",
      "venue": "St. Mary's School",
      "location": "London, UK",
      "leaders": [
        {
          "name": "Adam",
          "email": "adam@codewizards.co.uk"
        },
        {
          "name": "Beth",
          "email": "beth@codewizards.co.uk"
        }
      ]
    },
    {
      "id": 27,
      "name": "Startup Nation",
      "startDate": "2032-09-01",
      "venue": "Tel Aviv High School",
      "location": "Tel Aviv, Israel",
      "leaders": [
        {
          "name": "Carmen",
          "email": "carmen@startupnation.co.il"
        }
      ]
    },
    {
      "id": 28,
      "name": "Data Scientists Association",
      "startDate": "2026-09-01",
      "venue": "High School of Tokyo",
      "location": "Tokyo, Japan",
      "leaders": [
        {
          "name": "Daisuke",
          "email": "daisuke@datascientists.jp"
        },
        {
          "name": "Emi",
          "email": "emi@datascientists.jp"
        }
      ]
    },
    {
      "id": 29,
      "name": "Tech Innovators Guild",
      "startDate": "2029-09-01",
      "venue": "Schooling of Sydney",
      "location": "Sydney, Australia",
      "leaders": [
        {
          "name": "Felicity",
          "email": "felicity@techinnovatorsguild.com.au"
        }
      ]
    },
    {
      "id": 30,
      "name": "Coding Crusaders",
      "startDate": "2322-09-01",
      "venue": "Cape Town HS",
      "location": "Cape Town, South Africa",
      "leaders": [
        {
          "name": "Gideon",
          "email": "gideon@codingcrusaders.co.za"
        },
        {
          "name": "Hannah",
          "email": "hannah@codingcrusaders.co.za"
        }
      ]
    }
]


 





const simplerUser = {
  "id": 0,
  "name": "Sample Club",
  "venue": "Sample Club High School",
  "location": "Greenville, SC, USA",
  "leaders": [
    {
      "name": "Thomas",
      "email": "thomas@serenidad.app"
    }
  ]
}

const sampleUser = {
  "id": 0,
  "numMembers": 20,
  "name": "Sample Club",
  "address": "34.8490° N, 81.9711° W",
  "country": "USA",
  "scrapbook": {
    "name": "SampleClub",
    "posts": [
      {
        "author": {
          "name": "Sample",
          "avatar": "",
        },
        "content": "Sample",
        "media": ["imgURL", "vidURL"],
        "publishDate": new Date()
      },
    ]
  },

  "leader": {
    "id": 0,
    "username": "@Thomas",
    "gender": "male",
    "email": "thomas@serenidad.app",
    "slack_id": 0,
    "twitter": "@Thomas",
    "linkedin": "@Thomas",
    "scrapbook_id": 0,
    "mastodon": "@Thomas",
    "github": "@Thomas"
  },
  "coleaders": [
    {
    "id": 0,
    "username": "@Thomas",
    "gender": "male",
    "email": "thomas@serenidad.app",
    "slack_id": 0,
    "twitter": "@Thomas",
    "linkedin": "@Thomas",
    "scrapbook_id": 0,
    "mastodon": "@Thomas",
    "github": "@Thomas"
  },
  {
    "id": 0,
    "username": "@Thomas",
    "gender": "male",
    "email": "thomas@serenidad.app",
    "slack_id": 0,
    "twitter": "@Thomas",
    "linkedin": "@Thomas",
    "scrapbook_id": 0,
    "mastodon": "@Thomas",
    "github": "@Thomas"
  },
  ],
  "twitter": "@SampleHackClub",
  "linkedin": "@SampleHackClub",
  "instagram": "@SampleHackClub",
  "mastadon": "@SampleHackClub",
  "github": "@SampleHackClub",
  "website": "SampleHackClub.com"

}

