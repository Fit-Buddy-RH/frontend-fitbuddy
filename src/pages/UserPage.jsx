import { useEffect } from "react";
import { useState } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { UserCard } from "../components/UserCard";

import { CardRaceProfile } from "../components/CardRaceProfile";
import { CardUserProfile } from "../components/CardUserProfile";
import { CardFriendRequest } from "../components/CardFriendRequest";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./userPage.scss";

export const UserPage = () => {
  const [friendRequests, setFriendRequests] = useState();
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState();
  const [userFriends, setUserFriends] = useState();
  const [userRacesCreated, setUserRacesCreated] = useState();
  const [userRacesAssisted, setUserRacesAssisted] = useState();
  const [openTab, setOpenTab] = useState(1);
  const [friend, setFriend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userValues, setUserValues] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.fitbuddy.site/user?idUser=${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setUserRacesCreated(res.data.data.users.racesCreated);
        setUserFriends(res.data.data.users.friends);
        setUserValues(res.data.data.users);
      })
      .catch((err) => {
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });

    axios
      .get("https://api.fitbuddy.site/friendRequest", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setFriendRequests(res.data.data.requests);
      })
      .catch((err) => {
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });

    axios
      .get(`https://api.fitbuddy.site/race?user=${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setUserRacesAssisted(res.data.data.racesAssisted);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });

    setFriend(true);
    let calculateAngle = function (e, item, parent) {
      let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
      if (parent.getAttribute("data-filter-color") !== null) {
        dropShadowColor = parent.getAttribute("data-filter-color");
      }

      let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
      let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

      let halfWidth = item.getBoundingClientRect().width / 2;
      let halfHeight = item.getBoundingClientRect().height / 2;

      let calcAngleX = (x - halfWidth) / 300;
      let calcAngleY = (y - halfHeight) / 280;

      item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1)`;

      parent.style.perspective = `${halfWidth * 2}px`;
      item.style.perspective = `${halfWidth * 3}px`;

      if (parent.getAttribute("data-custom-perspective") !== null) {
        parent.style.perspective = `${parent.getAttribute("data-custom-perspective")}`;
      }

      let calcShadowX = (x - halfWidth) / 70;
      let calcShadowY = (y - halfHeight) / 70;

      // Add a filter shadow - this is more performant to animate than a regular box shadow.
      item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
    };

    document.querySelectorAll(".user__card").forEach(function (item) {
      item.addEventListener("mouseenter", function (e) {
        calculateAngle(e, this.querySelector(".user__card-profile"), this);
      });

      item.addEventListener("mousemove", function (e) {
        calculateAngle(e, this.querySelector(".user__card-profile"), this);
      });

      item.addEventListener("mouseleave", function (e) {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
        if (item.getAttribute("data-filter-color") !== null) {
          dropShadowColor = item.getAttribute("data-filter-color");
        }
        item.querySelector(".user__card-profile").style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        item.querySelector(".user__card-profile").style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
      });
    });
  }, [params]);

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
        <div className="grid grid-cols-12 gap-4 place-items-center mx-0 xl:mx-48 2xl:mx-96">
          {!friend && (
            <section className="user__card col-start-4 col-span-6 mb-16 ">
              <section className="user__card-profile">
                {userRacesAssisted && userValues && (
                  <UserCard
                    id={userValues._id}
                    image={userValues.image}
                    assisted={userRacesAssisted.length}
                    fullname={userValues.fullname}
                    name={userValues.name}
                    lastname={userValues.lastname}
                    friends={userValues.friends.length}
                    level={userValues.level}
                    created={userValues.racesCreated.length}
                    className="user__card-content"
                    setShowModal={setShowModal}
                    setErrorState={setErrorState}
                    showModal={showModal}
                  />
                )}
              </section>
            </section>
          )}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                    <div className="flex items-center justify-center p-5 border-b border-solid border-gray-200 rounded-t">
                      <h3 className="lg:text-xl text-gray-50 font-rubik font-semibold">¡ Solicitud de amistad enviada !</h3>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-violet-900 text-center cursor-pointer text-gray-50 text-sm lg:text-xl font-bold italic px-8 py-2 rounded-full"
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
          {errorState ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                    <div className="flex items-center justify-center p-5 border-b border-solid border-gray-200 rounded-t">
                      <h3 className="lg:text-xl text-gray-50 text-center font-rubik font-semibold">¡ Ya enviaste una solicitud a este usuario !</h3>
                    </div>
                    <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-violet-900 text-center text-sm cursor-pointer text-gray-50 lg:text-xl font-bold italic px-8 py-2 rounded-full"
                        type="button"
                        onClick={() => setErrorState(false)}
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
          <section className="col-span-12 sm:col-span-7 flex flex-col place-self-start  w-full h-min-screen text-gray-50">
            <ul
              className="flex list-none flex-row justify-center items-center place-self-center sm:place-self-start mb-4 bg-gray-800 rounded-full tabs__container"
              role="tablist"
            >
              <li className="mr-2 text-center">
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
                  Carreras
                </a>
              </li>
              <li className=" text-center">
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
                  Amigos
                </a>
              </li>
            </ul>
            <div className="flex-col break-words bg-white w-full rounded">
              <div className="flex-auto">
                <div className="w-full">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-4">Carreras Creadas</h2>
                    {userRacesCreated && userRacesCreated.length > 0 ? (
                      userRacesCreated.map((race) => {
                        return (
                          <section className="my-4" key={race._id}>
                            <CardRaceProfile
                              title={race.title}
                              description={race.description}
                              id={race._id}
                              quantity={race.quantity}
                              image={race.image}
                            />
                          </section>
                        );
                      })
                    ) : (
                      <h2 className="text-gray-500 font-rubik text-lg mb-20">Aún no asististe a ninguna carrera. ¿Quieres empezar con una?</h2>
                    )}
                    <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold">Carreras Asistidas</h2>
                    {userRacesAssisted && userRacesAssisted.length > 0 ? (
                      userRacesAssisted.map((race) => {
                        return (
                          <section className="my-4" key={race._id}>
                            <CardRaceProfile title={race.title} description={race.description} id={race._id} quantity={race.quantity} />
                          </section>
                        );
                      })
                    ) : (
                      <h2 className="text-gray-500 font-rubik text-lg my-4">
                        Aún no finalizaste ninguna carrera. Cuando termines alguna aparecerá en este lugar.
                      </h2>
                    )}
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-4">Solicitudes de amistad</h2>
                    {friendRequests && friendRequests.length > 0 ? (
                      friendRequests.map((request) => {
                        return (
                          <CardFriendRequest
                            requestId={request._id}
                            key={request.userRequester._id}
                            id={request.userRequester._id}
                            friends={request.userRequester.friends.length}
                            level={request.userRequester.level}
                            created={request.userRequester.racesCreated.length}
                            image={request.userRequester.image}
                            name={request.userRequester.name}
                            lastname={request.userRequester.lastname}
                            userToken={user}
                          />
                        );
                      })
                    ) : (
                      <h2 className="text-gray-500 font-rubik text-lg mb-20">
                        Aún no tienes ninguna solicitud de amistad. En cuanto tengas una aparecerá aquí.
                      </h2>
                    )}
                    <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-4">Amigos</h2>
                    {userFriends && userFriends.length > 0 ? (
                      userFriends.map((friend) => {
                        return (
                          <Link to={`/user/${friend._id}`} key={friend._id}>
                            <CardUserProfile
                              name={friend.name}
                              lastname={friend.lastname}
                              friends={friend.friends.length}
                              created={friend.racesCreated.length}
                              image={friend.image}
                              level={friend.level}
                            />
                          </Link>
                        );
                      })
                    ) : (
                      <h2 className="text-gray-500 font-rubik text-lg mb-4">
                        Aún no tienes ningun amigo. En cuanto tengas uno tus amigos aparecerán aquí.
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="order-first sm:order-last user__card col-span-12 sm:col-span-5 place-self-start justify-self-center">
            <section className="user__card-profile">
              {userRacesAssisted && userValues && (
                <UserCard
                  id={userValues._id}
                  image={userValues.image}
                  assisted={userRacesAssisted.length}
                  fullname={userValues.fullname}
                  friends={userValues.friends.length}
                  name={userValues.name}
                  lastname={userValues.lastname}
                  level={userValues.level}
                  created={userValues.racesCreated.length}
                  className="user__card-content"
                  setShowModal={setShowModal}
                  showModal={showModal}
                  setErrorState={setErrorState}
                />
              )}
            </section>
          </section>
        </div>
      )}
    </DefaultLayout>
  );
};
