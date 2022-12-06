import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as LocationIcon } from "../assets/LocationIcon.svg";
import { ReactComponent as AreaIcon } from "../assets/AreaIcon.svg";
import Map, { Marker, GeolocateControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { set } from "react-hook-form";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ";

export const CardMapShow = ({ latLng, setLatLng }) => {

  const [lng, lat] = latLng

  return (
    <Map
      initialViewState={{
        longitude: -99.18670587646949,
        latitude: 19.42591581551342,
        zoom:14,
        maxZoom: 14,
        minZoom:10
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
          setLatLng([e.lngLat.lng, e.lngLat.lat]);

        }}
      >
        <GeolocateControl
          maxZoom={10}
          showAccuracyCircle={false}
          showUserLocation={false}
          onGeolocate={(e) => {
            setLatLng([e.coords.longitude, e.coords.latitude]);            
          }}
        />
        <LocationIcon scale={2} />
      </Marker>
    </Map>
  );
};