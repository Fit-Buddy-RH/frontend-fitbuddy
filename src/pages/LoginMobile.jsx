import { DefaultLayout } from "../layouts/DefaultLayout"
import { ReactComponent as FitbuddyIcon } from '../assets/FitbuddyIcon.svg'
import { ReactComponent as FacebookIcon } from '../assets/FacebookIcon.svg'

export const LoginMobile = () => {
  return (
    <>
      <body className="relative">
        <div className="h-screen bg-cover bg-login_image blur-sm">
        </div>
        <div className=" absolute w-40 h-1/2 rounded inset-24  blur-none bg-black-700/[.06] absolute text-gray-50">
          <div className="flex flex-row mt-10">
            <FitbuddyIcon />
            <h1 className="p-2 text-gray-50 font-rubik text-2xl italic font-bold">Fitbuddy</h1>
          </div>
          <div className="mt-4 w-48 text-gray-50 text-center">
            Puedes iniciar sesión con alguno de los
            siguientes servicios:
          </div>
          <button className="flex items-center
          justify-evenly
          rounded-full
          text-gray-50 w-3/4
          bg-violet-700 my-4
          filter-none
          truncate">
            <FacebookIcon />
            Facebook</button>
          <button className="flex items-center
          justify-evenly
          rounded-full
          text-gray-50 w-3/4
          bg-violet-700 my-4
          filter-none
          truncate">
            <FacebookIcon />
            Google</button>

          <div className="mt-2"><p className="text-gray-50 text-xs">¿No tienes una cuenta? <span className="text-violet-900 text-xs">Registrate</span></p></div>
        </div>
      </body>
    </>

  )
}