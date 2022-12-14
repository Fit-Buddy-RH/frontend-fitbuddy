import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg";
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg";
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg";

export const CardFriendRequest = (params) => {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  const acceptRequest = () => {
    axios
      .patch(
        `https://api.fitbuddy.site/friendRequest/${params.requestId}`,
        {
          status: "Aceptado",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  const rejectRequest = () => {
    axios
      .delete(
        `https://api.fitbuddy.site/friendRequest/${params.requestId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };


  return (
    <div className="card-race__container bg-black-600 transition rounded-xl flex flex-row mb-8">
      <img
        src={params.image}
        className="object-cover rounded-l-xl h-auto w-28 sm:w-32"
      />
      <div className="pl-2 flex flex-col sm:flex-row w-full">
        <div className="py-2 px-4 w-full">
          <h2 className=" text-gray-50 text-xl font-bold italic ">
            {params.name}
          </h2>
          <section className="grid grid-cols-2 grid-rows-2">
            <section className="relative right-4 flex flex-col  items-center">
              <FriendsIcon className="scale-m -m-4" />
              <p className=" text-gray-50 text-center text-xs">
                {params.friends} amigos
              </p>
            </section>
            <section className="relative flex flex-col items-center">
              <RunIcon className="scale-m -m-4" />
              <p className=" text-gray-50 text-center text-xs">
                1 carrera asistida
              </p>
            </section>
            <section className="relative right-4 flex flex-col items-center">
              <EditRunIcon className="scale-m -m-4" />
              <p className=" text-gray-50 text-center text-xs">
                {params.created} carrera creada
              </p>
            </section>
            <section className="relative flex flex-col items-center">
              <LevelIcon className="scale-m -m-4" />
              <p className=" text-gray-50 text-center text-xs">
                {params.level}
              </p>
            </section>
          </section>
        </div>
        <div className="self-center flex flex-row sm:flex-col justify-center items-center gap-3 mb-4 mt-1">
          <button
            onClick={acceptRequest}
            className="bg-violet-900 font-rubik text-sm text-gray-50 rounded-full px-2 py-1 sm:py-2 sm:px-4 sm:mx-4 sm:mt-4"
          >
            Aceptar
          </button>
          <button
            onClick={rejectRequest}
            className="bg-gray-600 font-rubik text-sm text-gray-50 rounded-full px-2 py-1 sm:py-2 sm:px-4 sm:mx-4 sm:mt-4"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};
