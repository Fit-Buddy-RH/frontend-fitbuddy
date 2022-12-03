import { DefaultLayout } from "../layouts/DefaultLayout";
import { CardRace } from "../components/CardRace";
import { CardRaceInfo } from "../components/CardRaceInfo";
import { CardMap } from "../components/CardMap";
import { CardComments } from "../components/CardComments";

import "./runPage.scss";

export const RunPage = () => {

  let userAccepted = false;

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
          <CardMap userAccepted={userAccepted} />
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
