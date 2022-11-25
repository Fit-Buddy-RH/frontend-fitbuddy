import { DefaultLayout } from "../layouts/DefaultLayout"
import { CardRaces } from "../components/CardRaces"
import { Link } from "react-router-dom"

import "./runsPage.scss"

export const RunsPage = () => {
    return(
        <DefaultLayout>
                <div className="grid grid-cols-12 gap-4 sm:gap-8 mx-0 xl:mx-48 2xl:mx-96">
                    <section className="col-span-12 flex felx-row justify-between">
                        <h2 className="invisible sm:text-5xl sm:visible text-gray-50 font-rubik italic font-bold">Carreras</h2>
                        <Link to="/post">
                            <button className="button__orange text-xs sm:text-lg text-gray-50 bg-orange-900 font-rubik italic font-bold px-4 py-2 sm:px-8 rounded-full transition">
                                + CARRERA
                            </button>
                        </Link>
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
                    <section className="col-span-6 md:col-span-12 lg:col-span-6">
                        <CardRaces/>
                    </section>
                    <section className="col-span-6 md:col-span-6 lg:col-span-3">
                        <CardRaces/>
                    </section>
                    <section className="col-span-6 md:col-span-6 lg:col-span-3">
                        <CardRaces/>
                    </section>
                </div>
            </DefaultLayout>
    )
}