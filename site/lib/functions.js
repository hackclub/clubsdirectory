//Considering toast for success messages
export function toggleBodyScroll(disable) {
  if (typeof window !== "undefined") {
    if (disable) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
}

export function getClubById(id, clubs) {
  const club = clubs.find((c) => c.id === id);
  return club;
}

import { parse } from "json2csv";
export function downloadCSV(selectedClubs, clubs) {
  const fields = ["Name", "Leader Names", "Venue", "Location", "Leader Emails"];
  const data = selectedClubs.map((id) => {
    const club = clubs.find((c) => c.id === id);
    return {
      Name: club.name,
      "Leader Names": club.leaders.map((leader) => leader.name).join(", "),
      Venue: club.venue,
      Location: club.location,
      "Leader Emails": club.leaders.map((leader) => leader.email).join(", "),
    };
  });

  const csv = parse(data, { fields });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "selected-clubs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function degToRad(degrees) {
  return degrees * (Math.PI / 180); // Conversion from degrees to radians
}

export function calculateDistance(coordinates) {
  const latA = userLatitude;
  const lonA = userLongitude;
  let latB, lonB;

  if (Array.isArray(coordinates)) {
    [latB, lonB] = coordinates;
  } else if (coordinates && typeof coordinates === "object") {
    latB = coordinates.latitude;
    lonB = coordinates.longitude;
  } else {
    return 0; // Invalid coordinates, return 0 distance
  }

  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = degToRad(latB - latA); // Difference in latitude, converted to radians
  const dLon = degToRad(lonB - lonA); // Difference in longitude, converted to radians

  // Haversine formula to calculate the great-circle distance between two points
  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(latA)) *
      Math.cos(degToRad(latB)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Central angle between the two points
  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  // Distance between the two points on the surface of a sphere using the central angle and Earth's radius
  const distance = earthRadius * centralAngle;

  return distance;
}
