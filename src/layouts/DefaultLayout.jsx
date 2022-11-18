import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer";

export const DefaultLayout = (props) => {
    return (
    <div>
        <Navbar/>
          <main className="bg-black-700 px-2 sm:px-8 min-h-screen">
            <div>{props.children}</div>
          </main>
        <Footer/>
    </div>
    );
  };