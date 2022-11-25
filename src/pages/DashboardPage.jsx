import { useState } from 'react';

import { DefaultLayout } from "../layouts/DefaultLayout"
import { UserCard } from "../components/UserCard"

import { CardRaceSent } from '../components/CardRaceSent';
import { CardUserProfile } from '../components/CardUserProfile';
import { CardFriendRequest } from '../components/CardFriendRequest';

import "./dashboardPage.scss"

export const DashboardPage = () => {

  const [openTab, setOpenTab] = useState(1);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-4 place-items-center">
        <section className='col-start-3 col-span-8 place-self-start text-gray-50 '>
          <h2 className="md:text-xl lg:text-2xl text-gray-50 font-rubik italic font-bold mb-8">
            Solicitudes de Carreras
          </h2>
          <div className="">
            <ul
              className="flex list-none flex-row bg-gray-800 rounded-full tabs__container-dashboard"
              role="tablist"
            >
              <li className="text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-full block leading-normal " +
                    (openTab === 1
                      ? "text-white " + "bg-orange-900"
                      : "text-gray-50")
                  }
                  onClick={e => {
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
              <li className=" text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-full block leading-normal " +
                    (openTab === 2
                      ? "text-white " + "bg-orange-900"
                      : "text-gray-50")
                  }
                  onClick={e => {
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
              <div className="px-4 py-5 flex-auto">
                <div className="">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <CardRaceSent />
                    <CardRaceSent />
                    <CardRaceSent />
                    <CardRaceSent />
                    <CardRaceSent />
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <CardFriendRequest />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}