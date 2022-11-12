import { Footer } from '../components/Footer';
import { ReactComponent as FitbuddyIcon } from '../assets/FitbuddyIcon.svg'

export const LandingPage = () => {
    return(
        <div>
            <div className="h-screen bg-my_bg_image_mobile bg-cover sm:bg-my_bg_image sm:bg-cover">
            <nav className="flex z-10 justify-between px-6 py-4 sm:px-11 sm:py-6">
                    <button>
                    <FitbuddyIcon/>
                    </button>
                    <button className="text-gray-50 font-rubik text-lg xl:text-xl italic transition hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 bg-violet-900 px-4 rounded-full">
                        Iniciar Sesión
                    </button>
                </nav>
                <section className="flex sm:backdrop-blur-lg sm:w-5/12 flex-col h-5/6 rounded-2xl justify-center pt-36 p-8 xl:pl-32 gap-12 xl:gap-8">
                    <h1 className="italic text-center sm:text-left text-5xl lg:text-7xl 2xl:text-8xl font-rubik text-violet-900 font-bold">FITBUDDY</h1>
                    <h2 className="italic text-center sm:text-left text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl  2xl:w-6/12 font-rubik text-gray-50">ÚNETE PARA CONOCER, SOCIALIZAR Y PRACTICAR CON TU COMUNIDAD RUNNER LOCAL</h2>
                    <button className="text-gray-50 transition text-xl sm:text-xl font-rubik font-bold  xl:w-10/12 2xl:w-5/12  xl:text-3xl italic bg-violet-900 hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 py-4 xl:px-4 xl:py-6 rounded-full">¡ ÚNETE A FITBUDDY!</button>
                </section>
            </div>
            <div className="bg-gray-900 h-screen">
                <h2 className="font-rubik  font-extrabold italic">FITBUDDY</h2>
            </div>
            <footer className="bg-gray-900">
                <Footer/>
            </footer>
        </div>
    )
}