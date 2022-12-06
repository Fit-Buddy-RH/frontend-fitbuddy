import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import { ReactComponent as RunningIcon } from "../assets/RunningIcon.svg";
import { ReactComponent as JoggingIcon } from "../assets/JoggingIcon.svg";
import { ReactComponent as FitnessIcon } from "../assets/FitnessIcon.svg";

export const LandingPage = () => {
  return (
    <div>
      <div className="h-screen bg-my_bg_image_mobile bg-cover sm:bg-my_bg_image sm:bg-cover">
        <nav className="flex z-10 justify-between px-6 py-4 sm:px-11 sm:py-6">
          <button>
            <FitbuddyIcon />
          </button>
          <Link to="/login-1">
            <button className="text-gray-50 font-rubik text-lg xl:text-lg transition hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 bg-violet-900 px-4 rounded-full">
              Iniciar Sesión
            </button>
          </Link>
        </nav>
        <section className="flex sm:backdrop-blur-lg sm:w-5/12 flex-col h-5/6 rounded-2xl justify-center pt-36 p-8 xl:pl-32 gap-12 xl:gap-8">
          <h1 className="italic text-center sm:text-left text-5xl lg:text-7xl font-rubik text-violet-900 font-bold">
            FITBUDDY
          </h1>
          <h2 className="italic text-center sm:text-left text-xl 2xl:w-9/12 font-rubik text-gray-50">
            ÚNETE PARA CONOCER, SOCIALIZAR Y PRACTICAR CON TU COMUNIDAD RUNNER
            LOCAL
          </h2>
          <Link to="/login-1">
            <button className="text-gray-50 transition font-rubik font-bold  xl:w-10/12 2xl:w-5/12  xl:text-xl italic bg-violet-900 hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 py-4 rounded-full">
              ¡ ÚNETE A FITBUDDY!
            </button>
          </Link>
        </section>
      </div>
      <div className="bg-black-700">
        <section className="flex w-screen flex-row h-860 justify-around items-center md:py-24 xl:px-24 2xl:px-80">
          <div className="flex flex-col w-4/12 gap-12">
            <h1 className="italic text-center sm:text-left text-5xl font-rubik text-violet-900 font-bold">
                CONECTA
            </h1>
            <h2 className="text-center sm:text-left text-xl 2xl:w-9/12 font-rubik text-gray-50">
              Conecta con corredores cercanos y crea tu propio evento deportivo
              con fitbuddy
            </h2>
            <button className="text-gray-50 transition font-rubik font-bold w-6/12 italic bg-violet-900 hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 py-4 rounded-full">
              ¡ ÚNETE A FITBUDDY!
            </button>
          </div>
          <RunningIcon className="scale-125" />
        </section>
        <section className="bg-gray-100 flex w-screen flex-row h-860 justify-around items-center md:py-24 xl:px-24 2xl:px-80">
          <JoggingIcon className="scale-125" />
          <div className="flex flex-col w-4/12 gap-12">
            <h1 className="italic text-center sm:text-left text-5xl font-rubik text-violet-900 font-bold">
              CONOCE
            </h1>
            <h2 className="text-center sm:text-left text-xl 2xl:w-9/12 font-rubik text-black-700">
              Mantente en forma al compartir experiencias con amigos y conocidos
            </h2>
            <button className="text-gray-50 transition font-rubik font-bold w-6/12 italic bg-violet-900 hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 py-4 rounded-full">
              ¡ ÚNETE A FITBUDDY!
            </button>
          </div>
        </section>
        <section className="flex w-screen flex-row h-860 justify-around items-center md:py-24 xl:px-24 2xl:px-80">
          <div className="flex flex-col w-4/12 gap-12">
            <h1 className="italic text-center sm:text-left text-5xl font-rubik text-violet-900 font-bold">
              ENCUENTRA
            </h1>
            <h2 className="text-center sm:text-left text-xl 2xl:w-9/12 font-rubik text-gray-50">
              Encuentra el grupo de running ideal para ti sin salir de casa
            </h2>
            <button className="text-gray-50 transition font-rubik font-bold w-6/12 italic bg-violet-900 hover:bg-violet-700 hover:shadow-md hover:shadow-violet-900 py-4 rounded-full">
              ¡ ÚNETE A FITBUDDY!
            </button>
          </div>
          <FitnessIcon className="scale-125" />
        </section>
      </div>
      <footer className="bg-black-700">
        <Footer />
      </footer>
    </div>
  );
};
