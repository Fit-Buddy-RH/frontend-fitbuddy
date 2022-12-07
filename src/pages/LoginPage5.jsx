import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {Routes, Route,useLocation, useNavigate} from 'react-router-dom';

export const LoginPage5 = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (!user) {
    navigate("/login-1");
  }

  const onSubmit = (data) => {
    console.log(data);
    axios.patch(
      "https://api.fitbuddy.site/user",
      data,
      { headers: { 'Content-Type': 'application/json', 'authorization': user }, }
    )
    .then((res) => {
      console.log(res.data.success);
      if (res.data.success === true) {
        navigate("/runs")
      }
    })
  }

  console.log(errors);



  return (
    <div className="grid grid-cols-12">
      <section className="hidden lg:block lg:col-span-6 bg-login_image min-h-screen bg-cover"></section>
      <section className="col-span-12 lg:col-span-6 min-h-screen bg-login_image lg:bg-none lg:bg-gray-900 bg-cover flex flex-col justify-center items-center ">
        <section className="bg-gray-900 bg-opacity-50 p-4 md:p-12 w-11/12 md:w-6/12 lg:w-10/12 xl:w-6/12 rounded-xl">
          <section className="flex items-center justify-center gap-4 mb-8 ">
            <FitbuddyIcon />
            <h1 className="font-rubik text-3xl italic font-semibold text-gray-50">
              Fitbuddy
            </h1>
          </section>
          <h2 className="font-rubik lg:text-xl italic font-semibold text-gray-50 mb-8 text-center">
            Solo quedaría llenar los siguientes datos y tu registro estará
            completado:
          </h2>
          <section>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-92 flex flex-col"
            >
              <label
                htmlFor="level"
                className={`block text-sm italic font-rubik my-2 ${
                  errors.level ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Selecciona tu nivel para recomendarte carreras con el mismo
                nivel:
              </label>
              {errors.level && (
                <p className="text-orange-900 text-sm mb-8">
                  Tienes que seleccionar un nivel para poder crear tu cuenta.
                </p>
              )}
              <section className="my-4 flex flex-row justify-around">
                <label
                  htmlFor="principiante"
                  className="italic font-rubik text-gray-50"
                >
                  Principiante. Entre 5 km a 10 km.
                </label>
                <input
                  {...register("level", { required: true })}
                  type="radio"
                  id="principiante"
                  value="Principiante"
                />
              </section>
              <section className="my-4 flex flex-row justify-around">
                <label
                  htmlFor="intermedio"
                  className="italic font-rubik text-gray-50"
                >
                  Intermedio. Entre 10 km a 20 km.
                </label>
                <input
                  {...register("level", { required: true })}
                  type="radio"
                  id="intermedio"
                  value="Intermedio"
                />
              </section>
              <section className="my-4 flex flex-row justify-around">
                <label
                  htmlFor="experto"
                  className="italic font-rubik text-gray-50"
                >
                  Experto. Desde 20 km en adelante.
                </label>
                <input
                  {...register("level", { required: true })}
                  type="radio"
                  id="experto"
                  value="Experto"
                />
              </section>
              <section className="col-span-12 flex flex-row w-full justify-center">
                <input
                  type="submit"
                  value="Crear cuenta"
                  className="bg-violet-900 text-center text-gray-50 text-2xl font-bold italic px-8 py-2 rounded-full mb-8"
                />
              </section>
            </form>
          </section>
        </section>
      </section>
    </div>
  );
};
