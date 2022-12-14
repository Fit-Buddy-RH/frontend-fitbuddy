import { useEffect } from "react";
import { useState } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { UserCard } from "../components/UserCard";

import { CardRaceProfile } from "../components/CardRaceProfile";
import { CardUserProfile } from "../components/CardUserProfile";
import { CardFriendRequest } from "../components/CardFriendRequest";

import axios from "axios";

import "./userPage.scss";

export const MyProfilePage = () => {
  const [openTab, setOpenTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.fitbuddy.site/user?me=true", { headers: { "Content-Type": "application/json", authorization: user } })
      .then((res) => {
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-4 place-items-center mx-0 xl:mx-48 2xl:mx-96">
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
                  <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold ">Carreras Creadas</h2>
                  <section className="my-4">
                    <CardRaceProfile />
                  </section>
                  <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold">Carreras Actuales</h2>
                  <section className="my-4">
                    <CardRaceProfile />
                  </section>
                  <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold">Carreras Asistidas</h2>
                  <section className="my-4">
                    <CardRaceProfile />
                  </section>
                  <section className="my-4">
                    <CardRaceProfile />
                  </section>
                  <section className="my-4">
                    <CardRaceProfile />
                  </section>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-4">Solicitudes de amistad</h2>
                  <CardFriendRequest />
                  <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-4">Amigos</h2>
                  <CardUserProfile />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="order-first sm:order-last user__card col-span-12 sm:col-span-5 place-self-start justify-self-center">
          <section className="user__card-profile">
            <UserCard className="user__card-content" />
          </section>
        </section>
      </div>
    </DefaultLayout>
  );
};
