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

  const sendRequest = () => {
    axios
      .post(
        `https://api.fitbuddy.site/raceRequest/${urlParams.id}`,
        {},
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        alert("Se envio la solicitud");
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
      <div className="relative my-4 md:my-0 md:ml-4 ml-8 overflow-clip">
        <RunningIcon className="absolute right-0 z-0 top-10 " />
        {params.status === "Finalizada" && (
          <div className="pt-4 content-evenly">
            <Rating
              name="half-rating-read"
              value={params.rate}
              precision={0.5}
              readOnly
            />
            <span className="px-4 text-gray-50 text-xl font-bold italic">
              {params.rate} de calificación
            </span>
          </div>
        )}

        <section className="pt-4 relative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">
            Tipo de evento
          </h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {params.type}
          </p>
        </section>
        <section className="pt-4 relative ">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">
            Distancia
          </h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {params.km} km
          </p>
        </section>
        <section className="pt-4 relative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">
            Fecha y hora
          </h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </p>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {date.getHours()}:
            {date.getMinutes() === 0 ? "00" : date.getMinutes()}
          </p>
        </section>
        <section className="pt-4 telative">
          <h2 className="px-4 text-gray-50 text-2xl font-bold italic">
            Asistirán
          </h2>
          <p className="px-4 text-gray-50 text-lg font-bold italic">
            {params.quantity} personas
          </p>
        </section>
        {userId === params.user._id && params.status === "Programada" ? (
          <div>
            <button className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 mx-4 py-2  my-12 rounded-full hover:bg-orange-900">
              Editar
            </button>
            <button
              onClick={deletePost}
              className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 mx-4 py-2  my-12 rounded-full hover:bg-orange-900"
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
          <section className="pt-4 telative">
            <h2 className="px-4 text-gray-50 text-4xl underline underline-offset-5 font-bold italic ">
              Finalizada
            </h2>
          </section>
        ) : null}
      </div>
    </div>
  );
};
