import { ReactComponent as RunningIcon } from "../assets/RaceCardBackground.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";

export const CardRaceInfo = (params) => {
  const date = new Date(params.date);
  const urlParams = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [runUserId, setRunUserId] = useState();

  // console.log(date.getUTCHours());

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
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  const sendRequest = () => {
    axios
      .post(`https://api.fitbuddy.site/raceRequest/${urlParams.id}`, {}, { headers: { "Content-Type": "application/json", authorization: user } })
      .then((res) => {
        alert("Se envio la solicitud").then(window.location.reload());
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const deletePost = () => {
    axios
      .delete(`https://api.fitbuddy.site/race/${urlParams.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        navigate("/my-runs");
      });
  };

  return (
    <div className="card-race-info__container bg-violet-900  transition rounded-xl flex flex-col justify-center">
      <div className="relative my-4 md:my-0 md:ml-4 ml-8 overflow-clip py-10">
        <RunningIcon className="absolute right-0 z-0 top-10 " />
        {params.status === "Finalizada" && (
          <section className="pl-3 content-evenly relative flex">
            <Rating name="half-rating-read" value={4.3} precision={0.5} readOnly />
            <h2 className="px-4 text-gray-50 text-xl font-bold italic">{params.rate} de calificación</h2>
          </section>
        )}
        <section className="pt-4 relative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Tipo de evento</h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">{params.type}</p>
        </section>
        <section className="pt-4 relative ">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Distancia</h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">{params.km} km</p>
        </section>
        <section className="pt-4 relative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Fecha y hora</h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </p>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {date.getUTCHours()}:{date.getUTCMinutes() === 0 ? "00" : date.getUTCMinutes()}
          </p>
        </section>
        <section className="pt-4 telative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Asistirán</h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">{params.quantity + 1} personas</p>
        </section>
        {userId === params.user._id && params.status === "Programada" ? (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 mt-2">
            <button className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 mx-8 py-2 rounded-full hover:bg-orange-900">
              Editar
            </button>
            <button
              onClick={deletePost}
              className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 py-2 mx-8 lg:mx-0 rounded-full hover:bg-orange-900"
            >
              Eliminar
            </button>
          </div>
        ) : userId !== params.user._id && params.status === "Programada" ? (
          <button
            onClick={sendRequest}
            className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 py-2  my-12 rounded-full hover:bg-orange-900"
          >
            Unirse
          </button>
        ) : params.status === "Finalizada" ? (
          <section className="pt-6">
            <span className="text-gray-50 ml-4 bg-violet-900 text-3xl underline drop-shadow-xl shadow-orange-900 font-bold italic rounded-full ">
              Finalizada
            </span>
          </section>
        ) : null}
      </div>
    </div>
  );
};
