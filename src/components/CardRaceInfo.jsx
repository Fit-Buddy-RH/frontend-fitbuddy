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
  const [showModal, setShowModal] = useState(false);
  const [userRequests, setUserRequests] = useState();
  const [requestSent, setRequestSent] = useState(false);
  const [userId, setUserId] = useState();
  const [runUserId, setRunUserId] = useState();
  const [requestDone, setRequestDone] = useState(false);

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
        axios
          .get(`https://api.fitbuddy.site/raceRequest?idUser=${res.data.data.users._id}`, {
            headers: { "Content-Type": "application/json", authorization: user },
          })
          .then((res) => {
            res.data.data.requests.map((req) => {
              if (req.race._id === urlParams.id) {
                setRequestDone(true);
              }
            });
            setUserRequests(res.data.data.requests);
          });
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
        setRequestSent(true);
        setShowModal(true);
        // alert("Se envio la solicitud");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deletePost = () => {
    axios
      .delete(`https://api.fitbuddy.site/race/${urlParams.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/my-runs");
      });
  };

  return (
    <div className="card-race-info__container bg-violet-900 transition rounded-xl flex flex-col justify-center">
      <div className="relative my-0 md:ml-4 ml-8 overflow-clip py-10">
        <RunningIcon className="absolute right-0 z-0 top-10 " />
        {params.status === "Finalizada" && (
          <section className="pl-3 mb-2 content-evenly relative flex">
            <Rating name="half-rating-read" value={4.3} precision={0.5} readOnly />
            <h2 className="px-4 text-gray-50 text-xl font-bold italic">{params.rate} de calificación</h2>
          </section>
        )}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                  <div className="flex items-center justify-center p-5 border-b border-solid border-gray-200 rounded-t">
                    <h3 className="text-2xl text-gray-50 font-rubik font-semibold">¡ Se envió la solicitud !</h3>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-violet-900 text-center cursor-pointer text-gray-50 text-xl font-bold italic px-8 py-2 rounded-full"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Seguir buscando carreras
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black-700"></div>
          </>
        ) : null}
        <section className="pt-0 relative">
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
            onClick={requestDone || requestSent ? null : sendRequest}
            className={`bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 py-2 mt-12 rounded-full
            ${params.userAccepted ? "hidden" : ""}
            ${requestDone || requestSent ? "bg-gray-800 cursor-not-allowed disable" : "hover:bg-orange-900"}
            `}
          >
            {requestDone || requestSent ? "Solicitud enviada" : "Unirse"}
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
