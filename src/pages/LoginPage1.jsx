import { DefaultLayout } from "../layouts/DefaultLayout";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import { ReactComponent as GoogleIcon } from "../assets/GoogleIconButton.svg";
import { ReactComponent as FacebookIcon } from "../assets/FacebookIconButton.svg";

export const LoginPage1 = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse.access_token);
      const token = { access_token: codeResponse.access_token };
      await axios
        .post(
          "http://fitbuddyapi-env.eba-evmvjpbk.us-east-1.elasticbeanstalk.com/google",
          token
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === "Usuario loggeado con éxito") {
            console.log("uwu");
            localStorage.setItem("user", JSON.stringify(response.data.token));
            navigate('/runs')
          } else if (response.data.message === "Usuario creado con éxito") {
            console.log("uwu2");
            localStorage.setItem("user", JSON.stringify(response.data.token));
            navigate('/login-3')
          }
        })
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <>
      <body className="relative lg:grid lg:grid-cols-12">
        <div className="h-screen bg-cover bg-login_image blur-sm lg:col-span-6 lg:h-screen  lg:blur-none"></div>
        <div className="absolute w-3/4 h-auto rounded inset-10 flex flex-col justify-center items-center blur-none bg-black-700/[.06] absolute text-gray-50 lg:bg-black-700 lg:col-span-6 lg:grid-cols-6 lg:inset-0 lg:static lg:h-full md:w-auto lg:flex lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-row mt-10">
            <FitbuddyIcon />
            <h1 className="p-2 text-gray-50 font-rubik text-2xl italic font-bold">
              Fitbuddy
            </h1>
          </div>
          <div className="mt-4 w-48 text-gray-50 text-center">
            Puedes iniciar sesión con alguno de los siguientes servicios:
          </div>
          <button
            className="flex 
          items-center
          rounded-full
          text-center 
          h-[45px]
          text-base
          italic
          font-bold italic
          text-gray-50 
          w-[150px]
          bg-violet-900 my-4
          filter-none
          truncate
          overflow-auto
          md:w-[185px]
          lg:w-40"
          >
            <FacebookIcon className="m-2 md:m-4" />
            Facebook
          </button>
          <button
            className="flex 
          items-center
          rounded-full
          text-center 
          h-[45px]
          text-base
          italic
          font-bold italic
          text-gray-50 
          w-[150px]
          bg-violet-900 my-4
          filter-none
          truncate
          overflow-auto
          md:w-[185px]
          lg:w-40"
            onClick={() => {
              googleLogin();
            }}
          >
            <GoogleIcon className="m-2 md:m-4" />
            Google
          </button>

          <div className="mt-2">
            <p className="text-gray-50 text-xs">
              ¿No tienes una cuenta?{" "}
              <span className="text-violet-900 text-xs">Registrate</span>
            </p>
          </div>
        </div>
      </body>
    </>
  );
};
