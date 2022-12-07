import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardRace } from "../components/CardRace";
import { CardRaceInfo } from "../components/CardRaceInfo";
import { CardMap } from "../components/CardMap";
import React, { useState, useEffect } from "react";
import { CardComments } from "../components/CardComments";
import axios from "axios";

import { useParams } from "react-router-dom";

import "./runPage.scss";

export const RunPage = () => {
  const [runValues, setRunValues] = useState();
  const [userValues, setUserValues] = useState();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    axios
      .get(
        `https://api.fitbuddy.site/race?race=${params.id}`,
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        setRunValues(res.data.data.races);
        setUserValues(res.data.data.races.user);
      });
  }, []);

  let userAccepted = false;


  return (
    <DefaultLayout>
      <div className=" grid grid-cols-12 gap-6 md:gap-8 xl:mx-28 2xl:mx-96">
        <section className="col-span-12 md:col-span-7">
          {userValues && (
            <CardRace
              id={userValues._id}
              name={userValues.fullname}
              avatar={userValues.image}
              title={runValues.title}
              description={runValues.description}
            />
          )}
        </section>
        <section className="col-span-12 md:col-span-5">
          <section className="lg:px-4">
            {runValues && (
              <CardRaceInfo
                type={runValues.type}
                km={runValues.km}
                quantity={runValues.quantity}
                date={runValues.date}
                user={runValues.user}
              />
            )}
          </section>
        </section>
        <section className="col-span-12">
          <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
            Ubicación
          </h2>
          {runValues && (
            <CardMap
              userAccepted={userAccepted}
              mapCoords={runValues.location.coordinates}
            />
          )}
        </section>
        <section className="col-span-12">
          <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
            Comentarios
          </h2>
          <CardComments />
          <CardComments />
          <CardComments />
        </section>
      </div>
    </DefaultLayout>
  );
};
