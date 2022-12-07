import { Link } from "react-router-dom";

export const CardRaceProfile = (params) => {
  console.log(params);
  return (
    <div>
      <Link to={`/run/${params.id}`} className="card-race-profile__container bg-black-600 transition rounded-xl flex flex-row">
        <img
          src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="object-cover rounded-l-xl w-20"
        />
        <div className="my-2 mx-4">
          <h2 className=" text-gray-50 md:text-xl lg:text-xl font-bold italic mb-4">
            {params.title}
          </h2>
          <p className="font-rubik text-gray-50 text-sm mb-2">
            {params.description}
          </p>
          <p className="font-rubik text-sm mb-2">
            Asistirán {params.quantity} personas.
          </p>
        </div>
      </Link>
    </div>
  );
};
