import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg"
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg"
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg"
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg"
import axios from "axios"


export const CardUserProfile = (params) => {
    return (
        <div className="card-race-friend__container bg-black-600 transition rounded-xl flex flex-row mb-8" >
        <img 
            src={params.image} 
            alt="" 
            className="object-cover rounded-l-xl h-auto w-28 sm:w-32"
        />
        <div className="pl-2 flex flex-col sm:flex-row w-full">
                <div className="py-2 px-4 w-full">
                    <h2 className=" text-gray-50 text-xl font-bold italic ">{params.name + " " + params.fullname}</h2>
                    <section className="grid grid-cols-2 grid-rows-2">
                        <section className="relative right-4 flex flex-col  items-center">
                            <FriendsIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">{params.friends} amigos</p>
                        </section>
                        <section className="relative flex flex-col items-center">
                            <RunIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">1 carrera asistida</p>
                        </section>
                        <section className="relative right-4 flex flex-col items-center">
                            <EditRunIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">{params.created} carrera creada</p>
                        </section>
                        <section className="relative flex flex-col items-center">
                            <LevelIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">{params.level}</p>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}