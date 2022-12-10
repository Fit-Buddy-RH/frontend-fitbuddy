import { DefaultLayout } from "../layouts/DefaultLayout";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import { CardRace } from "../components/CardRace";
import { CardRaceInfo } from "../components/CardRaceInfo";
import { CardMap } from "../components/CardMap";
import { ReactComponent as AddPhoto } from "../assets/AddPhotoIcon.svg";
import React, { useState, useEffect } from "react";
import { CardComments } from "../components/CardComments";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./runPage.scss";

export const RunPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [runValues, setRunValues] = useState();
  const [userValues, setUserValues] = useState();
  const [value, setValue] = React.useState(0);
  const [commentValues, setCommentValues] = useState([]);
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
    axios
      .post(
        `https://api.fitbuddy.site/comment/${params.id}`,
        {
          title: data.title,
          text: data.comment,
          rate: 5,
        },
        { headers: { "Content-Type": "application/json", authorization: user } }
      )
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    axios
      .get(`https://api.fitbuddy.site/race?race=${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setRunValues(res.data.data.races);
        setUserValues(res.data.data.races.user);
      });

    axios
      .get(`https://api.fitbuddy.site/comment/${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setCommentValues(res.data.data.comments);
      });
  }, []);

  console.log(commentValues);
  let userAccepted = false;
  return (
    <DefaultLayout>
      <div className=" grid grid-cols-12 gap-6 md:gap-8 xl:mx-28 2xl:mx-96">
        <section className="col-span-12 md:col-span-7">
          {userValues && (
            <CardRace
              id={userValues._id}
              name={userValues.fullname}
              image={runValues.image}
              avatar={userValues.image}
              title={runValues.title}
              description={runValues.description}
            />
          )}
        </section>
        <section className="col-span-12 md:col-span-5">
          <section className="lg:px-4">
            {runValues && (
              <CardRaceInfo
                type={runValues.type}
                km={runValues.km}
                quantity={runValues.quantity}
                date={runValues.date}
                user={runValues.user}
                status={runValues.status}
                rate={runValues.rating.$numberDecimal}
              />
            )}
          </section>
        </section>
        <section className="col-span-12">
          <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">Ubicación</h2>
          {runValues && <CardMap userAccepted={userAccepted} mapCoords={runValues.location.coordinates} />}
        </section>
        {runValues ? (
          runValues.status === "Finalizada" ? (
            <section className="col-span-12">
              <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">Escribe un comentario</h2>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <section>
                  <div className="card-comment__container bg-black-600 transition rounded-xl flex flex-col my-4">
                    <div className="grid grid-cols-12">
                      <section className="col-span-2 flex flex-col justify-center items-center p-4">
                        <img
                          className="hidden desktop-navbar__actions__image h-10 w-10 rounded-full"
                          src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                          alt="User avatar"
                        />
                        <div>
                          <h3 className=" hidden md:block text-gray-50 text-xl font-bold italic mb-4 text-center">Usuario</h3>
                        </div>
                      </section>
                      <section className="col-span-10 bg-black-700 rounded-xl p-4 m-4">
                        <section className="flex justify-between">
                          <div className="">
                            <div>
                              <input
                                type="text"
                                className="w-[139px] h-[59px] text-{5px} md:text-{16px} pl-1.5 font-rubik mb-4 rounded-lg md:w-[358px] h-[54px]"
                                placeholder="Escribe un título..."
                                {...register("title", { required: true, maxLength: 100 })}
                              />
                            </div>
                            {/* <AddPhoto/>
                      <form id="inputImage">
                        <label htmlFor="" id="textFile">Add File</label>
                        <input type="file" id="inputFile" />
                      </form> */}

                            <section className="flex flex-end justify-end">
                              <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                              />
                            </section>
                          </div>
                        </section>
                        <textarea
                          placeholder="Coméntanos como te fue..."
                          id="comments"
                          name="w3review"
                          rows="4"
                          cols="110"
                          className="w-full rounded-lg pl-1.5"
                          label="comentanos"
                          {...register("comment", { required: true, maxLength: 400 })}
                        ></textarea>
                        <input
                          type="submit"
                          value="Compartir"
                          className="button__orange text-xs sm:text-lg text-gray-50 bg-orange-900 font-rubik italic font-bold px-4 py-2 sm:px-8 rounded-full transition"
                        />
                      </section>
                    </div>
                  </div>
                </section>
              </form>

              <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">Comentarios de la carrera</h2>
              {commentValues
                ? commentValues.map((comment) => {
                    return (
                      <CardComments
                        name={comment.user.fullname}
                        userImage={comment.user.image}
                        image={comment.image}
                        rate={comment.rate}
                        title={comment.title}
                        text={comment.text}
                        key={comment.id}
                      />
                    );
                  })
                : null}
            </section>
          ) : (
            <hr />
          )
        ) : null}
      </div>
    </DefaultLayout>
  );
};
