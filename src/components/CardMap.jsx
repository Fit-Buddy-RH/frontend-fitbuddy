import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as LocationIcon } from "../assets/LocationIcon.svg";
import { ReactComponent as AreaIcon } from "../assets/AreaIcon.svg";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import axios from "axios";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { set } from "react-hook-form";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ";

export const CardMap = (props) => {
  const [userId, setUserId] = useState();
  console.log(props.userAccepted)
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    axios
      .get("https://api.fitbuddy.site/user?me=true", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setUserId(res.data.data.users._id);
      });
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: props.mapCoords[0],
        latitude: props.mapCoords[1],
        zoom: 14,
        maxZoom: 14,
        minZoom: 10,
      }}
      style={{ height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiZW5kZnJvc3QiLCJhIjoiY2xhOGVjMjN6MDJ3YzQwcGU1czlwMzh6NyJ9.ODZjPuPaXT5SFKQCqqvHBQ"
    >
      <Marker
        longitude={props.mapCoords[0]}
        latitude={props.mapCoords[1]}
        anchor="center"
        pitchAlignment="auto"
      >
        { (props.userAccepted || props.userOwner)  ? <LocationIcon /> : <AreaIcon scale={3} />}
      </Marker>
    </Map>
  );
};
