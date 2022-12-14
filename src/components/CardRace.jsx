import { Link } from "react-router-dom";

export const CardRace = (params) => {
  return (
    <div className="card-race__container bg-black-600 transition rounded-xl flex flex-col">
      <img
        src={params.image}
        alt=""
        className="object-cover rounded-t-xl max-h-64"
      />
      <div className="relative my-2 mx-4">
        <h2 className="p-2 text-gray-50 text-2xl font-bold italic">
          {params.title}
        </h2>
        <Link to={`/user/${params.id}`}>
          <section className="flex items-center">
            <img
              className="my-1 lg:mx-4 h-12 w-12 rounded-full"
              src={params.avatar}
              alt="User avatar"
            />
            <p className="p-2 text-gray-50 text-lg font-bold italic">
              {params.name + " " + params.lastname}
            </p>
          </section>
        </Link>
        <h2 className="p-2 text-gray-50 text-xl font-bold italic">
          Acerca del evento
        </h2>
        <p className="p-2 text-gray-50 text-lg italic">{params.description}</p>
      </div>
    </div>
  );
};
