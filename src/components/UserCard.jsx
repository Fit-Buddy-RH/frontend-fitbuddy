import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg"
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg"
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg"
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg"

export const UserCard = () => {
    return (
        <div className="card-race__container bg-gradient-to-b from-violet-900 to-black-700 transition rounded-xl flex flex-col justify-center" >
        <div className="relative my-4 overflow-clip flex flex-col justify-center items-center">
            <section className="md:py-6 xl:py-4 relative">
                <img
                    className="desktop-navbar__actions__image lg:h-44 lg:w-44 rounded-full"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                    alt="User avatar"
                />
                <h2 className="px-4 mt-4 text-gray-50 sm:text-xl lg:text-2xl font-bold text-center italic">John Doe</h2>
            </section>
            <button className="bg-gray-900 relative text-gray-50 md:text-2xl lg:text-xl font-bold italic px-8 md:py-2 lg:py-4 md:my-4 my-4 rounded-full">
                Enviar Solicitud
            </button>
            <section className="grid grid-cols-2 grid-rows-2 p-4">
                <section className="flex flex-col items-center p-2">
                    <FriendsIcon className="scale-75"/>
                    <p className="px-4 text-gray-50 sm:text-xl lg:text-xl font-bold text-center italic">5 amigos</p>
                </section>
                <section className="flex flex-col items-center p-2">
                    <RunIcon className="scale-75"/>
                    <p className="px-4 text-gray-50 sm:text-xl lg:text-xl font-bold text-center italic">1 carrera asistida</p>
                </section>
                <section className="flex flex-col items-center p-2">
                    <EditRunIcon className="scale-75"/>
                    <p className="px-4 text-gray-50 sm:text-xl lg:text-xl font-bold text-center italic">1 carrera creada</p>
                </section>
                <section className="flex flex-col items-center p-2">
                    <LevelIcon className="scale-75"/>
                    <p className="px-4 text-gray-50 sm:text-xl lg:text-xl font-bold text-center italic">Principiante</p>
                </section>
            </section>

            
        </div>
    </div>
    )
}