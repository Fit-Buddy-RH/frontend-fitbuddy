import { ReactComponent as StarsFullIcon } from "../assets/StarsFullIcon.svg";
import React from "react";
import Rating from "@mui/material/Rating";

export const CardComments = (params) => {
  return (
    <div className="card-comment__container bg-black-600 transition rounded-xl flex flex-col my-4">
      <div className="grid grid-cols-12">
        <section className="col-span-2 flex flex-col justify-center items-center p-4">
          <h3 className="text-gray-50 text-xl font-bold italic mb-4 text-center">
            {params.name}
          </h3>
          <img
            className="desktop-navbar__actions__image h-10 w-10 rounded-full"
            src={params.userImage}
            alt="User avatar"
          />
        </section>
        <section className="col-span-10 bg-black-700 rounded-xl p-4 m-4">
          <section className="flex justify-between">
            <h3 className="text-gray-50 text-xl font-bold mb-4">
              {params.title}
            </h3>
            <section className="flex flex-end justify-end">
              <Rating name="read-only" value={params.rate} readOnly />
            </section>
          </section>
          <p className="text-gray-50 text-sm my-4 mr-4">{params.text}</p>
        </section>
      </div>
    </div>
  );
};
