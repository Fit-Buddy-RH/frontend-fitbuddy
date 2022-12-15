import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg";
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg";
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg";
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg";
import { ReactComponent as AddPhotoIcon } from "../assets/AddPhotoIcon.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export const UserCard = ({ setErrorState, setShowModal, ...params }) => {
  const [userId, setUserId] = useState();
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [userFriends, setUserFriends] = useState();
  const [imageChange, setImageChange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [friend, setFriend] = useState(false);

  const urlId = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = (data) => {

    const formData = new FormData();

    if (imageChange === false) {
      formData.append("image", params.image);
    } else {
      formData.append("image", image);
    }

    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("level", data.level);

    axios
      .patch(`https://api.fitbuddy.site/user`, formData, { headers: { "Content-Type": "multipart/form-data", authorization: user } })
      .then((res) => {
        window.location.reload(false);
      });
  };

  const handleEdit = () => {
    setEdit(!edit);
    setValue("name", params.name, { shouldValidate: true });
    setValue("lastname", params.lastname, { shouldValidate: true });
    setValue("level", params.level, { shouldValidate: true });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login-1");
  }

  const sendFriendRequest = () => {
    axios
      .post(`https://api.fitbuddy.site/friendRequest/${urlId.id}`, {}, { headers: { "Content-Type": "application/json", authorization: user } })
      .then((res) => {
        // alert("Solicitud de amistad enviada")
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorState(true);
      });
  };

  useEffect(() => {
    axios
      .get("https://api.fitbuddy.site/user?me=true", {
        headers: { "Content-Type": "application/json", authorization: user },
      })
      .then((res) => {
        setUserFriends(res.data.data.users.friends);
        res.data.data.users.friends.map((friend) => {
          if (friend._id === urlId.id) {
            setFriend(true);
          }
        });
        setUserId(res.data.data.users._id);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "jwt expired") {
          navigate("/login-1");
        }
      });
  }, []);

  useEffect(() => {
    if (image.length < 1) return;
    const newImageURL = URL.createObjectURL(image);
    setImageURL(newImageURL);
  }, [image]);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageChange(true);
  };

  return (
    <div className="card-user__container bg-violet-900 transition rounded-xl flex flex-col justify-center">
      <div className="relative my-4 overflow-clip flex flex-col justify-center items-center">
        <section className={`flex flex-col md:py-6 xl:py-4 ${edit ? "hidden" : ""}`}>
          <img className="desktop-navbar__actions__image h-40 w-40 rounded-full self-center" src={params.image} alt="User avatar" />
          <h2 className="px-4 mt-4 text-gray-50 text-xl font-bold text-center italic">{params.name + " " + params.lastname}</h2>
        </section>

        <section className={`flex flex-col md:py-6 xl:py-4 ${edit ? "" : "hidden"}`}>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <h2 className={`block text-sm font-rubik text-gray-50`}>Actualiza tu foto de perfil</h2>
            <section className="bg-black-600 p-4 rounded-xl">
              <input accept="image/*" id="icon-button-file" type="file" className="hidden" onChange={onImageChange} />
              <label htmlFor="icon-button-file" className="cursor-pointer flex flex-row justify-between self-center mt-4 text-gray-50 mb-4">
                Añadir una foto <AddPhotoIcon />
              </label>
              {imageURL && <img className="max-h-44 max-w-44 object-contain mb-4 image_file" src={imageURL} />}
              {!imageChange && <img className="max-h-44 max-w-44 object-contain mb-4 image_file" src={params.image} />}
            </section>
            <label htmlFor="level" className={`block text-sm font-rubik ${errors.name ? "text-orange-900" : "text-gray-50"}`}>
              Actualiza tu nombre:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre ..."
              {...register("name", {
                required: true,
                maxLength: 20,
                min: 1,
              })}
              className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                errors.name ? "text-orange-900 border-orange-900" : "text-black-700 border-violet-900"
              }`}
            />
            <label htmlFor="level" className={`block text-sm font-rubik ${errors.lastname ? "text-orange-900" : "text-gray-50"}`}>
              Actualiza tu apellido:
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Tu apellido ..."
              {...register("lastname", {
                required: true,
                maxLength: 30,
                min: 1,
              })}
              className={`block w-full bg-transparent outline-none rounded-lg border-b-2 py-2 px-4 placeholder-gray-500  ${
                errors.lastname ? "text-orange-900 border-orange-900" : "text-black-700 border-violet-900"
              }`}
            />
            <label htmlFor="level" className={`block text-sm font-rubik ${errors.level ? "text-orange-900" : "text-gray-50"}`}>
              Actualiza tu nivel:
            </label>

            <section className="my-2 flex flex-col items-center">
              <input {...register("level", { required: true })} type="radio" id="principiante" value="Principiante" />
              <label htmlFor="principiante" className="italic text-sm font-rubik text-gray-50">
                Principiante. 5 km a 10 km.
              </label>
            </section>
            <section className=" flex flex-col items-center">
              <input {...register("level", { required: true })} type="radio" id="intermedio" value="Intermedio" />
              <label htmlFor="intermedio" className="italic text-sm font-rubik text-gray-50">
                Intermedio. 10 km a 20 km.
              </label>
            </section>
            <section className="my-2 flex flex-col items-center">
              <input {...register("level", { required: true })} type="radio" id="experto" value="Experto" />
              <label htmlFor="experto" className="italic text-sm font-rubik text-gray-50">
                Experto. 20 km en adelante.
              </label>
            </section>
            <input
              type="submit"
              value="Actualizar perfil"
              className="bg-orange-900 text-center text-gray-50 font-bold italic px-8 py-4 rounded-full button__orange cursor-pointer"
            />
          </form>
        </section>
        {friend ? (
          <p></p>
        ) : userId === params.id ? (
          <button
            onClick={handleEdit}
            className={`bg-gray-900 relative text-gray-50 font-bold italic px-8 py-4 my-4 rounded-full hover:shadow-button hover:shadow-black-700 transition`}
          >
            {edit ? "Dejar de editar" : "Editar usuario"}
          </button>
        ) : (
          <button
            onClick={sendFriendRequest}
            className="bg-gray-900 relative text-gray-50 font-bold italic px-8 py-4 my-4 rounded-full hover:shadow-button hover:shadow-black-700 transition"
          >
            Añadir Amigo
          </button>
        )}

        <section className={`grid grid-cols-2 grid-rows-2 px-4 mb-4`}>
          <section className="flex flex-col items-center">
            <FriendsIcon className="scale-50" />
            <p className="text-gray-50 font-bold text-center italic">{`${params.friends} amigos`}</p>
          </section>
          <section className="flex flex-col items-center">
            <RunIcon className="scale-50" />
            <p className=" text-gray-50  font-bold text-center italic">{`${params.assisted} carrera asistida`}</p>
          </section>
          <section className="flex flex-col items-center">
            <EditRunIcon className="scale-50" />
            <p className=" text-gray-50 font-bold text-center italic">{`${params.created} carrera creada`}</p>
          </section>
          <section className="flex flex-col items-center ">
            <LevelIcon className="scale-50" />
            <p className=" text-gray-50 font-bold text-center italic">{`${params.level}`}</p>
          </section>
        </section>
      </div>
    </div>
  );
};
