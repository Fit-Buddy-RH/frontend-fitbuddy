import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardRaces } from "../components/CardRaces";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const MyRunsPage = () => {
  const [myRaces, setMyRaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.fitbuddy.site/race?me=true", { headers: { "Content-Type": "application/json", authorization: user } })
      .then((res) => {
        setMyRaces(res.data.data.racesCreated);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  return (
    <DefaultLayout>
      {loading ? (
        <div className="flex flex-row items-center justify-center text-center h-screen">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-2xl text-center font-medium bg-white rounded-lg text-gray-50 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Cargando ...
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-2 sm:gap-8 mx-0 xl:mx-48 2xl:mx-96">
          <section className="col-span-12 flex felx-row justify-between">
            <h2 className="invisible sm:text-5xl sm:visible text-gray-50 font-rubik italic font-bold">Mis Carreras</h2>
            <Link to="/post">
              <button className="button__orange text-xs sm:text-lg text-gray-50 bg-orange-900 font-rubik italic font-bold px-4 py-2 sm:px-8 rounded-full transition">
                + CARRERA
              </button>
            </Link>
          </section>
          {myRaces && myRaces.length > 0 ? (
            myRaces.map((race) => {
              return (
                <section key={race._id} className="col-span-6 md:col-span-12 lg:col-span-6">
                  <CardRaces title={race.title} description={race.description} avatar={race.user.image} id={race._id} image={race.image} />
                </section>
              );
            })
          ) : (
            <h2 className="text-gray-500 col-span-full font-rubik text-lg mb-20">Aún no creaste ninguna carrera. ¿Quieres empezar con una?</h2>
          )}
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
      )}
    </DefaultLayout>
  );
};
