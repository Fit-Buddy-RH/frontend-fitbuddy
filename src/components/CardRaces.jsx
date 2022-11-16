export const CardRaces = () => {
    return(
        <div className="card-races__container bg-black-600 transition rounded-xl flex flex-col hover:scale-105 hover:shadow-lg hover:z-20" >
            <img 
                src="https://images.pexels.com/photos/2168292/pexels-photo-2168292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="" 
                className="object-cover rounded-t-xl h-3/5"
            />
            <section className="relative py-4 max-h-2/5">
                <h2 className="px-4 text-gray-50 sm:text-xl font-bold italic">John Doe</h2>
                <p className="px-4 text-gray-50 text-sm sm:text-base truncate block">“¡ No sueñes con ganar, entrena para ello!"</p>
                <img
                        className="desktop-navbar__actions__image absolute sm:-top-6 sm:right-6 right-4 -top-4 h-9 w-9 sm:h-12 sm:w-12 rounded-full"
                        src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                        alt="User avatar"
                />
            </section>
        </div>
    )
}