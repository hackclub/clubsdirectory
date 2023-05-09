import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";

const MapComponent = ({ clubs }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            attributions:
              'Tiles courtesy of <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-98.5795, 39.8283]), // set default center of the US
        zoom: 4, // set default zoom level
      }),
    });

    // create a vector source and layer to hold the markers
    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    // create an icon style for the markers
    const iconStyle = new Style({
      image: new Icon({
        src: "https://assets.hackclub.com/icon-rounded.svg",
        scale: 0.2,
      }),
    });

    // add a marker for each club to the vector source
    clubs.forEach((club) => {
      const { latitude, longitude } = club.geo_data.coordinates;
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });
      markerFeature.setStyle(iconStyle);
      markerSource.addFeature(markerFeature);
    });

    // add the marker layer to the map
    map.addLayer(markerLayer);

    return () => {
      // remove the marker layer and map when the component unmounts
      map.removeLayer(markerLayer);
      map.setTarget(null);
      map.dispose();
    };
  }, [clubs]);

  return <div ref={mapRef} style={{ height: "100vh", borderRadius: 16, overflow: "hidden" }} />;
};

export default MapComponent;
