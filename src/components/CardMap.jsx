import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as LocationIcon } from "../assets/LocationIcon.svg";
import Map, { Marker, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ";

export const CardMap = () => {

  return (
    <Map
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 14,
      }}
      style={{ height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ"
    >
      <Marker
        longitude={-100}
        latitude={40}
        anchor="center"
        pitchAlignment="auto"
        draggable="true"
        onDragEnd={(e) => {
            console.log(e.lngLat)
        }}
      >
        <LocationIcon />
      </Marker>
    </Map>
  );
};
