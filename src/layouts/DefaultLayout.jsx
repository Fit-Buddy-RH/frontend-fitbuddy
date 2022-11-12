import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer";

export const DefaultLayout = (props) => {
    return (
    <div>
        <Navbar/>
          <main className="bg-gray-900 p-2 sm:p-8 min-h-screen">
            <div>{props.children}</div>
          </main>
        <Footer/>
    </div>
    );
  };