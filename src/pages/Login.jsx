import { DefaultLayout } from "../layouts/DefaultLayout"
import { ReactComponent as FitbuddyIcon } from '../assets/FitbuddyIcon.svg'
import { ReactComponent as FacebookIcon } from '../assets/FacebookIcon.svg'

export const Login = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 h-screen bg-cover bg-login_image"></div>
      <div className="flex justify-center col-span-6 bg-black-700">
        <div className="mt-6 h-3/6 flex flex-col justify-center filter-none">
          <div className="flex flex-row mt-10">
            <FitbuddyIcon />
            <h1 className="p-2 text-gray-50 font-rubik text-3xl italic font-bold">Fitbuddy</h1>
          </div>
          <div className="mt-4 w-48 text-gray-50 text-center">
            Puedes iniciar sesión con alguno de los
            siguientes servicios:
          </div>
          <button className="flex md:items-center
          justify-evenly
          rounded-full
          text-gray-50 w-[180px] h-[56px] 
          bg-violet-700 my-4
          filter-none">
            <FacebookIcon />
            Facebook</button>
            <button className="flex items-center
           justify-evenly
           rounded-full
          text-gray-50 w-[180px] h-[56px] 
          bg-violet-700">
            <FacebookIcon />
            Google</button>

            <div className="mt-2"><p className="text-gray-50 text-xs">¿No tienes una cuenta? <span className="text-violet-900 text-xs">Registrate</span></p></div>
        </div>
      </div>
    </div>
  )
}
