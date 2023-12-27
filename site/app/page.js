"use client";

import theme from "@hackclub/theme";
import { InitializeColorMode, ThemeProvider } from "theme-ui";

import { ClubsTable } from "../components/table/ClubsTable";
import Map from "@/components/map-components";
import { SearchControls } from "../components/SearchControls";
import { DirectoryVideoSection, DirectoryHeading } from "@/components/heading";
import { Container, Card, Badge, Link, Box, Text, Button } from "theme-ui";
import Nav from "@/components/nav";
import ForceTheme from "@/components/force-theme";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { levenshtein } from "underscore.string";
import { Global } from "@emotion/react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { continents } from "@/lib/data";
import {
  toggleBodyScroll,
  downloadCSV,
  calculateDistance,
} from "@/lib/functions";

function MainPage() {
  const breakpointIndex = useBreakpointIndex();
  const isMobile = breakpointIndex < 2; // Check if the current breakpoint is smaller than the third breakpoint

  const [oldClubs, setOldClubs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const [clubs, setClubs] = useState([]);

  const [clubOpened, setClubOpened] = useState(null);
  const urlFriendlyName = clubOpened?.name
    ? clubOpened.name.replace(/\s+/g, "_").toLowerCase()
    : "";

  const navigator = typeof window !== "undefined" ? window.navigator : null;

  useEffect(() => {
    //Gets the clubs from the ArpanAPI™
    fetch("https://clubs-directory.herokuapp.com/clubs")
      .then((response) => response.json())
      .then((data) => {
        setClubs(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));

    toggleBodyScroll(clubOpened != null);
  }, []);

  //Sorting function that uses user location
  function sortByProximity(a, b) {
    if (userLatitude === null || userLongitude === null) {
      return 0; // No sorting if user's latitude or longitude is null
    }

    const distanceA = calculateDistance(a.geo_data.coordinates);
    const distanceB = calculateDistance(b.geo_data.coordinates);

    return distanceA - distanceB;
  }

  function sortByAlphabetic(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  function getClubEmailById(id) {
    const club = clubs.find((c) => c.id === id);
    return club ? club.leaders.map((leader) => leader.email).join(", ") : "";
  }

  function sortByRelevancy(a, b, searchContent) {
    const aWords = a.name
      .toLowerCase()
      .split(" ")
      .filter((word) => word != " ");
    const bWords = b.name
      .toLowerCase()
      .split(" ")
      .filter((word) => word != " ");
    const searchWords = searchContent
      .toLowerCase()
      .split(" ")
      .filter((word) => word != " ");

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
  }

  const [selectedClubs, setSelectedClubs] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [eventsShown, setEventsShown] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [filter, setFilter] = useState("Relevancy");
  const [view, setView] = useState("Map");
  const [recentlyCopied, setRecentlyCopied] = useState("");

  return (
    <>
      <ThemeProvider theme={theme}>
        <InitializeColorMode />
        <Global
          styles={{
            body: {
              overflow: clubOpened ? "hidden" : "visible",
              width: clubOpened ? "100%" : "auto",
              lineHeight: 1.25,
            },
          }}
        />
        <ForceTheme theme="light" />

        <Box />
        {/* <DetailViewModal clubOpened={clubOpened} setClubOpened={setClubOpened} navigator={navigator} urlFriendlyName={urlFriendlyName}  /> */}

        <Nav />
        <DirectoryVideoSection />
        <DirectoryHeading />
        <Container sx={{ mb: [3, 4], fontSize: [16, 32] }}>
          <Text>
            Clubs Directory is opt-in only. To add your club to the Directory,
            please contact{" "}
            <Link href="https://hackclub.slack.com/team/U056C33BSNP">
              @Jolly
            </Link>{" "}
            (a Holly-like Slack Bot) on the Hack Club Slack. If you need
            assistance or are unsure about the process, you can follow{" "}
            <Link href="https://cloud-117m2wdag-hack-club-bot.vercel.app/0screen_recording_2023-05-31_at_9.39.09_am.mp4">
              this video tutorial
            </Link>{" "}
            for guidance.
          </Text>
        </Container>
        <SearchControls
          setUserLatitude={setUserLatitude}
          setUserLongitude={setUserLongitude}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
          console={console}
          levenshtein={levenshtein}
          filter={filter}
          setFilter={setFilter}
          view={view}
          setView={setView}
          selectedContinent={selectedContinent}
          setSelectedContinent={setSelectedContinent}
          continents={continents}
          Badge={Badge}
        />
        <Container sx={{ my: [2, 3], cursor: "pointer" }}>
          <Box
            onClick={() => {
              if (view == "List") {
                setView("Map");
              } else {
                setView("List");
              }
            }}
            sx={{
              backgroundColor: "primary",
              color: "white",
              fontWeight: 700,
              borderRadius: 8,
              py: 1,
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <p style={{ margin: "12px;" }}>
              View On {view == "List" ? "Map 🗺️" : "List 📙"}
            </p>
          </Box>
        </Container>
        {view == "List" ? (
          <ClubsTable
            oldClubs={oldClubs}
            isMobile={isMobile}
            searchContent={searchContent}
            isLoading={isLoading}
            setSelectedClubs={setSelectedClubs}
            selectedClubs={selectedClubs}
            clubs={clubs}
            filterResults={filterResults}
            sortResults={sortResults}
            setClubOpened={setClubOpened}
            setRecentlyCopied={setRecentlyCopied}
            navigator={navigator}
            selectedContinent={selectedContinent}
            recentlyCopied={recentlyCopied}
          />
        ) : null}
        {view == "Map" ? (
          <Container>
            <Box
              style={{
                zIndex: 0,
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Map
                fullScreen={false}
                selectedContinent={selectedContinent}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                search={searchContent}
                searchContent={searchContent}
                clubs={clubs
                  .filter((club) => filterResults(club))
                  .sort((a, b) => {
                    return sortResults(a, b);
                  })}
                recentlyCopied={recentlyCopied}
                setRecentlyCopied={setRecentlyCopied}
                setSelectedClubs={setSelectedClubs}
                selectedClubs={selectedClubs}
                eventsShown={eventsShown}
                setEventsShown={setEventsShown}
              />
            </Box>
          </Container>
        ) : null}

        <Container
          sx={{
            position: "fixed",
            bottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            maxWidth: "container",
          }}
        >
          {selectedClubs.length > 0 ? (
            <Card
              sx={{
                display: "flex",
                position: "relative",
                zIndex: 1000,
                flexDirection: "column",
                backgroundColor: "sunken",
              }}
            >
              <Text sx={{ p: 0, mx: 0, my: 0 }}>
                {selectedClubs.length} Club
                {selectedClubs.length > 1 ? "s" : null} Selected
              </Text>

              <Box>
                <Button
                  variant="primary"
                  sx={{ mt: 2, mb: 0, mr: 2 }}
                  onClick={() => {
                    const clubNames = selectedClubs
                      .map((id) => getClubEmailById(id))
                      .join(", ");
                    setRecentlyCopied(clubNames);
                    navigator.clipboard.writeText(clubNames);
                  }}
                >
                  {recentlyCopied ===
                  selectedClubs.map((id) => getClubEmailById(id)).join(", ")
                    ? "Copied!"
                    : "Copy Emails"}
                </Button>
                <Button
                  variant="primary"
                  sx={{ mt: 2, mb: 0 }}
                  onClick={() => {
                    downloadCSV(selectedClubs, clubs);
                  }}
                >
                  Download CSV
                </Button>
              </Box>
            </Card>
          ) : null}
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );

  function sortResults(a, b) {
    if (filter == "Relevancy") {
      return sortByRelevancy(a, b, searchContent);
    } else if (filter == "Alphabetic") {
      return sortByAlphabetic(a, b);
    } else if (filter == "Proximity") {
      return sortByProximity(a, b);
    }
  }

  function filterResults(club) {
    return (
      (selectedContinent == "" ||
        selectedContinent == club?.geo_data?.continent) &&
      (club.name.toLowerCase().includes(searchContent.toLowerCase()) ||
        club.name
          .toLowerCase()
          .split(" ")
          .some((word) =>
            searchContent
              .split(" ")
              .some(
                (searchTerm) =>
                  levenshtein(word.toLowerCase(), searchTerm.toLowerCase()) < 2
              )
          ) ||
        club.geo_data.country
          .toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club.geo_data.country_code
          .toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club.geo_data?.state
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club.venue.toLowerCase().includes(searchContent.toLowerCase()) ||
        club.location.toLowerCase().includes(searchContent.toLowerCase()) ||
        club.geo_data.postcode
          ?.toLowerCase()
          .includes(searchContent.toLowerCase()) ||
        club.leaders.some((leader) =>
          leader.name.toLowerCase().includes(searchContent.toLowerCase())
        ))
    );
  }
}

export default MainPage;

// const clubs = [
//   {
//     "id": 1,
//     "name": "0101 Code Explorers",
//     "venue": "Pioneer High School",
//     "description": "Pioneer Hack Club is a community of tech enthusiasts and innovators in San Francisco. We provide a supportive and collaborative environment for members to learn new skills, work on exciting projects, and connect with like-minded peers. Whether you're a seasoned programmer or just starting out, join us.",
//     "location": "San Francisco, CA, USA",
//     "continent": "North America",
//     "startDate": "2022-05-01",
//     "scrapbook": {
//       "name": "Code Explorers",
//       "posts": [
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },
//         {
//           "author": {
//             "name": "Alice",
//             "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//           },
//           "content": "Sample",
//           "media": "https://cloud-quqqjg66m-hack-club-bot.vercel.app/0img_0680.png",
//           "publishDate": new Date()
//         },

//       ],
//       "scrapbook_id": "code-explorers"

//     },
//     "leaders": [
//       {
//         "id": 0,
//         "name": "Alice",
//         "email": "alice@codeexplorers.app",
//         "avatar": "https://cloud-q5v7141ad-hack-club-bot.vercel.app/0image__6_.png",
//         "username": "@Alice",
//         "gender": "female",
//         "socials": [
//           {
//             "icon": "slack-fill",
//             "handle": "@AliceSlays",
//             "link": "https://twitter.com/Alice"
//           },
//           {
//             "icon": "twitter",
//             "handle": "@Alice_Hacker",
//             "link": "https://twitter.com/Alice"
//           },
//           {
//             "icon": "github",
//             "handle": "@AliceHacks",
//             "link": "https://github.com/Alice"
//           }
//         ],
//       },
//       {
//         "name": "Sammy",
//         "email": "Sammy@codeexplorers.app",
//         "socials": [          {
//           "icon": "slack-fill",
//           "handle": "@Sammy",
//           "link": "https://twitter.com/Alice"
//         }],
//       },
//       {
//         "name": "Sammy",
//         "email": "Sammy@codeexplorers.app",
//         "socials": [          {
//           "icon": "slack-fill",
//           "handle": "@Sammy",
//           "link": "https://twitter.com/Alice"
//         }],
//       }
//     ],
//     "socials": [
//       {
//         "icon": "twitter",
//         "handle": "@SampleHackClub",
//         "link": "https://twitter.com/SampleHackClub"
//       },
//       {
//         "icon": "instagram",
//         "handle": "@SampleHackClub",
//         "link": "https://www.instagram.com/SampleHackClub"
//       },
//       {
//         "icon": "github",
//         "handle": "@SampleHackClub",
//         "link": "https://github.com/SampleHackClub"
//       },
//       {
//         "icon": "web",
//         "handle": "SampleHackClub.com",
//         "link": "https://samplehackclub.com"
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "name": "Robotics Innovators",
//     "startDate": "2042-09-01",
//     "venue": "Liberty High School",
//     "location": "Seattle, WA, USA",
//     "continent": "North America",
//     "leaders": [
//       {
//         "name": "Bob",
//         "email": "bob@roboticsinnovators.app"
//       },
//       {
//         "name": "Bob",
//         "email": "bob@roboticsinnovators.app"
//       }
//     ]
//   },
//   {
//     "id": 3,
//     "name": "Data Wizards",
//     "startDate": "2012-09-01",
//     "venue": "Lincoln High School",
//     "location": "Chicago, IL, USA",
//     "continent": "North America",
//     "leaders": [
//       {
//         "name": "Cathy",
//         "email": "cathy@datawizards.app"
//       }
//     ]
//   },
//   {
//     "id": 4,
//     "name": "AI Pioneers",
//     "startDate": "2072-09-01",

//     "venue": "Jefferson High School",
//     "location": "Austin, TX, USA",
//     "continent": "North America",
//     "leaders": [
//       {
//         "name": "David",
//         "email": "david@aipioneers.app"
//       }
//     ]
//   },
//   {
//     "id": 5,
//     "name": "Virtual Reality Visionaries",
//     "startDate": "2024-09-01",
//     "venue": "Washington High School",
//     "location": "Miami, FL, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Eva",
//         "email": "eva@vrvisionaries.app"
//       }
//     ]
//   },
//   {
//     "id": 6,
//     "name": "Web Designers United",
//     "startDate": "2022-09-01",

//     "venue": "Franklin High School",
//     "location": "Atlanta, GA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Frank",
//         "email": "frank@webdesignersunited.app"
//       }
//     ]
//   },
//   {
//     "id": 7,
//     "name": "Tech Innovators",
//     "startDate": "2022-09-01",
//     "venue": "Roosevelt High School",
//     "location": "Denver, CO, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Grace",
//         "email": "grace@techinnovators.app"
//       }
//     ]
//   },
//   {
//     "id": 8,
//     "name": "Cybersecurity Crusaders",
//     "startDate": "2022-09-01",
//     "venue": "Hamilton High School",
//     "location": "Boston, MA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Hank",
//         "email": "hank@cybersecuritycrusaders.app"
//       }
//     ]
//   },
//   {
//     "id": 9,
//     "name": "Mobile App Architects",
//     "startDate": "2022-09-01",
//     "venue": "Madison High School",
//     "location": "Phoenix, AZ, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Ivy",
//         "email": "ivy@mobileapparchitects.app",
//         "socials": [
//           {
//             "platform": "github",
//             "handle": "@Ivy",
//             "icon": "github"
//           },
//           {
//             "platform": "scrapbook",
//             "handle": "@IvyScraps",
//             "icon": "scrapbook"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "id": 10,
//     "name": "Game Developers Guild",
//     "startDate": "2022-09-01",
//     "venue": "Monroe High School",
//     "location": "Los Angeles, CA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Jack",
//         "email": "jack@gamedevelopersguild.app"
//       }
//     ]
//   },  {
//     "id": 11,
//     "name": "Electronics Enthusiasts",
//     "startDate": "2022-09-01",
//     "venue": "Kennedy High School",
//     "location": "Houston, TX, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Karen",
//         "email": "karen@electronicsenthusiasts.app"
//       }
//     ]
//   },
//   {
//     "id": 12,
//     "name": "Green Tech Guardians",
//     "startDate": "2022-09-01",
//     "venue": "Adams High School",
//     "location": "Portland, OR, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Leo",
//         "email": "leo@greentechguardians.app"
//       }
//     ]
//   },
//   {
//     "id": 13,
//     "name": "Software Crafters",
//     "startDate": "2022-08-01",
//     "venue": "Harrison High School",
//     "location": "San Diego, CA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Mia",
//         "email": "mia@softwarecrafters.app"
//       }
//     ]
//   },
//   {
//     "id": 14,
//     "name": "Machine Learning Mavericks",
//     "startDate": "2025-09-01",
//     "venue": "Taylor High School",
//     "location": "Dallas, TX, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Nate",
//         "email": "nate@machinelearningmavericks.app"
//       }
//     ]
//   },
//   {
//     "id": 15,
//     "name": "Internet of Things Innovators",
//     "startDate": "2042-09-01",
//     "venue": "Grant High School",
//     "location": "Philadelphia, PA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Olivia",
//         "email": "olivia@iotinnovators.app"
//       }
//     ]
//   },
//   {
//     "id": 16,
//     "name": "Quantum Computing Crew",
//     "startDate": "2022-04-01",
//     "venue": "Jackson High School",
//     "location": "Detroit, MI, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Paul",
//         "email": "paul@quantumcomputingcrew.app"
//       }
//     ]
//   },
//   {
//     "id": 17,
//     "name": "Digital Art Alliance",
//     "startDate": "2022-03-01",
//     "venue": "Baker High School",
//     "location": "Nashville, TN, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Quincy",
//         "email": "quincy@digitalartalliance.app"
//       }
//     ]
//   },
//   {
//     "id": 18,
//     "name": "3D Printing Pioneers",
//     "startDate": "2022-01-01",
//     "venue": "Carter High School",
//     "location": "Indianapolis, IN, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Rachel",
//         "email": "rachel@3dprintingpioneers.app"
//       }
//     ]
//   },
//   {
//     "id": 19,
//     "name": "Blockchain Builders",
//     "startDate": "2022-08-01",
//     "venue": "Dixon High School",
//     "location": "Columbus, OH, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Steve",
//         "email": "steve@blockchainbuilders.app"
//       }
//     ]
//   },
//   {
//     "id": 20,
//     "name": "Augmented Reality Architects",
//     "startDate": "2042-09-01",
//     "venue": "Edison High School",
//     "location": "Charlotte, NC, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Tina",
//         "email": "tina@augmentedrealityarchitects.app"
//       }
//     ]
//   },
//   {
//     "id": 21,
//     "name": "Drone Racing League",
//     "startDate": "2022-09-01",
//     "venue": "Ford High School",
//     "location": "San Jose, CA, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Uma",
//         "email": "uma@droneracingleague.app"
//       }
//     ]
//   },
//   {
//     "id": 22,
//     "name": "Wearable Tech World",
//     "startDate": "2022-09-21",
//     "venue": "Gibson High School",
//     "location": "Memphis, TN, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Victor",
//         "email": "victor@wearabletechworld.app"
//       }
//     ]
//   },
//   {
//     "id": 23,
//     "name": "Smart Home Society",
//     "startDate": "2024-09-01",
//     "venue": "Hillcrest High School",
//     "location": "Las Vegas, NV, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Wendy",
//         "email": "wendy@smarthomesociety.app"
//       }
//     ]
//   },
//   {
//     "id": 24,
//     "name": "Open Source Alliance",
//     "startDate": "2022-11-01",
//     "venue": "Irving High School",
//     "location": "Baltimore, MD, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Xander",
//         "email": "xander@opensourcealliance.app"
//       }
//     ]
//   },
//   {
//     "id": 25,
//     "name": "Digital Nomads Network",
//     "startDate": "2022-12-01",
//     "venue": "Johnson High School",
//     "location": "Kansas City, MO, USA",
//     "continent": "North America",

//     "leaders": [
//       {
//         "name": "Yvonne",
//         "email": "yvonne@digitalnomadsnetwork.app"
//       }
//     ]},
//     {
//       "id": 26,
//       "name": "Code Wizards",
//       "startDate": "2025-09-01",
//       "venue": "St. Mary's School",
//       "location": "London, UK",
//       "continent": "Europe",

//       "leaders": [
//         {
//           "name": "Adam",
//           "email": "adam@codewizards.co.uk"
//         },
//         {
//           "name": "Beth",
//           "email": "beth@codewizards.co.uk"
//         }
//       ]
//     },
//     {
//       "id": 27,
//       "name": "Startup Nation",
//       "startDate": "2032-09-01",
//       "venue": "Tel Aviv High School",
//       "location": "Tel Aviv, Israel",
//       "continent": "Europe",
//       "leaders": [
//         {
//           "name": "Carmen",
//           "email": "carmen@startupnation.co.il"
//         }
//       ]
//     },
//     {
//       "id": 28,
//       "name": "Data Scientists Association",
//       "startDate": "2026-09-01",
//       "venue": "High School of Tokyo",
//       "location": "Tokyo, Japan",
//       "continent": "Asia",

//       "leaders": [
//         {
//           "name": "Daisuke",
//           "email": "daisuke@datascientists.jp"
//         },
//         {
//           "name": "Emi",
//           "email": "emi@datascientists.jp"
//         }
//       ]
//     },
//     {
//       "id": 29,
//       "name": "Tech Innovators Guild",
//       "startDate": "2029-09-01",
//       "venue": "Schooling of Sydney",
//       "location": "Sydney, Australia",
//       "continent": "Australia/Oceania",

//       "leaders": [
//         {
//           "name": "Felicity",
//           "email": "felicity@techinnovatorsguild.com.au"
//         }
//       ]
//     },
//     {
//       "id": 30,
//       "name": "Coding Crusaders",
//       "startDate": "2322-09-01",
//       "venue": "Cape Town HS",
//       "location": "Cape Town, South Africa",
//       "continent": "Africa",

//       "leaders": [
//         {
//           "name": "Gideon",
//           "email": "gideon@codingcrusaders.co.za"
//         },
//         {
//           "name": "Hannah",
//           "email": "hannah@codingcrusaders.co.za"
//         }
//       ]
//     }
// ]

// const sampleUser = {
//   "id": 0,
//   "numMembers": 20,
//   "name": "Sample Club",
//   "address": "34.8490° N, 81.9711° W",
//   "country": "USA",
//   "scrapbook": {
//     "name": "SampleClub",
//     "posts": [
//       {
//         "author": {
//           "name": "Sample",
//           "avatar": "",
//         },
//         "content": "Sample",
//         "media": "Img/Video URL",
//         "publishDate": new Date()
//       },
//     ]
//   },

//   "leader": {
//     "id": 0,
//     "username": "@Thomas",
//     "gender": "male",
//     "email": "thomas@serenidad.app",
//     "slack_id": 0,
//     "twitter": "@Thomas",
//     "linkedin": "@Thomas",
//     "scrapbook_id": 0,
//     "mastodon": "@Thomas",
//     "github": "@Thomas"
//   },
//   "coleaders": [
//     {
//     "id": 0,
//     "username": "@Thomas",
//     "gender": "male",
//     "email": "thomas@serenidad.app",
//     "slack_id": 0,
//     "twitter": "@Thomas",
//     "linkedin": "@Thomas",
//     "scrapbook_id": 0,
//     "mastodon": "@Thomas",
//     "github": "@Thomas"
//   },
//   {
//     "id": 0,
//     "username": "@Thomas",
//     "gender": "male",
//     "email": "thomas@serenidad.app",
//     "slack_id": 0,
//     "twitter": "@Thomas",
//     "linkedin": "@Thomas",
//     "scrapbook_id": 0,
//     "mastodon": "@Thomas",
//     "github": "@Thomas"
//   },
//   ],
//   "twitter": "@SampleHackClub",
//   "linkedin": "@SampleHackClub",
//   "instagram": "@SampleHackClub",
//   "mastadon": "@SampleHackClub",
//   "github": "@SampleHackClub",
//   "website": "SampleHackClub.com"

// }
