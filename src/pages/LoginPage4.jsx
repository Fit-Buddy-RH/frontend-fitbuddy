import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import React, { useState, useEffect } from "react";
import {Routes, Route,useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

import { useForm } from "react-hook-form";
const BaseURL = "https://api.fitbuddy.site/twilio";

export const LoginPage4 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    navigate('/login-1')
  }

  const onSubmit = (data) => {
    console.log(data.code);
    fetch(`${BaseURL}/check/${"+" + location.state.phone}/${data.code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if(res.ok === true){
          axios.patch(
          "https://api.fitbuddy.site/user",
          {
            "isVerified" : true
          },
          { headers: { 'Content-Type': 'application/json', 'authorization': user }, }
        )
          navigate('/login-5')
        }
      })
  };

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
            Se ha enviado un código a tu Whatsapp. Introdúcelo a continuacion
            para validar tu cuenta.
          </h2>
          <section>
            <form onSubmit={handleSubmit(onSubmit)} className="w-92">
              <label
                htmlFor="code"
                className={`block text-sm italic font-rubik mb-2 ${
                  errors.code ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Código:
              </label>
              <input
                type="number"
                name="code"
                placeholder=""
                {...register("code", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
                className={`block w-full bg-transparent outline-none rounded-xl border-b-2 py-2 px-4 mb-8 placeholder-gray-500  ${
                  errors.code
                    ? "text-orange-900 border-orange-900"
                    : "text-black-700 border-violet-900"
                }`}
              />
              {errors.code && (
                <p className="text-orange-900 text-sm mb-8">Código inválido.</p>
              )}
              <section className="col-span-12 flex flex-row w-full justify-center">
                <input
                  type="submit"
                  value="Validar cuenta"
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
