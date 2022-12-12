import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardMapShow } from "../components/CardMapShow";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import "./createRunPage.scss";

export const CreateRunPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState();
  const [latLng, setLatLng] = useState([-99.18670587646949, 19.42591581551342]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  const onSubmit = (data) => {
    // console.log(data);

    axios
      .post(
        "https://api.fitbuddy.site/race",
        {
          title: data.title,
          description: data.description,
          level: "Intermedio",
          km: data.km,
          date: data.date,
          type: data.type,
          quantity: 1,
          location: {
            type: "Point",
            coordinates: data.coords,
          },
        },
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        console.log(res);
        navigate("/my-runs");
      });
  };

  return (
    <DefaultLayout>
      <div className="xl:mx-28 2xl:mx-96">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-12 gap-6 md:gap-8 w-full"
        >
          <div className="form-1 col-span-12 md:col-span-7 bg-black-600 rounded-xl">
            <section className="mb-8">
              <img
                className="object-cover rounded-t-xl max-h-64 w-full"
                src={`https://fibuddy-users-bucket.s3.us-east-2.amazonaws.com/races-photos/race-${
                  Math.floor(Math.random() * 60) + 1
                }.jpg`}
                alt=""
              />
            </section>
            <section className="m-8">
              <label
                htmlFor="title"
                className={`block font-bold text-2xl mb-2  ${
                  errors.title ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Nombre del Evento
              </label>
              <input
                type="text"
                name="title"
                placeholder="Nombre del Evento"
                {...register("title", {
                  required: true,
                  maxLength: 45,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.title
                    ? "text-orange-900 border-orange-900"
                    : "text-black-700 border-violet-900"
                }`}
              />
              {errors.title && (
                <p className="text-orange-900 text-sm mt-2">
                  Ingresa un nombre para la carrera
                </p>
              )}
            </section>
            <section className="m-8">
              <label
                htmlFor="description"
                className={`block font-bold text-2xl mb-2 ${
                  errors.description ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Descripción del evento
              </label>
              <textarea
                name="description"
                placeholder="Descripción del evento (máximo 180 caracteres)"
                {...register("description", {
                  required: true,
                  maxLength: 180,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.description
                    ? "text-orange-900 border-orange-900"
                    : "text-black-700 border-violet-900"
                }`}
              />
              {errors.description && (
                <p className="text-orange-900 text-sm mt-2">
                  Ingresa una descripción
                </p>
              )}
            </section>
          </div>
          <div className="col-span-12 md:col-span-5 bg-violet-900 rounded-xl p-8 h-96 max-h-100">
            <section className="mb-8">
              <label
                htmlFor=""
                className="block font-bold text-2xl mb-2 text-gray-50"
              >
                Tipo de Carrera
              </label>
              <select
                {...register("type", { required: true })}
                className="block w-full bg-transparent outline-none rounded-lg py-2 px-4 text-violet-700"
              >
                <option value="Running">Running</option>
                <option value="Jogging">Jogging</option>
                <option value="Caminar">Caminar</option>
              </select>
            </section>
            <section className={`${errors.km ? "pb-0" : "pb-8"}`}>
              <label
                htmlFor="kilometros"
                className={`block font-bold text-2xl mb-2 ${
                  errors.kilometros ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Kilómetros
              </label>
              <input
                type="number"
                name="km"
                placeholder="Kilómetros"
                {...register("km", { required: true, max: 45, min: 1 })}
                className={`block w-full bg-transparent rounded-lg outline-none border-b-2 py-2 px-4 placeholder-violet-700  ${
                  errors.km
                    ? "text-orange-900 border-orange-900"
                    : "text-violet-900 border-violet-700"
                }`}
              />
              {errors.km && (
                <p className="text-orange-900 text-sm mt-2">
                  Tienes que ingresar el número de kilómetros que vas a
                  recorrer. (El máximo es 45 km)
                </p>
              )}
            </section>
            <section className="pb-8">
              <label
                htmlFor=""
                className={`block font-bold text-2xl mb-2 ${
                  errors.date ? "text-orange-900" : "text-gray-50"
                } `}
              >
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                max={moment().format("MMMM Do YYYY, h:mm:ss a")}
                placeholder="Fecha y Hora"
                className={`block w-full pointer bg-transparent rounded-lg outline-none py-2 px-4 ${
                  errors.date
                    ? "text-orange-900 border-orange-900"
                    : "text-violet-900 border-violet-700"
                }`}
                {...register("date", { required: true })}
              />
              {errors.km && (
                <p className="text-orange-900 text-sm mt-2">
                  Ingresa una fecha y hora para la carrera
                </p>
              )}
            </section>
          </div>
          <section className="col-span-12">
            <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
              Ubicación
            </h2>
            <input {...register("coords")} className="hidden" />
            <CardMapShow latLng={latLng} setLatLng={setLatLng} />
          </section>
          <section className="col-span-12 flex flex-row justify-center">
            <input
              type="submit"
              value="Crear Carrera"
              className="bg-orange-900 text-center text-gray-50 text-2xl font-bold italic px-8 py-2 rounded-full mb-8 button__orange"
              onClick={() => setValue("coords", latLng)}
            />
          </section>
        </form>
      </div>
    </DefaultLayout>
  );
};
