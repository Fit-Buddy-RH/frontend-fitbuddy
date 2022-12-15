import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import { ReactComponent as GoogleIcon } from "../assets/GoogleIconButton.svg";

export const LoginPage1 = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://api.fitbuddy.site/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.data.message === "Usuario loggeado con éxito") {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/runs");
        } else if (response.data.message === "Usuario creado con éxito") {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/login-3");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoginError(err.response.data.message);
      });
  };
  console.log(errors);

  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const token = { access_token: codeResponse.access_token };
      await axios.post("https://api.fitbuddy.site/google", token).then((response) => {
        console.log(response);
        if (response.data.message === "Usuario loggeado con éxito") {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/runs");
        } else if (response.data.message === "Usuario creado con éxito") {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/login-3");
        }
      });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className="relative lg:grid lg:grid-cols-12">
      <div className="h-screen bg-cover bg-login_image blur-sm lg:col-span-6 lg:h-screen  lg:blur-none"></div>
      <div className="w-3/4 h-auto inset-10 flex flex-col justify-center items-center blur-none bg-black-700/[.06] absolute text-gray-50 lg:bg-black-700 lg:col-span-6 lg:grid-cols-6 lg:inset-0 lg:static lg:h-full md:w-auto lg:flex lg:flex-col lg:justify-center lg:items-center">
        <div className="flex flex-row mt-10">
          <FitbuddyIcon />
          <h1 className="p-2 text-gray-50 font-rubik text-2xl italic font-bold">Fitbuddy</h1>
        </div>

        <div className="my-4 w-48 text-gray-50 text-center">Escribe tu email y tu contraseña para iniciar sesión:</div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              type="text"
              className={`block w-full bg-transparent rounded-lg outline-none border-b-2 py-2 px-4 ${
                errors.email ? "placeholder-orange-900 text-orange-900 border-orange-900" : "placeholder-gray-700 text-black-700 border-violet-700"
              }`}
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p className="text-orange-900 text-sm -mt-2">Introduce un email válido</p>}
            <input
              type="password"
              className={`block w-full bg-transparent rounded-lg outline-none border-b-2 py-2 px-4 ${
                errors.password ? "placeholder-orange-900 text-orange-900 border-orange-900" : "placeholder-gray-700 text-black-700 border-violet-700"
              }`}
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <p className="text-orange-900 text-sm -mt-2">Introduce una contraseña válida</p>}
            {loginError && <p className="text-orange-900 text-sm -mt-2 ">Usuario o contraseña incorrecto</p>}
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-violet-900 text-center cursor-pointer text-gray-50 text-xl font-bold italic px-8 py-2 rounded-full hover:shadow-button hover:shadow-violet-900 transition"
            />
          </form>
        </div>
        <div className="relative flex py-5 items-center w-56">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="flex-shrink mx-4 text-gray-500">O</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>
        <div className="w-48 text-gray-50 text-center">Puedes iniciar sesión con Google:</div>
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
          py-8
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
          <p className="text-gray-50 text-sm">
            ¿No tienes una cuenta?
            <Link to="/login-2">
              <span className="text-violet-900 text-sm"> Registrate</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
