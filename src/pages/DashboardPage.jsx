import React, { useState, useEffect } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CardRaceSent } from "../components/CardRaceSent";
import { CardRaceRequest } from "../components/CardRaceRequest";
import axios from "axios";

import "./dashboardPage.scss";

export const DashboardPage = () => {
  const [userRaces, setUserRaces] = useState([]);
  const [userRequests, setUserRequests] = useState();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.fitbuddy.site/user?raceRequest=true", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setRequests(res.data.data.raceRequests);
      })
      .catch((err) => {

        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
        window.location.reload();
      });
    axios
      .get("https://api.fitbuddy.site/user?me=true", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setLoading(false);
        axios
          .get(`https://api.fitbuddy.site/raceRequest?idUser=${res.data.data.users._id}`, {
            headers: { "Content-Type": "application/json", authorization: user },
          })
          .then((res) => {
            setUserRequests(res.data.data.requests);
            setLoading(false);
          })
          .catch((err) => {
  
            if (err.response.data.error === "jwt expired") {
              navigate("/login-1");
            }
          });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
        window.location.reload();
      });
  }, []);

  const [openTab, setOpenTab] = useState(1);

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
        <div className="grid grid-cols-12 gap-4 place-items-center">
          <section className="md:col-start-3 md:col-span-8 col-span-12 place-self-start text-gray-50 ">
            <h2 className="md:text-xl lg:text-2xl text-gray-50 text-center md:text-start font-rubik italic font-bold mb-8">Solicitudes de Carreras</h2>
            <div className="flex flex-col items-center md:items-start">
              <ul className="flex flex-row list-none items-center justify-center bg-gray-800 rounded-full tabs__container-dashboard" role="tablist">
                <li className="text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 rounded-full block leading-normal " +
                      (openTab === 1 ? "text-white " + "bg-orange-900" : "text-gray-50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Enviadas
                  </a>
                </li>
                <li className="text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 rounded-full block leading-normal " +
                      (openTab === 2 ? "text-white " + "bg-orange-900" : "text-gray-50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Recibidas
                  </a>
                </li>
              </ul>
              <div className="flex-col break-words bg-white w-full mb-12 rounded">
                <div className="px-2 md:px-4 py-5 flex-auto">
                  <div className="">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      {userRequests && userRequests.length > 0 ? (
                        userRequests.map((request) => {
                          return (
                            <Link to={`/run/${request.race._id}`} key={request.race._id}>
                              <CardRaceSent
                                image={request.race.image}
                                title={request.race.title}
                                description={request.race.description}
                                assistants={request.race.assistants.length}
                                status={request.status}
                              />
                            </Link>
                          );
                        })
                      ) : (
                        // <CardRaceSent name={"a"} />
                        <section>
                          <h2 className="text-gray-500 font-rubik text-lg mb-4">
                            Aún no enviaste solicitud de carrera. Cuando tengas alguna aparecerá aquí.
                          </h2>
                        </section>
                      )}
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      {requests && requests.length > 0 ? (
                        requests.map((request) => {
                          return (
                            <section key={request._id}>
                              <h2 className="text-gray-50 font-rubik font-bold italic mb-4">{request.race.title}</h2>
                              <p className="text-gray-50 font-rubik italic mb-4"></p>
                              <CardRaceRequest
                                user={request.user._id}
                                name={request.user.fullname}
                                friends={request.user.friends.length}
                                level={request.user.level}
                                created={request.user.racesCreated.length}
                                image={request.user.image}
                                requestId={request._id}
                              />
                            </section>
                          );
                        })
                      ) : (
                        <section>
                          <h2 className="text-gray-500 font-rubik text-lg mb-4">
                            Aún no recibiste ninguna solicitud de carrera. Cuando tengas alguna aparecerá aquí.
                          </h2>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </DefaultLayout>
  );
};
