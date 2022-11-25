import {ReactComponent as FitbuddyIcon} from "../assets/FitbuddyIcon.svg";
import {ReactComponent as FacebookIcon} from "../assets/FacebookIconButton.svg";
import {ReactComponent as TwitterIcon} from "../assets/TwitterIcon.svg";
import {ReactComponent as InstagramIcon} from "../assets/InstagramIcon.svg";

export const Footer = () => {
    return (
        <footer className="flex flex-col justify-center items-center bg-black-700">
            <section className="flex flex-row items-center gap-4">
                <FitbuddyIcon className="scale-75"/>
                <h2 className="lg:text-xl italic font-rubik text-gray-50">Fitbuddy</h2>
            </section>
            <section className="flex flex-row justify-center gap-4 p-4">
                <button>
                    <FacebookIcon/>
                </button>
                <button>
                    <TwitterIcon/>
                </button>
                <button >
                    <InstagramIcon/>
                </button>
            </section>
            <section className="pb-4">
                <span className="text-xs text-gray-50">Copyright © 2022 </span>
                <span className="text-xs text-violet-900"> FITBUDDY</span>
            </section>
        </footer>
    )
}