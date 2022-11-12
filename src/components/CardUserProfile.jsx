import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg"
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg"
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg"
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg"


export const CardUserProfile = () => {
    return (
        <div className="card-race-profile__container bg-black-600 transition rounded-xl flex flex-row mb-8" >
        <img 
            src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="" 
            className="object-cover rounded-l-xl h-auto w-32"
        />
            <div className="m-4">
                <h2 className=" text-gray-50 md:text-xl lg:text-2xl font-bold italic px-4">John</h2>
                <section className="grid grid-cols-2 grid-rows-2">
                    <section className="flex flex-row items-center">
                        <FriendsIcon className="scale-50"/>
                        <p className="px-4 text-gray-50 lg:text-lg font-bold text-center italic">5 amigos</p>
                    </section>
                    <section className="flex flex-row items-center">
                        <RunIcon className="scale-50"/>
                        <p className="px-4 text-gray-50 lg:text-lg font-bold text-center italic">1 carrera asistida</p>
                    </section>
                    <section className="flex flex-row items-center">
                        <EditRunIcon className="scale-50"/>
                        <p className="px-4 text-gray-50  lg:text-lg font-bold text-center italic">1 carrera creada</p>
                    </section>
                    <section className="flex flex-row items-center">
                        <LevelIcon className="scale-50"/>
                        <p className="px-4 text-gray-50 lg:text-lg font-bold text-center italic">Principiante</p>
                    </section>
                </section>
            </div>
        </div>
    )
}