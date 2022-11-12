import { DefaultLayout } from "../layouts/DefaultLayout"
import { CardRaces } from "../components/CardRaces"

export const MyRunsPage = () => {
    return(
        <DefaultLayout>
            <div className="grid grid-cols-12 gap-2 sm:gap-8 mx-0 xl:mx-48 2xl:mx-96">
                <section className="col-span-12 flex felx-row justify-between">
                    <h2 className="invisible sm:text-5xl sm:visible text-gray-50 font-rubik italic font-bold">Mis Carreras</h2>
                    <button className="text-xs sm:text-xl text-gray-50 bg-orange-900 font-rubik italic font-bold px-4 py-2 sm:px-8 rounded-full transition hover:shadow-sm hover:shadow-orange-900">
                        + CARRERA
                    </button>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-6">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-6">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-6">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-6 lg:col-span-3">
                    <CardRaces/>
                </section>
                <section className="col-span-6 md:col-span-12 lg:col-span-6">
                    <CardRaces/>
                </section>
            </div>
        </DefaultLayout>
    )
}