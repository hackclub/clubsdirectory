import React from "react";

const MapFrame = () => {
  return (
    <iframe
      title="Hack Club Map"
      src="https://hackclub.com/map/"
      width="100%"
      height="500"
      style={{ border: "none", borderRadius: 16, overflow: "hidden" }}
    />
  );
};

export default MapFrame;
