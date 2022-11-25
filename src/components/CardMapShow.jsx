import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as LocationIcon } from "../assets/LocationIcon.svg";
import Map, { Marker, GeolocateControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ";

export const CardMapShow = () => {
  const [lat, setLat] = useState(19.42591581551342);
  const [lng, setLng] = useState(-99.18670587646949);

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      style={{ height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ"
    >
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="center"
        pitchAlignment="auto"
        draggable="true"
        onDragEnd={(e) => {
          setLng(e.lngLat.lng);
          setLat(e.lngLat.lat);
        }}
      >
        <GeolocateControl
          maxZoom={10}
          showAccuracyCircle={false}
          showUserLocation={false}
          onGeolocate={(e) => {
            setLng(e.coords.longitude);
            setLat(e.coords.latitude);
          }}
        />
        <LocationIcon />
      </Marker>
    </Map>
  );
};
