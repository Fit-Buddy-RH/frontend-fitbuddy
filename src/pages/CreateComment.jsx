import {ReactComponent as StarsFullIcon} from "../assets/StarsFullIcon.svg";

export const CreateComment = () => {
    return (
    <div className="card-comment__container bg-black-600 transition rounded-xl flex flex-col my-4" >
        <div className="grid grid-cols-12">
            <section className="col-span-2 flex flex-col justify-center items-center p-4">
            <img
                    className="desktop-navbar__actions__image h-10 w-10 rounded-full"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--s6Axi-46--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/174537/25c17f15-3c29-4947-82dd-1a0b25eb6d21.png"
                    alt="User avatar"
                />
                <div>
                <h3 className="text-gray-50 text-xl font-bold italic mb-4 text-center">
                    Usuario
                </h3>
  
                </div>

            </section>
            <section className="col-span-10 bg-black-700 rounded-xl p-4 m-4">
                <section className="flex justify-between">
                    <div>
                    <input type="text" className="text-gray-50 text-xl font-bold mb-4"placeholder="Escribe un título..."/>
                    
                    </div>
                   


                    <section className="flex flex-end justify-end">
                        <StarsFullIcon className="scale-50"/>
                    </section>
                </section>
                <textarea placeholder="Coméntanos como te fue..." id="comments" name="w3review" rows="4" cols="100"  className="" label="comentanos"></textarea>
            </section>
        </div>
    </div>
)
}  