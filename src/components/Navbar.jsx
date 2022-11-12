import { ReactComponent as FitbuddyIcon } from '../assets/FitbuddyIcon.svg'
import { ReactComponent as DropdownIcon} from "../assets/DropdownIcon.svg";
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
            <div className="flex z-10 px-6 py-4 sm:px-11 sm:py-6 items-center justify-between  bg-gray-900">
                <FitbuddyIcon className="hidden sm:block basis-1/12"/>
                <section className="md:basis-9/12 xl:basis-10/12 flex gap-8">
                    <h2 className="text-gray-50 sm:hidden font-semibold italic font-rubik text-2xl">
                        Fitbuddy
                    </h2>
                    <Link to="/runs">
                        <button className="text-gray-50 font-rubik hidden sm:text-lg lg:block italic transition hover:scale-110">
                            Carreras
                        </button>
                    </Link>
                    <Link to="/my-runs">
                        <button className="text-gray-50 font-rubik hidden sm:text-lg lg:block italic transition hover:scale-110">
                            Mis Carreras
                        </button>
                    </Link>
                </section>
                <button className="sm:basis-3/12 lg:basis-2/12 2xl:basis-1/12 text-gray-50 flex items-center sm:justify-between gap-3 font-rubik italic">
                    <img
                    className="desktop-navbar__actions__image h-10 w-10 rounded-full"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                    alt="User avatar"
                    />
                    <p className="hidden sm:block ">John</p>
                    <DropdownIcon className="hidden sm:block scale-75"/>
                </button>
            </div>
    )
}