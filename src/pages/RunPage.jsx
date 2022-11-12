import { DefaultLayout } from "../layouts/DefaultLayout"
import { CardRace } from "../components/CardRace"
import { CardRaceInfo } from "../components/CardRaceInfo"
import { CardMap } from "../components/CardMap"
import { CardComments } from "../components/CardComments"

export const RunPage = () => {
    return (
        <DefaultLayout>
            <div className=" grid grid-cols-12 gap-6 md:gap-8 xl:mx-28 2xl:mx-96">
                <section className="col-span-12 md:col-span-7">
                    <CardRace/>
                </section>
                <section className="col-span-12 md:col-span-5">
                    <section className="lg:px-4">
                        <CardRaceInfo/>
                    </section>
                </section>
                <section className="col-span-12">
                    <h2 className="md:text-3xl lg:text-4xl text-gray-50 font-rubik italic font-bold mb-8">Ubicación</h2>
                    <CardMap />
                </section>
                <section className="col-span-12">
                    <h2 className="md:text-3xl lg:text-4xl text-gray-50 font-rubik italic font-bold mb-8">Comentarios</h2>
                    <CardComments/>
                    <CardComments/>
                    <CardComments/>
                </section>
            </div>
        </DefaultLayout>
    )
}