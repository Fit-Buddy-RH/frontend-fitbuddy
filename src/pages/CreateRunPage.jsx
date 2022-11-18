import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardMap } from "../components/CardMap";

import React, { useState, useEffect } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";

import "./createRunPage.scss";

export const CreateRunPage = () => {
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  console.log(image);

  useEffect(() => {
    if (image.length < 1) return;
    const newImageURL = URL.createObjectURL(image[0]);
    setImageURL(newImageURL);
  }, [image]);

  function onImageChange(e) {
    setImage([...e.target.files]);
  }

  function deleteImage() {
    setImageURL([]);
    setImage([]);
  }

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
                src={
                  image.length > 0
                    ? imageURL
                    : "https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </section>
            <section className="mb-8 flex flex-row justify-center gap-4">
              <label
                htmlFor="image"
                className="col-span-12 flex bg-gray-900 relative text-gray-50 text-center items-center text-sm sm:text-xl font-bold italic px-8 py-2 ml-2 rounded-full"
              >
                Añade una imagen
              </label>
              <button
                onClick={deleteImage}
                className="col-span-12 bg-gray-900 relative text-gray-50 text-center items-center text-sm sm:text-xl font-bold italic px-8 py-2 mr-2 rounded-full"
              >
                Borrar imagen
              </button>
              <input
                id="image"
                type="file"
                accept="image/jpeg"
                onChange={onImageChange}
                className="hidden"
              />
            </section>
            <section className="m-8">
              <label
                htmlFor="nombre_evento"
                className={`block font-bold text-2xl mb-2  ${
                  errors.nombre_evento ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Nombre del Evento
              </label>
              <input
                type="text"
                name="nombre_evento"
                placeholder="Nombre del Evento"
                {...register("nombre_evento", {
                  required: true,
                  maxLength: 45,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.nombre_evento
                    ? "text-orange-900 border-orange-900"
                    : "text-black-700 border-violet-900"
                }`}
              />
            </section>
            <section className="m-8">
              <label
                htmlFor="evento_descripcion"
                className={`block font-bold text-2xl mb-2 ${
                  errors.evento_descripcion ? "text-orange-900" : "text-gray-50"
                }`}
              >
                Descripción del evento
              </label>
              <textarea
                name="evento_descripcion"
                placeholder="Descripción del evento (máximo 180 caracteres)"
                {...register("evento_descripcion", {
                  required: true,
                  maxLength: 180,
                  min: 1,
                })}
                className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.evento_descripcion
                    ? "text-orange-900 border-orange-900"
                    : "text-black-700 border-violet-900"
                }`}
              />
            </section>
          </div>
          <div className="col-span-12 md:col-span-5 bg-violet-900 rounded-xl p-8 max-h-96">
            <section className="mb-8">
              <label
                htmlFor=""
                className="block font-bold text-2xl mb-2 text-gray-50"
              >
                Tipo de Carrera
              </label>
              <select
                {...register("Tipo de Carrera", { required: true })}
                className="block w-full bg-transparent outline-none rounded-lg py-2 px-4 text-violet-700"
              >
                <option value="Running">Running</option>
                <option value="Jogging">Jogging</option>
                <option value="Caminar">Caminar</option>
              </select>
            </section>
            <section className="mb-8">
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
                name="kilometros"
                placeholder="Kilómetros"
                {...register("kilometros", { required: true, max: 45, min: 1 })}
                className={`block w-full bg-transparent rounded-lg outline-none border-b-2 py-2 px-4 placeholder-gray-500  ${
                  errors.kilometros
                    ? "text-orange-900 border-orange-900"
                    : "text-violet-900 border-violet-700"
                }`}
              />
              {errors.kilometros && (
                <p className="text-orange-900 text-sm mt-2">
                  Tienes que ingresar el número de kilómetros que vas a
                  recorrer. (El máximo es 45 km)
                </p>
              )}
            </section>
            <section className="mb-8">
              <label
                htmlFor=""
                className="block font-bold text-2xl mb-2 text-gray-50"
              >
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                max={moment().format("MMMM Do YYYY, h:mm:ss a")}
                placeholder="Fecha y Hora"
                className="block w-full bg-transparent rounded-lg outline-none py-2 px-4 text-violet-700"
                {...register("fecha_y_hora", { required: true })}
              />
            </section>
          </div>
          <section className="col-span-12">
            <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
              Ubicación
            </h2>
            <CardMap />
          </section>
          <section className="col-span-12 flex flex-row justify-center">
            <input
              type="submit"
              value="Crear Carrera"
              className="bg-orange-900 text-center text-gray-50 text-2xl font-bold italic px-8 py-2 rounded-full mb-8"
            />
          </section>
        </form>
      </div>
    </DefaultLayout>
  );
};
