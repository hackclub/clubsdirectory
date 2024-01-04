import React, { useState } from "react";
import { Tooltip, Marker, Popup, useMapEvents } from "react-leaflet";
import { Text, Link, Button, Box } from "theme-ui";

export const ClubMarker = ({
  club,
  leaflet,
  clubs,
  encodeURIComponent,
  location,
  navigator,
  setRecentlyCopied,
  recentlyCopied,
  selectedClubs,
  setSelectedClubs,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const markerRef = React.useRef(null);

  useMapEvents({
    click: () => {
      if (popupOpen) {
        setPopupOpen(false);
      }
    },
  });

  const handleClick = () => {
    setTooltipOpen(false);
    setPopupOpen(true);
  };

  const handleMapLink = (club) => {
    const venue = encodeURIComponent(club?.venue || "");
    const location = encodeURIComponent(club?.location || "");

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return `https://maps.apple.com/?q=${venue},${location}`;
    } else {
      return `https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`;
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();

    const mapLink = handleMapLink(club);

    window.open(mapLink, "_blank");
  };

  return (
    <Marker
      ref={markerRef}
      key={club.id}
      position={[
        club?.geo_data?.coordinates?.latitude,
        club?.geo_data?.coordinates?.longitude,
      ]}
      icon={leaflet.icon({
        iconUrl: !popupOpen
          ? "https://cloud-km1a71qag-hack-club-bot.vercel.app/0clubselected.svg"
          : "https://cloud-je5xcyfo4-hack-club-bot.vercel.app/0clubmarker.svg",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })}
      eventHandlers={{
        click: () => {
          setPopupOpen(true);
        },
      }}
    >
      <Tooltip direction="bottom">{club.name}</Tooltip>

      <Popup
        maxWidth={250}
        closeButton={false}
        style={{ display: "flex", flexDirection: "column" }}
        onClose={() => {
          setPopupOpen(false);
        }}
      >
        <Text style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>
          {club.name}
        </Text>

        <Link
          sx={{
            color: "accent",
            fontSize: 12,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={handleLinkClick}
        >
          {club.venue}, {club.location.slice(0, 128)}
          {club.location.length > 128 ? "..." : ""}
        </Link>
        <Text
          sx={{ color: "slate", display: "flex", fontSize: 12, paddingY: 1 }}
        >
          Led by {club.leaders[0].name}
          <Text sx={{ color: "darkless" }}></Text>
        </Text>

        <Box>
          <Button
            variant="primary"
            as="a"
            sx={{ width: "fit-content", color: "white", mt: 1 }}
            onClick={() => {
              setRecentlyCopied(club.id);
              navigator.clipboard.writeText(
                club.leaders.map((leader) => leader.email).join(", ")
              );
            }}
          >
            <Text sx={{ color: "white" }}>
              {recentlyCopied == club.id ? "Copied Email" : "Contact"}
            </Text>
          </Button>
          {setSelectedClubs != null ? (
            <Button
              variant="primary"
              as="a"
              sx={{
                width: "fit-content",
                mt: 1,
                ml: 2,
                backgroundColor: "#EC375010",
                color: "primary",
                fontWeight: 400,
              }}
              onClick={() => {
                if (selectedClubs.includes(club.id)) {
                  setSelectedClubs(
                    selectedClubs.filter((clubPicked) => clubPicked !== club.id)
                  );
                } else {
                  setSelectedClubs([...selectedClubs, club.id]);
                }
              }}
            >
              <Text sx={{ color: "primary" }}>
                {!selectedClubs.includes(club.id) ? "Select" : "Selected"}
              </Text>
            </Button>
          ) : null}
        </Box>
      </Popup>
    </Marker>
  );
};
