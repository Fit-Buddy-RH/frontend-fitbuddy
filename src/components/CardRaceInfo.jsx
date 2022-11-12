import {ReactComponent as RunningIcon} from "../assets/RaceCardBackground.svg";

export const CardRaceInfo = () => {
    return (
        <div className="card-race__container bg-gradient-to-b from-violet-900 to-black-700 transition rounded-xl flex flex-col justify-center" >
            <div className="relative my-4 md:my-0 md:ml-4 ml-8 overflow-clip">
                <RunningIcon className="absolute right-0 z-0 top-10"/>
                <section className="md:py-6 xl:py-8 relative">
                    <h2 className="px-4 text-gray-50 sm:text-xl lg:text-4xl font-bold italic">Tipo de evento</h2>
                    <p className="px-4 text-gray-50 sm:text-lg lg:text-2xl font-bold italic">Running</p>
                </section>
                <section className="md:py-3 xl:py-4 relative ">
                    <h2 className="px-4 text-gray-50 sm:text-xl lg:text-4xl font-bold italic">Distancia</h2>
                    <p className="px-4 text-gray-50 sm:text-lg lg:text-2xl font-bold italic">5 km</p>
                </section>
                <section className="md:py-3 xl:py-4 relative">
                    <h2 className="px-4 text-gray-50 sm:text-xl lg:text-4xl font-bold italic">Fecha y hora</h2>
                    <p className="px-4 text-gray-50 sm:text-lg lg:text-2xl font-bold italic">14/04/2023</p>
                    <p className="px-4 text-gray-50 sm:text-lg lg:text-2xl font-bold italic">9:00 A.M.</p>
                </section>
                <section className="md:py-3 xl:py-4 telative">
                    <h2 className="px-4 text-gray-50 sm:text-xl lg:text-4xl font-bold italic">Asistirán</h2>
                    <p className="px-4 text-gray-50 sm:text-lg lg:text-2xl font-bold italic">2 personas</p>
                </section>
                <button className="bg-gray-900 relative text-gray-50 md:text-2xl lg:text-3xl font-bold italic px-8 md:py-2 lg:py-4 md:my-9 my-16 rounded-full">
                    Unirse
                </button>
                
            </div>
        </div>
    )
}