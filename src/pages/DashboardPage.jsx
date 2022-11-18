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
            <div className="grid grid-cols-12 gap-4 place-items-center mx-0 xl:mx-48 2xl:mx-96">
                <h2 className='col-span-12 text-xl font-rubik font-bold italic flex flex-col place-self-start w-full px-3 sm:px-0 text-gray-50'>
                    Solicitudes de carreras
                </h2>
                <section className='col-span-12 flex flex-col place-self-start  w-full h-min-screen text-gray-50'>
                        <ul
                            className="flex list-none flex-row justify-center items-center place-self-center sm:place-self-start mb-4 bg-gray-800 rounded-full tabs__container"
                            role="tablist"
                        >
                            <li className="mr-2 text-center">
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
                        <div className="flex-col break-words bg-white w-full rounded">
                            <div className="flex-auto">
                            <div className="w-full">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <section className='my-4'>
                                        <CardRaceSent/>
                                    </section>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <section className='my-4'>
                                        <CardFriendRequest/>
                                    </section>
                                </div>
                            </div>
                            </div>
                        </div>    
                </section>
            </div>
        </DefaultLayout>
    )
}