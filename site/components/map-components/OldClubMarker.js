import React, { useRef, useState } from "react";
import { Tooltip, Marker, Popup, useMapEvents } from "react-leaflet";
import { Text } from "theme-ui";
import { useRouter } from 'next/navigation';

export const OldClubMarker = ({
  oldClub,
  leaflet,
  oldClubs,
  encodeURIComponent,
  location,
  navigator,
  window,
  setRecentlyCopied,
  recentlyCopied,
  selectedClubs,
  setSelectedClubs,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const markerRef = useRef(null);

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
  const router = useRouter();

  const handleLinkClick = (e) => {
    e.preventDefault();

    const venue = encodeURIComponent(oldClub?.venue || '');
    const location = encodeURIComponent(oldClub?.location || '');

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      router.push(`https://maps.apple.com/?q=${venue},${location}`);
    } else {
      router.push(`https://www.google.com/maps/dir/?api=1&destination=${venue},${location}`);
    }
  };

  return (
    
    <Marker
      ref={markerRef}
      key={oldClub?.id}
      position={[
        oldClub?.coordinates?.latitude,
        oldClub?.coordinates?.longitude,
      ]}
      icon={leaflet.icon({
        iconUrl: !popupOpen
          ? "https://cloud-mawt7v7fm-hack-club-bot.vercel.app/0flagblue.svg"
          : "https://cloud-ml2k34n5j-hack-club-bot.vercel.app/0filledin.svg",
        iconSize: [24, 24],
        iconAnchor: [12, 12], // Add this line
      })}
      eventHandlers={{
        click: () => {
          setPopupOpen(true);
        },
      }}
    >
      <Tooltip direction="bottom">{oldClub?.name}</Tooltip>

      <Popup
        maxWidth={250}
        closeButton={false}
        style={{ display: "flex", flexDirection: "column" }}
        onClose={() => {
          setPopupOpen(false);
        }}
      >
        <Text style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>
          {oldClub?.name}
        </Text>

      </Popup>
    </Marker>
  );
};
