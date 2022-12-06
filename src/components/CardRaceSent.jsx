

export const CardRaceSent = () => {
    return (
        <div className="card-race__container bg-black-600 transition rounded-xl flex flex-row mb-8" >
        <img 
            src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="" 
            className="object-cover rounded-l-xl h-auto w-28 sm:w-32"
        />
        <div className="pl-2 flex flex-col sm:flex-row w-full">
                <div className="py-2 px-4 w-full">
                     <h2 className=" text-gray-50 text-xl font-bold italic ">Carrera de John</h2>
                    <div className="mt-4">
                        <p className="text-gray-50 md:text-lg lg:text-lg  italic">
                        Nivel principiante. Carrera de 5 km en Ciudad de México.
                        <br/>
                        Asistirán 5 personas.
                        </p>
                    </div>
                </div>
                <div className="self-center flex flex-row sm:flex-col justify-center items-center gap-3 mb-4 mt-1">
                    <button className="bg-violet-900 font-rubik text-sm text-gray-50 rounded-full px-2 py-1 sm:py-2 sm:px-4 sm:mx-4 sm:mt-4">
                        Pendiente
                    </button>
                </div>
            </div>
        </div>

    )
}