import { ReactComponent as FriendsIcon } from "../assets/FriendsIcon.svg";
import { ReactComponent as LevelIcon } from "../assets/LevelIcon.svg";
import { ReactComponent as RunIcon } from "../assets/RunIcon.svg";
import { ReactComponent as EditRunIcon } from "../assets/EditRunIcon.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const UserCard = ({setErrorState, setShowModal, ...params }) => {
  const [userId, setUserId] = useState();
  const [userFriends, setUserFriends] = useState();
  const [friend, setFriend] = useState(false);


  const urlId = useParams();

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

  return (
    <div className="card-user__container bg-violet-900 transition rounded-xl flex flex-col justify-center">
      <div className="relative my-4 overflow-clip flex flex-col justify-center items-center">
        <section className="flex flex-col md:py-6 xl:py-4">
          <img className="desktop-navbar__actions__image h-40 w-40 rounded-full self-center" src={params.image} alt="User avatar" />
          <h2 className="px-4 mt-4 text-gray-50 text-xl font-bold text-center italic">{params.fullname}</h2>
        </section>
        {userId === params.id || friend ? (
          <p></p>
        ) : (
          <button
            onClick={sendFriendRequest}
            className="bg-gray-900 relative text-gray-50 font-bold italic px-8 py-4 my-4 rounded-full hover:bg-orange-900"
          >
            Añadir Amigo
          </button>
        )}

        <section className="grid grid-cols-2 grid-rows-2 px-4 mb-4">
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
