import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg"
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg"
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg"
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg"


export const CardUserProfile = () => {
    return (
        <div className="card-race-friend__container bg-black-600 transition rounded-xl flex flex-row mb-8" >
        <img 
            src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="" 
            className="object-cover rounded-l-xl h-auto w-28 sm:w-32"
        />
        <div className="flex flex-col sm:flex-row">
            <div className="py-2 px-4">
                    <h2 className=" text-gray-50 text-xl font-bold italic ">John</h2>
                    <section className="grid grid-cols-2 grid-rows-2">
                        <section className="relative right-4 flex flex-col  items-center">
                            <FriendsIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">5 amigos</p>
                        </section>
                        <section className="relative flex flex-col items-center">
                            <RunIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">1 carrera asistida</p>
                        </section>
                        <section className="relative right-4 flex flex-col items-center">
                            <EditRunIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">1 carrera creada</p>
                        </section>
                        <section className="relative flex flex-col items-center">
                            <LevelIcon className="scale-m -m-4"/>
                            <p className=" text-gray-50 text-center text-xs">Principiante</p>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}