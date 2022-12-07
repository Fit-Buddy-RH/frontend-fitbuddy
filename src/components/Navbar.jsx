import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import { ReactComponent as DropdownIcon } from "../assets/DropdownIcon.svg";
import { ReactComponent as BellIcon } from "../assets/BellIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/ProfileIcon.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLogged, setUserLogged] = useState();
  const [userImage, setUserImage] = useState();
  const [userId, setUserId] = useState();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    axios
      .get(
        "https://api.fitbuddy.site/user?me=true",
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        setUserLogged(res.data.data.users.name);
        setUserImage(res.data.data.users.image);
        setUserId(res.data.data.users._id);
      });
  },[])

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="flex z-10 px-6 py-4 sm:px-11 sm:py-6 items-center bg-black-700">
      <section className="hidden sm:block sm:basis-1/12 self-start">
        <Link to="/runs">
          <FitbuddyIcon />
        </Link>
      </section>
      <section className="basis-11/12 md:basis-9/12 xl:basis-10/12 flex gap-8">
        <h2 className="text-gray-50 sm:hidden font-semibold italic font-rubik text-2xl">
          Fitbuddy
        </h2>
        <Link to="/runs">
          <button className="text-gray-50 font-rubik hidden sm:text-lg sm:block sm:pl-4 italic transition hover:scale-110">
            Carreras
          </button>
        </Link>
        <Link to="/my-runs">
          <button className="text-gray-50 font-rubik hidden sm:text-lg sm:block italic transition hover:scale-110">
            Mis Carreras
          </button>
        </Link>
      </section>
      <section className="basis-2/12 sm:basis-3/12 lg:basis-2/12 2xl:basis-1/12">
        <button
          className=" text-gray-50 font-rubik w-full"
          onClick={handleClick}
        >
          <section className="flex items-center justify-end gap-3 sm:justify-between">
            <img
              className="desktop-navbar__actions__image h-10 w-10 rounded-full"
              src={userImage}
              alt="User avatar"
            />
            <p className="hidden sm:block ">
                {userLogged}
            </p>
            <DropdownIcon className="hidden sm:block scale-75" />
          </section>
        </button>
        {isOpen && (
          <section className="absolute right-5 z-10 flex flex-col text-gray-50 bg-black-600 rounded-xl gap-8 py-8 px-4 my-4">
            <Link to={`/user/${userId}`}>
              <button className="text-gray-50 font-rubik sm:text-lg lg:block transition hover:scale-110">
                <section className="grid grid-cols-3 items-center">
                  <ProfileIcon className="scale-75 col-span-1" />
                  <p>Perfil</p>
                </section>
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="text-gray-50 font-rubik items-center justify-center sm:text-lg lg:block transition hover:scale-110">
                <section className="grid grid-cols-3 items-center">
                  <BellIcon className="scale-75 col-span-1" />
                  <p className="col-span-2">Solicitudes</p>
                </section>
              </button>
            </Link>
            <Link to="/">
              <button
                onClick={logout}
                className="text-gray-50 font-rubik items-center justify-center sm:text-lg lg:block transition hover:scale-110"
              >
                <section className="grid grid-cols-3 items-center">
                  <ProfileIcon className="scale-75 col-span-1" />
                  <p className="col-span-2">Cerrar Sesión</p>
                </section>
              </button>
            </Link>
          </section>
        )}
      </section>
    </div>
  );
};
