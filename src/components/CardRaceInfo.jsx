import {ReactComponent as RunningIcon} from "../assets/RaceCardBackground.svg";

export const CardRaceInfo = () => {
    return (
        <div className="card-race-info__container bg-violet-900  transition rounded-xl flex flex-col justify-center" >
            <div className="relative my-4 md:my-0 md:ml-4 ml-8 overflow-clip">
                <RunningIcon className="absolute right-0 z-0 top-10 "/>
                <section className="pt-4 relative">
                    <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Tipo de evento</h2>
                    <p className="px-4 text-gray-50 text-lg font-bold italic">Running</p>
                </section>
                <section className="pt-4 relative ">
                    <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Distancia</h2>
                    <p className="px-4 text-gray-50 text-lg font-bold italic">5 km</p>
                </section>
                <section className="pt-4 relative">
                    <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Fecha y hora</h2>
                    <p className="px-4 text-gray-50 text-lg font-bold italic">14/04/2023</p>
                    <p className="px-4 text-gray-50 text-lg font-bold italic">9:00</p>
                </section>
                <section className="pt-4 telative">
                    <h2 className="px-4 text-gray-50 text-2xl font-bold italic">Asistirán</h2>
                    <p className="px-4 text-gray-50 text-lg font-bold italic">2 personas</p>
                </section>
                <button className="bg-gray-900 relative text-gray-50 text-2xl font-bold italic px-8 py-2  my-12 rounded-full">
                    Unirse
                </button>
                
            </div>
        </div>
    )
}