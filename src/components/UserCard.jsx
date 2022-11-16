import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg"
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg"
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg"
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg"

export const UserCard = () => {
    return (
        <div className="card-user__container bg-violet-900 transition rounded-xl flex flex-col justify-center" >
        <div className="relative my-4 overflow-clip flex flex-col justify-center items-center">
            <section className="md:py-6 xl:py-4 relative">
                <img
                    className="desktop-navbar__actions__image h-40 w-40 rounded-full"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                    alt="User avatar"
                />
                <h2 className="px-4 mt-4 text-gray-50 text-xl font-bold text-center italic">John Doe</h2>
            </section>
            <button className="bg-gray-900 relative text-gray-50 font-bold italic px-8 py-4 my-4 rounded-full">
                Enviar Solicitud
            </button>
            <section className="grid grid-cols-2 grid-rows-2 px-4 mb-4">
                <section className="flex flex-col items-center">
                    <FriendsIcon className="scale-50"/>
                    <p className="text-gray-50 font-bold text-center italic">5 amigos</p>
                </section>
                <section className="flex flex-col items-center">
                    <RunIcon className="scale-50"/>
                    <p className=" text-gray-50  font-bold text-center italic">1 carrera asistida</p>
                </section>
                <section className="flex flex-col items-center">
                    <EditRunIcon className="scale-50"/>
                    <p className=" text-gray-50 font-bold text-center italic">1 carrera creada</p>
                </section>
                <section className="flex flex-col items-center ">
                    <LevelIcon className="scale-50"/>
                    <p className=" text-gray-50 font-bold text-center italic">Principiante</p>
                </section>
            </section>

            
        </div>
    </div>
    )
}