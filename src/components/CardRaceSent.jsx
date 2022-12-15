export const CardRaceSent = (props) => {
  return (
    <div className="card-race__container bg-black-600 transition rounded-xl flex flex-row mb-8">
      <img src={props.image} alt="" className="object-cover rounded-l-xl h-auto w-28 sm:w-32" />
      <div className="pl-2 flex flex-col sm:flex-row w-full">
        <div className="py-2 px-4 w-full">
          <h2 className=" text-gray-50 text-xl font-bold italic ">{props.title}</h2>
          <div className="mt-4">
            <p className="text-gray-50 md:text-lg lg:text-lg  italic">
              {props.description}
              <br />
              Asistirán {props.assistants} personas.
            </p>
          </div>
        </div>
        <div className="self-center flex flex-row sm:flex-col justify-center items-center gap-3 mb-4 mt-1">
          <button className="bg-violet-900 font-rubik text-sm text-gray-50 rounded-full px-2 py-1 sm:py-2 sm:px-4 sm:mx-4 sm:mt-4">
            {props.status}
          </button>
        </div>
      </div>
    </div>
  );
};
