import Icon from "@hackclub/icons";
import React, { useState } from "react";
import {
  Box,
  Card,
  Label,
  Flex,
  Link,
  Text,
  Grid,
  Button,
  Checkbox,
} from "theme-ui";

export const ClubPreview = ({
  club,
  isMobile,
  setSelectedClubs,
  selectedClubs,
  setClubOpened,
  setRecentlyCopied,
  navigator,
  recentlyCopied,
}) => {
  const [toggle, setToggle] = useState(false);

  let { description, socials, website } = club;
  website = "https://jianminchen.com";
  socials = {
    github: "https://github.com/chss",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  };

  if (!description || !socials || !website)
    return (
      <Card
        onClick={() => console.log(club)}
        as={"div"}
        variant="primary"
        sx={{
          p: [3, 4, 2],
          // cursor: "pointer"
        }}
        mb={2}
      >
        {!isMobile ? (
          <Grid
            columns={[null, "0.15fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr"]}
            gap={3}
            sx={{ pl: [1, 3], pr: [1, 3], alignItems: "center" }}
          >
            <Label>
              <Checkbox
                onClick={() => {
                  if (selectedClubs.includes(club.id)) {
                    setSelectedClubs(
                      selectedClubs.filter(
                        (clubPicked) => clubPicked !== club.id
                      )
                    );
                  } else {
                    setSelectedClubs([...selectedClubs, club.id]);
                  }
                }}
                checked={selectedClubs.includes(club.id)}
                defaultChecked={false}
              />
            </Label>
            <p
            // onClick={() =>
            //   setClubOpened(club)
            //   }
            >
              {club.name}
            </p>
            <Link
              sx={{
                color: "accent",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                const venue = encodeURIComponent(club.venue);
                const location = encodeURIComponent(club.location);

                if (
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  )
                ) {
                  window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
                } else {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
                  );
                }
              }}
            >
              {club.venue}
            </Link>
            <p
            // onClick={() =>
            //   // setClubOpened(club)
            //   }
            >
              {club.location.slice(0, 128)}
              {club.location.length > 128 ? "..." : ""}
            </p>

            <p
            // onClick={() =>
            //   // setClubOpened(club)
            //   }
            >
              {club.leaders[0].name}
            </p>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                as="a"
                onClick={() => {
                  setRecentlyCopied(club.id);
                  navigator.clipboard.writeText(
                    club.leaders.map((leader) => leader.email).join(", ")
                  );
                }}
              >
                {recentlyCopied == club.id ? "Copied Email" : "Contact"}
              </Button>
            </Box>
          </Grid>
        ) : (
          <Box
            sx={{ flexDirection: "column", display: "flex", color: "darkless" }}
          >
            <Text sx={{ fontSize: 3, fontWeight: 600 }}>{club.name}</Text>
            <Text sx={{ color: "slate" }}>
              Led by {club.leaders[0].name}
              <Text sx={{ color: "darkless" }}></Text>
            </Text>
            <Link
              sx={{
                color: "accent",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                const venue = encodeURIComponent(club.venue);
                const location = encodeURIComponent(club.location);

                if (
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  )
                ) {
                  window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
                } else {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
                  );
                }
              }}
            >
              {club.venue}, {club.location.slice(0, 128)}
              {club.location.length > 128 ? "..." : ""}
            </Link>
            <Box>
              <Button
                variant="primary"
                as="a"
                sx={{ width: "fit-content", mt: 3 }}
                onClick={() => {
                  setRecentlyCopied(club.id);
                  navigator.clipboard.writeText(
                    club.leaders.map((leader) => leader.email).join(", ")
                  );
                }}
              >
                {recentlyCopied == club.id ? "Copied Email" : "Contact"}
              </Button>
              <Button
                variant="primary"
                as="a"
                sx={{
                  width: "fit-content",
                  mt: 3,
                  ml: 2,
                  backgroundColor: "#EC375010",
                  color: "primary",
                  fontWeight: 400,
                }}
                onClick={() => {
                  if (selectedClubs.includes(club.id)) {
                    setSelectedClubs(
                      selectedClubs.filter(
                        (clubPicked) => clubPicked !== club.id
                      )
                    );
                  } else {
                    setSelectedClubs([...selectedClubs, club.id]);
                  }
                }}
              >
                {!selectedClubs.includes(club.id) ? "Select" : "Selected"}
              </Button>
            </Box>
          </Box>
        )}
      </Card>
    );

  return (
    <Box as="details" open={toggle} mb={2} onToggle={() => setToggle(!toggle)}>
      <style jsx>{`
        summary {
          list-style: none;
        }

        summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
      <summary>
        <Card
          variant="primary"
          sx={{
            p: [3, 4, 2],
            cursor: "pointer",
            position: "relative",
            zIndex: 50,
          }}
        >
          {!isMobile ? (
            <Grid
              columns={[null, "0.15fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr"]}
              gap={3}
              sx={{
                pl: [1, 3],
                pr: [1, 3],
                alignItems: "center",
                userSelect: "none",
              }}
            >
              <Label>
                <Checkbox
                  onClick={() => {
                    if (selectedClubs.includes(club.id)) {
                      setSelectedClubs(
                        selectedClubs.filter(
                          (clubPicked) => clubPicked !== club.id
                        )
                      );
                    } else {
                      setSelectedClubs([...selectedClubs, club.id]);
                    }
                  }}
                  checked={selectedClubs.includes(club.id)}
                  defaultChecked={false}
                />
              </Label>
              <p
              // onClick={() =>
              //   setClubOpened(club)
              //   }
              >
                {club.name}
              </p>
              <Link
                sx={{
                  color: "accent",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  const venue = encodeURIComponent(club.venue);
                  const location = encodeURIComponent(club.location);

                  if (
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      navigator.userAgent
                    )
                  ) {
                    window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
                  } else {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
                    );
                  }
                }}
              >
                {club.venue}
              </Link>
              <p
              // onClick={() =>
              //   // setClubOpened(club)
              //   }
              >
                {club.location.slice(0, 128)}
                {club.location.length > 128 ? "..." : ""}
              </p>

              <p
              // onClick={() =>
              //   // setClubOpened(club)
              //   }
              >
                {club.leaders[0].name}
              </p>
              <Flex
                style={{
                  flexDirection: "row",
                  justifyContent: "end",
                  gap: 5,
                }}
              >
                <Button
                  variant="primary"
                  as="a"
                  onClick={(event) => {
                    event.preventDefault();
                    setRecentlyCopied(club.id);
                    navigator.clipboard.writeText(
                      club.leaders.map((leader) => leader.email).join(", ")
                    );
                  }}
                >
                  {recentlyCopied == club.id ? "Copied Email" : "Contact"}
                </Button>
                <Button
                  as="a"
                  variant="primary"
                  sx={{
                    width: "fit-content",
                    paddingInline: 2,
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    glyph={toggle ? "up-caret" : "down-caret"}
                    size={20}
                    style={{ marginInline: 0, paddingRight: 0 }}
                  />
                </Button>
              </Flex>
            </Grid>
          ) : (
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                color: "darkless",
              }}
            >
              <Text sx={{ fontSize: 3, fontWeight: 600 }}>{club.name}</Text>
              <Text sx={{ color: "slate" }}>
                Led by {club.leaders[0].name}
                <Text sx={{ color: "darkless" }}></Text>
              </Text>
              <Link
                sx={{
                  color: "accent",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  const venue = encodeURIComponent(club.venue);
                  const location = encodeURIComponent(club.location);

                  if (
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      navigator.userAgent
                    )
                  ) {
                    window.location.href = `https://maps.apple.com/?q=${venue},${location}`;
                  } else {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`
                    );
                  }
                }}
              >
                {club.venue}, {club.location.slice(0, 128)}
                {club.location.length > 128 ? "..." : ""}
              </Link>
              <Flex sx={{ justifyContent: "space-between" }}>
                <Box>
                  <Button
                    variant="primary"
                    as="a"
                    sx={{ width: "fit-content", mt: 3 }}
                    onClick={() => {
                      setRecentlyCopied(club.id);
                      navigator.clipboard.writeText(
                        club.leaders.map((leader) => leader.email).join(", ")
                      );
                    }}
                  >
                    {recentlyCopied == club.id ? "Copied Email" : "Contact"}
                  </Button>
                  <Button
                    variant="primary"
                    as="a"
                    sx={{
                      width: "fit-content",
                      mt: 3,
                      ml: 2,
                      backgroundColor: "#EC375010",
                      color: "primary",
                      fontWeight: 400,
                    }}
                    onClick={() => {
                      if (selectedClubs.includes(club.id)) {
                        setSelectedClubs(
                          selectedClubs.filter(
                            (clubPicked) => clubPicked !== club.id
                          )
                        );
                      } else {
                        setSelectedClubs([...selectedClubs, club.id]);
                      }
                    }}
                  >
                    {!selectedClubs.includes(club.id) ? "Select" : "Selected"}
                  </Button>
                </Box>
                <Button
                  as="a"
                  variant="primary"
                  sx={{
                    width: "fit-content",
                    paddingInline: 2,
                    mt: 3,
                  }}
                >
                  <Icon
                    glyph={toggle ? "up-caret" : "down-caret"}
                    size={20}
                    style={{ marginInline: 0, paddingRight: 0 }}
                  />
                </Button>
              </Flex>
            </Box>
          )}
        </Card>
      </summary>
      <Card
        variant="sunken"
        sx={{
          marginTop: "-9px",
          paddingTop: "calc(32px + 9px) !important",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          position: "relative",
        }}
      >
        <Grid
          columns={[null, "1.5fr 1.5fr"]}
          gap={3}
          sx={{
            pl: [1, 3],
            pr: [1, 3],
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <Text>{description}</Text>
          <Flex
            sx={{ justifySelf: "flex-end", flexDirection: "column", gap: 2 }}
          >
            <Flex
              sx={{
                gap: 1,
                alignSelf: "flex-end",
              }}
            >
              <Button
                variant="primary"
                as="a"
                href={socials.github}
                target="_blank"
              >
                <Icon
                  glyph="github"
                  size={20}
                  style={{ marginInline: 0, paddingRight: 0 }}
                />
              </Button>
              <Button
                variant="primary"
                as="a"
                href={socials.linkedin}
                target="_blank"
              >
                <Icon
                  glyph="profile"
                  size={18}
                  style={{ marginInline: 0, paddingRight: 0 }}
                />
              </Button>
              <Button
                variant="primary"
                as="a"
                href={socials.twitter}
                target="_blank"
              >
                <Icon
                  glyph="twitter"
                  size={18}
                  style={{ marginInline: 0, paddingRight: 0 }}
                />
              </Button>
            </Flex>
            {website !== null && (
              <Button variant="primary" as="a" href={website} target="_blank">
                {website}
              </Button>
            )}
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
};
