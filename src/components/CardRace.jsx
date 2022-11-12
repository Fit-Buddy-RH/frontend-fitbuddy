export const CardRace = () => {
    return (
        <div className="card-race__container bg-black-600 transition rounded-xl flex flex-col" >
        <img 
            src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="" 
            className="object-cover rounded-t-xl h-3/6"
        />
            <div className="relative my-4 mx-8">
                <h2 className="py-2 lg:p-4 text-gray-50 md:text-xl lg:text-3xl font-bold italic">Host</h2>
                <section className="flex items-center">
                    <img
                            className="my-1 lg:mx-4 h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                            src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                            alt="User avatar"
                    />
                    <p className="p-4 text-gray-50 md:text-lg lg:text-2xl font-bold italic">John Doe</p>
                </section>
                <h2 className="py-2 lg:p-4 text-gray-50 md:text-xl lg:text-3xl font-bold italic">Acerca del evento</h2>
                <p className="py-1 lg:p-4 text-gray-50 md:text-lg lg:text-2xl  italic">
                    “El milagro no es que haya terminado. El milagro es que tuve el coraje de empezar.”
                    John Bingham
                </p>
            </div>
        </div>
    )
}