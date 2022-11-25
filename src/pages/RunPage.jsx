import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardRace } from "../components/CardRace";
import { CardRaceInfo } from "../components/CardRaceInfo";
import { CardMapShow } from "../components/CardMapShow";
import { CardComments } from "../components/CardComments";

import "./runPage.scss";

export const RunPage = () => {
  return (
    <DefaultLayout>
      <div className=" grid grid-cols-12 gap-6 md:gap-8 xl:mx-28 2xl:mx-96">
        <section className="col-span-12 md:col-span-7">
          <CardRace />
        </section>
        <section className="col-span-12 md:col-span-5">
          <section className="lg:px-4">
            <CardRaceInfo />
          </section>
        </section>
        <section className="col-span-12">
          <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
            Ubicación
          </h2>
          <CardMapShow />
        </section>
        <section className="col-span-12">
          <h2 className="mb-8 font-rubik font-bold italic text-gray-50 text-xl">
            Comentarios
          </h2>
          <CardComments />
          <CardComments />
          <CardComments />
        </section>
      </div>
    </DefaultLayout>
  );
};
