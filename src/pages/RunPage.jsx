import { DefaultLayout } from "../layouts/DefaultLayout";
import { useForm, Controller } from "react-hook-form";
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
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userLoggedId, setUserLoggedId] = useState();
  const [runValues, setRunValues] = useState();
  const [userValues, setUserValues] = useState();
  const [rating, setRating] = useState(0);
  const [commentValues, setCommentValues] = useState([]);
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login-1");
  }

  // const onSubmit = (data) => console.log(data);

  const onSubmit = (data) => {
    console.log(data);

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
        window.location.reload(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.fitbuddy.site/race?race=${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setRunValues(res.data.data.races);
        setUserValues(res.data.data.races.user);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });

    axios
      .get(`https://api.fitbuddy.site/comment/${params.id}`, {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setCommentValues(res.data.data.comments);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });

    axios
      .get("https://api.fitbuddy.site/user?me=true", { headers: { "Content-Type": "application/json", authorization: user } })
      .then((res) => {
        setUserLoggedId(res.data.data.users._id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  let userAccepted = false;
  return (
    <DefaultLayout>
      {loading ? (
        <div className="flex flex-row items-center justify-center text-center h-screen">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-2xl text-center font-medium bg-white rounded-lg text-gray-50 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Cargando ...
          </button>
        </div>
      ) : (
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
                  quantity={runValues.assistants.length}
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
            {runValues && (
              <CardMap
                userAccepted={userAccepted}
                userOwner={userValues._id === userLoggedId ? true : false}
                mapCoords={runValues.location.coordinates}
              />
            )}
          </section>
          {runValues ? (
            runValues.status === "Finalizada" ? (
              <section className="col-span-12">
                <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">Escribe un comentario</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <section>
                    <div className="card-comment__container bg-black-600 transition rounded-xl flex flex-col my-4">
                      <div className="grid grid-cols-12">
                        <section className="col-span-12 md:col-span-2 flex flex-row md:flex-col justify-center items-center gap-4 md:p-4 mt-4 md:mt-0">
                          <img
                            className="desktop-navbar__actions__image h-10 w-10 md:h-14 md:w-14 md:mb-4 rounded-full"
                            src={userValues.image}
                            alt="User avatar"
                          />
                          <div>
                            <h3 className="md:block text-gray-50 md:text-xl font-bold italic md:mb-4 text-center">{userValues.fullname}</h3>
                          </div>
                        </section>
                        <section className="col-span-12 flex flex-col md:col-span-10 bg-black-700 rounded-xl p-4 m-4">
                          <section className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <input
                              type="text"
                              className={`md:w-[239px] md:h-[59px] text-{5px} md:text-{16px} pl-1.5 border-b-2 outline-none font-rubik rounded-lg md:w-[358px] h-[54px]  ${
                                errors.title ? "placeholder-orange-900 border-orange-900" : "text-black-700 border-violet-900"
                              }`}
                              placeholder="Escribe un título..."
                              {...register("title", { required: true, maxLength: 100 })}
                            />
                            <Rating
                              name="rating"
                              className="mt-4 md:mt-0"
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                              sx={{
                                "& .MuiRating-iconEmpty": {
                                  color: "white",
                                },
                              }}
                            />
                            <input {...register("rating")} className="hidden" />
                          </section>
                          <textarea
                            placeholder="Coméntanos como te fue..."
                            id="comments"
                            name="w3review"
                            rows="4"
                            cols="110"
                            className={`w-full rounded-lg order-b-2 outline-none border-b-2 pl-1.5 pt-4 mb-4 ${
                              errors.comment ? "placeholder-orange-900 border-orange-900" : "text-black-700 border-violet-900"
                            }`}
                            label="comentanos"
                            {...register("comment", { required: true, maxLength: 400 })}
                          ></textarea>
                          <input
                            onClick={() => setValue("rating", rating)}
                            type="submit"
                            value="Compartir"
                            className={`button__orange text-xs b sm:text-lg text-gray-50 bg-orange-900 font-rubik self-center md:self-start italic font-bold px-4 py-2 sm:px-8 rounded-full transition w-40`}
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
      )}
    </DefaultLayout>
  );
};
