import React from "react";
import { Box, Container, Grid, Label, Input, Select } from "theme-ui";
import Icon from "@hackclub/icons";

export const SearchControls = ({
  searchContent,
  setUserLatitude,
  setUserLongitude,
  setSearchContent,
  console,
  levenshtein,
  filter,
  setFilter,
  view,
  setView,
  selectedContinent,
  setSelectedContinent,
  continents,
  Badge,
}) => (
  // id is assigned here for scrolling directly to the map
  <Container mb={0} id="map">
    <Container as="form" variant="cards.sunken">
      <Grid
        columns={[null, "3fr 1fr 1fr"]} // 5 column grid
        gap={3} // gap between columns
      >
        <Box gridcolumn={[null, "span 3"]}>
          <Label>Search Clubs</Label>

          <Box
            sx={{
              display: "flex",
              paddingLeft: 2,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Icon color="muted" glyph="search" size={24} />
            <Input
              value={searchContent}
              onChange={(event) => {
                setSearchContent(event.target.value);
              }}
              placeholder="Leader, School, City, State, Zip Code, or Country"
            />
          </Box>
        </Box>
        <Box gridcolumn={[null, "span 1"]}>
          <Label>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon glyph="filter" size={24} />
              Sort
            </Box>
          </Label>

          <Select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              if (event.target.value === "Proximity") {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLatitude(latitude);
                    setUserLongitude(longitude);
                  },
                  (error) => {
                    console.error("Error getting location:", error.message);
                  }
                );
              }
            }}
          >
            <option value="Relevancy">Relevancy</option>
            <option value="Alphabetic">Alphabetic</option>
            <option value="Proximity">Proximity</option>
          </Select>
        </Box>
        <Box gridcolumn={[null, "span 1"]}>
          <Label>View</Label>

          <Select
            value={view}
            onChange={(event) => setView(event.target.value)}
          >
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
          cursor: "pointer",
        }}
        mt={3}
        onClick={() => setSelectedContinent("")}
        color={selectedContinent !== "" ? "muted" : null}
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
            cursor: "pointer",
          }}
          color={selectedContinent !== continent ? "muted" : null}
          onClick={() => setSelectedContinent(continent)}
        >
          {continent}
        </Badge>
      ))}
    </Container>
  </Container>
);
