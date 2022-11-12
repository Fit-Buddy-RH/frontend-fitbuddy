

export const CardRaceProfile = () => {
    return (
        <div className="card-race__container bg-black-600 transition rounded-xl flex flex-row mb-8" >
        <img 
            src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="" 
            className="object-cover rounded-l-xl h-36 w-28"
        />
            <div className="m-4">
                <h2 className=" text-gray-50 md:text-xl lg:text-xl font-bold italic mb-4">Carrera de John</h2>
                <p className="text-gray-50 md:text-lg lg:text-lg  italic">
                    Nivel principiante. Carrera de 5 km en Ciudad de México.
                    <br/>
                    Asistirán 5 personas.
                </p>
            </div>
        </div>
    )
}