import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardRaces } from "../components/CardRaces";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const MyRunsPage = () => {
  const [myRaces, setMyRaces] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    axios
      .get(
        "https://api.fitbuddy.site/race?me=true",
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        setMyRaces(res.data.data.racesCreated);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-2 sm:gap-8 mx-0 xl:mx-48 2xl:mx-96">
        <section className="col-span-12 flex felx-row justify-between">
          <h2 className="invisible sm:text-5xl sm:visible text-gray-50 font-rubik italic font-bold">
            Mis Carreras
          </h2>
          <Link to="/post">
            <button className="button__orange text-xs sm:text-lg text-gray-50 bg-orange-900 font-rubik italic font-bold px-4 py-2 sm:px-8 rounded-full transition">
              + CARRERA
            </button>
          </Link>
        </section>
        {myRaces.map((race) => {
          return (
            <section
              key={race._id}
              className="col-span-6 md:col-span-12 lg:col-span-6"
            >
              <CardRaces
                title={race.title}
                description={race.description}
                avatar={race.user.image}
                id={race._id}
                image={race.image}
              />
            </section>
          );
        })}
        {/* <section className="col-span-6 md:col-span-12 lg:col-span-6">
          <CardRaces title={"prueba"} description={"descr"} image={"link"} />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-12 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-6">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-12 lg:col-span-6">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-12 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-6">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-12 lg:col-span-6">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section>
        <section className="col-span-6 md:col-span-6 lg:col-span-3">
          <CardRaces />
        </section> */}
      </div>
    </DefaultLayout>
  );
};
