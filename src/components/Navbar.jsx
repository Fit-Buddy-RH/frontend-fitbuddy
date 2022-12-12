import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import { ReactComponent as DropdownIcon } from "../assets/DropdownIcon.svg";
import { ReactComponent as BellIcon } from "../assets/BellIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/Logout.svg";
import { ReactComponent as ProfileIcon } from "../assets/ProfileIcon.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState();
  const [userImage, setUserImage] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.fitbuddy.site/user?me=true", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setUserLogged(res.data.data.users.name);
        setUserImage(res.data.data.users.image);
        setUserId(res.data.data.users._id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="flex flex-col z-10 px-6 py-4 sm:px-11 sm:py-6 items-center bg-black-700">
      <div className="flex flex-row w-full">
        <section className="hidden sm:block sm:basis-1/12 self-start">
          <Link to="/runs">
            <FitbuddyIcon />
          </Link>
        </section>
        <section className="basis-11/12 flex flex-row md:basis-9/12 xl:basis-10/12 gap-8">
          <Link to="/runs">
            <h2 className="text-gray-50 sm:hidden font-semibold italic font-rubik text-2xl">Fitbuddy</h2>
          </Link>
          <Link to="/runs" className="self-center">
            <button
              className={`${
                location.pathname === "/runs" ? "text-orange-900 underline underline-offset-8 decoration-orange-400 decoration-3" : "text-gray-50"
              } font-rubik hidden sm:text-lg sm:block sm:pl-4 italic transition hover:scale-110 hover:text-orange-900`}
            >
              Carreras
            </button>
          </Link>
          <Link to="/my-runs" className="self-center">
            <button
              className={`${
                location.pathname === "/my-runs" ? "text-orange-900 underline underline-offset-8 decoration-orange-400 decoration-3" : "text-gray-50"
              } font-rubik hidden sm:text-lg sm:block sm:pl-4 italic transition hover:scale-110 hover:text-orange-900`}
            >
              Mis Carreras
            </button>
          </Link>
        </section>
        {loading ? (
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium bg-white rounded-lg text-gray-50 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Cargando...
          </button>
        ) : (
          <section className="basis-2/12 sm:basis-3/12 lg:basis-2/12 2xl:basis-1/12">
            <button className=" text-gray-50 font-rubik w-full" onClick={handleClick}>
              <section className="flex items-center justify-end gap-3 sm:justify-between hover:text-orange-900">
                <img className="desktop-navbar__actions__image h-10 w-10 rounded-full" src={userImage} alt="User avatar" />
                <p className="hidden sm:block hover:text-orange-900">{userLogged}</p>
                <DropdownIcon className="hidden sm:block scale-75" />
              </section>
            </button>
            {isOpen && (
              <section className="absolute right-5 z-10 flex flex-col text-gray-50 bg-black-600 rounded-xl gap-8 py-8 px-4 my-4">
                <Link to={`/user/${userId}`}>
                  <button className="text-gray-50 font-rubik sm:text-lg lg:block transition hover:scale-110 hover:text-orange-900">
                    <section className="grid grid-cols-3 items-center">
                      <ProfileIcon className="scale-75 col-span-1" />
                      <p>Perfil</p>
                    </section>
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="text-gray-50 font-rubik items-center justify-center sm:text-lg lg:block transition hover:scale-110 hover:text-orange-900">
                    <section className="grid grid-cols-3 items-center">
                      <BellIcon className="scale-75 col-span-1" />
                      <p className="col-span-2">Solicitudes</p>
                    </section>
                  </button>
                </Link>
                <Link to="/">
                  <button
                    onClick={logout}
                    className="text-gray-50 font-rubik items-center justify-center sm:text-lg lg:block transition hover:scale-110 hover:text-orange-900"
                  >
                    <section className="grid grid-cols-3 items-center">
                      <LogoutIcon className="scale-75 col-span-1" />
                      <p className="col-span-2">Cerrar Sesión</p>
                    </section>
                  </button>
                </Link>
              </section>
            )}
          </section>
        )}
      </div>

      <div className={location.pathname === ("/runs" || "/my-runs") ? "flex flex-row gap-8 my-4 md:hidden" : "hidden"}>
        <Link to="/runs">
          <button
            className={
              location.pathname === "/runs"
                ? "text-gray-50 font-rubik sm:text-lg sm:block sm:pl-4 italic transition px-4 py-2 rounded-full bg-violet-700 shadow-button shadow-violet-700"
                : "text-gray-50 font-rubik sm:text-lg sm:block sm:pl-4 italic transition px-4 py-2 rounded-full bg-violet-900"
            }
          >
            Carreras
          </button>
        </Link>
        <Link to="/my-runs">
          <button
            className={
              location.pathname === "/my-runs"
                ? "text-gray-50 font-rubik sm:text-lg sm:block sm:pl-4 italic transition px-4 py-2 rounded-full bg-violet-700 shadow-button shadow-violet-700"
                : "text-gray-50 font-rubik sm:text-lg sm:block sm:pl-4 italic transition px-4 py-2 rounded-full bg-violet-900"
            }
          >
            Mis Carreras
          </button>
        </Link>
      </div>
    </div>
  );
};
