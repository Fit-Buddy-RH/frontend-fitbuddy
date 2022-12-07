import { ReactComponent as FitbuddyIcon } from "../assets/FitbuddyIcon.svg";
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "./loginPage3.scss";

import { useForm, Controller } from "react-hook-form";

const BaseURL = "https://api.fitbuddy.site/twilio";

export const LoginPage3 = () => {

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if (!user) {
    navigate('/login-1')
  }

  const onSubmit = (data) => {
    console.log(data.phone);
    fetch(`${BaseURL}/verify/${"+"+data.phone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate('/login-4',{state:{phone:data.phone}})
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  // const sendCode = () => {
  //   if (!isValidNumber(phone)) {
  //     alert('Invalid phone number');
  //     return;
  //   } else {
  //     // send verfication code to phone number
  //     fetch(`${BaseURL}/verify/${phone}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         console.log(res);
  //         if (res.status === 'pending') {
  //           setCheckedNumber(phone);
  //           setwaitMessage(false);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         alert(err);
  //       });
  //   }
  // };

  return (
    <div className="grid grid-cols-12">
      <section className="hidden lg:block lg:col-span-6 bg-login_image min-h-screen bg-cover"></section>
      <section className="col-span-12 lg:col-span-6 min-h-screen bg-login_image lg:bg-none lg:bg-gray-900 bg-cover flex flex-col justify-center items-center ">
        <section className="bg-gray-900 bg-opacity-50 p-4 md:p-12 w-11/12 md:w-6/12 lg:w-10/12 xl:w-6/12 rounded-xl ">
          <section className="flex items-center justify-center gap-4 mb-8 ">
            <FitbuddyIcon />
            <h1 className="font-rubik text-3xl italic font-semibold text-gray-50">
              Fitbuddy
            </h1>
          </section>
          <h2 className="font-rubik lg:text-xl italic font-semibold text-gray-50 mb-8 text-center ">
            Registra tu número de teléfono:
          </h2>
          <section>
            <form onSubmit={handleSubmit(onSubmit)} className="w-92">
              <label
                htmlFor="phone"
                className={`block text-sm italic font-rubik mb-2 ${
                  errors.phone ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Número de teléfono:
              </label>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: true,
                  minLength: 9,
                  maxLength: 12,
                }}
                render={({ field: { ref, ...field } }) => (
                  <PhoneInput
                    {...field}
                    inputProps={{ ref }}
                    containerClass="phone__container"
                    inputClass="phone__input"
                    buttonClass="phone__button"
                    dropdownClass="phone__dropdown"
                    prefix={"+"}
                    country={"mx"}
                    countryCodeEditable={false}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-orange-900 text-sm mb-8">
                  Tienes que ingresar un número de teléfono válido.
                </p>
              )}
              <section className="flex flex-row items-center mb-8 justify-center ">
                <input
                  type="checkbox"
                  placeholder="terms"
                  {...register("terms", { required: true })}
                />
                <h2 className="ml-2 w-full text-gray-50">
                  Acepto los términos y condiciones
                </h2>
              </section>
              {errors.terms && (
                <p className="text-orange-900 text-sm mb-8">
                  Acepta los términos y condiciones para continuar.
                </p>
              )}
              <section className="col-span-12 flex flex-row w-full justify-center">
                <input
                  type="submit"
                  value="Validar número"
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
