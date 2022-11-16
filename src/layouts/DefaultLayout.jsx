import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer";

export const DefaultLayout = (props) => {
    return (
    <div>
        <Navbar/>
          <main className="bg-black-700 p-2 sm:p-8 min-h-screen">
            <div>{props.children}</div>
          </main>
        <Footer/>
    </div>
    );
  };