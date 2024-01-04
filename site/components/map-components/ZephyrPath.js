import React from "react";
import { Polyline } from "react-leaflet";

const ZephyrPath = ({ pos }) => {
  const dashArray = "10, 10";

  return (
    <Polyline
      smoothFactor={1}
      positions={pos}
      color="#B6555150"
      dashArray={dashArray}
    />
  );
};

export default ZephyrPath;
