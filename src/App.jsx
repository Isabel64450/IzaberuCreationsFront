import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom"

import "./styles/App.css";

function App() {
  return (
   <div className="min-h-screen flex flex-col bg-[#cad2c5]">
      <Header />

      <main className="flex-1 container mx-auto ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
