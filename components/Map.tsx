import React, { useState } from "react";
import ReactMapGl from "react-map-gl";
import { getCenter } from "geolib";

interface Props {
  searchResults: any;
}

function Map({ searchResults }: Props) {
  const [viewport, setViewport] = useState({
    width: "100%",
    heigth: "100%",
    longitude: -100,
    latitude: 40,
    zoom: 11,
  });

  const coordinates = searchResults.map((e: any) => ({
    longitude: e.long,
    latitude: e.lat,
  }));
 
  return (
    <ReactMapGl
      {...viewport}
      mapStyle="mapbox://styles/gingerfury7/clai2jxig000214mv2ltfngwg"
      mapboxAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    ></ReactMapGl>
  );
}

export default Map;
