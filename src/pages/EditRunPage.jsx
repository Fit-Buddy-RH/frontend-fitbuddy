import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardMapShow } from "../components/CardMapShow";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import "./createRunPage.scss";

export const EditRunPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [raceData, setRaceData] = useState();
  const [latLng, setLatLng] = useState([]);

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

  useEffect(() => {
    axios
      .get(`https://api.fitbuddy.site/race?race=${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setRaceData(res.data.data.races);
        setLatLng(res.data.data.races.location.coordinates);
        setValue("title", res.data.data.races.title, { shouldValidate: true });
        setValue("description", res.data.data.races.description, { shouldValidate: true });
        setValue("km", res.data.data.races.km, { shouldValidate: true });
        setValue("date", moment.utc(res.data.data.races.date.date).format("YYYY-MM-DDTkk:mm"), { shouldValidate: true });
      });
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .patch(
        `https://api.fitbuddy.site/race/${params.id}`,
        {
          title: data.title,
          description: data.description,
          km: data.km,
          date: data.date,
          type: data.type,
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
        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-12 gap-6 md:gap-8 w-full">
          <div className="form-1 col-span-12 md:col-span-7 bg-black-600 rounded-xl">
            <section className="mb-8">
              <img
                className="object-cover rounded-t-xl max-h-64 w-full"
                src={`https://fibuddy-users-bucket.s3.us-east-2.amazonaws.com/races-photos/race-${Math.floor(Math.random() * 60) + 1}.jpg`}
                alt=""
              />
            </section>
            <section className="m-8">
              <label htmlFor="title" className={`block font-bold text-2xl mb-2  ${errors.title ? "text-orange-900" : "text-gray-50"}`}>
                Nombre del Evento
              </label>
              <input
                type="text"
                name="title"
                placeholder="Nombre del Evento"
                // value={raceData ? raceData.title : ""}
                {...register("title", {
                  required: true,
                  maxLength: 45,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.title ? "text-orange-900 border-orange-900" : "text-black-700 border-violet-900"
                }`}
              />
              {errors.title && <p className="text-orange-900 text-sm mt-2">Ingresa un nombre para la carrera</p>}
            </section>
            <section className="m-8">
              <label htmlFor="description" className={`block font-bold text-2xl mb-2 ${errors.description ? "text-orange-900" : "text-gray-50"}`}>
                Descripción del evento
              </label>
              <textarea
                name="description"
                placeholder="Descripción del evento (máximo 180 caracteres)"
                // value={raceData ? raceData.description : ""}
                {...register("description", {
                  required: true,
                  maxLength: 180,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.description ? "text-orange-900 border-orange-900" : "text-black-700 border-violet-900"
                }`}
              />
              {errors.description && <p className="text-orange-900 text-sm mt-2">Ingresa una descripción</p>}
            </section>
          </div>
          <div className="col-span-12 md:col-span-5 bg-violet-900 rounded-xl p-8 h-96 max-h-100">
            <section className="mb-8">
              <label htmlFor="" className="block font-bold text-2xl mb-2 text-gray-50">
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
              <label htmlFor="kilometros" className={`block font-bold text-2xl mb-2 ${errors.kilometros ? "text-orange-900" : "text-gray-50"}`}>
                Kilómetros
              </label>
              <input
                type="number"
                name="km"
                // value={raceData ? raceData.km : ""}
                placeholder="Kilómetros"
                {...register("km", { required: true, max: 45, min: 1 })}
                className={`block w-full bg-transparent rounded-lg outline-none border-b-2 py-2 px-4 placeholder-violet-700  ${
                  errors.km ? "text-orange-900 border-orange-900" : "text-violet-900 border-violet-700"
                }`}
              />
              {errors.km && (
                <p className="text-orange-900 text-sm mt-2">Tienes que ingresar el número de kilómetros que vas a recorrer. (El máximo es 45 km)</p>
              )}
            </section>
            <section className="pb-8">
              <label htmlFor="" className={`block font-bold text-2xl mb-2 ${errors.date ? "text-orange-900" : "text-gray-50"} `}>
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                value={raceData ? moment.utc(raceData.date).format("YYYY-MM-DDTkk:mm") : ""}
                placeholder="Fecha y Hora"
                className={`block w-full pointer bg-transparent rounded-lg outline-none py-2 px-4 ${
                  errors.date ? "text-orange-900 border-orange-900" : "text-violet-900 border-violet-700"
                }`}
                {...register("date", { required: true })}
              />
              {errors.km && <p className="text-orange-900 text-sm mt-2">Ingresa una fecha y hora para la carrera</p>}
            </section>
          </div>
          <section className="col-span-12">
            <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">Ubicación</h2>
            <input {...register("coords")} className="hidden" />
            {raceData ? <CardMapShow latLng={latLng} setLatLng={setLatLng} /> : ""}
          </section>
          <section className="col-span-12 flex flex-row justify-center">
            <input
              type="submit"
              value="Actualizar Carrera"
              className="bg-orange-900 text-center text-gray-50 text-2xl font-bold italic px-8 py-2 rounded-full mb-8 button__orange"
              onClick={() => setValue("coords", latLng)}
            />
          </section>
        </form>
      </div>
    </DefaultLayout>
  );
};
