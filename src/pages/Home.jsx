import Galop from "../images/Galop sauvage.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
     <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-32 md:pt-28 text-white">

      <img
        src={Galop}
        className="absolute inset-0 w-full h-full object-cover"
      />
     
      <div className="absolute inset-0 bg-[#2f3e46]/30"></div>

   
      <div className="relative z-10 text-white">

        <h1 className="text-3xl md:text-5x1">
          Izaberu Creations
        </h1>

        <p className="opacity-80 mb-10">
          Watercolors & Handmade Jewelry
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">

         
          <Link to="/products?category=aquarelle" className="w-40 h-56 md:w-60 md:h-72 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex flex-col justify-center items-center transition hover:-translate-y-2 hover:bg-[#84a98c]/30 cursor-pointer">
             <h2 className="text-xl font-semibold">Warcolors</h2>
               <p className="text-sm opacity-80">Watercolor art</p>
          </Link>

          
          <Link to="/products?category=bijoux" className="w-40 h-56 md:w-60 md:h-72 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex flex-col justify-center items-center transition hover:-translate-y-2 hover:bg-[#52796f]/30 cursor-pointer">
            <h2 className="text-xl font-semibold">Bijoux</h2>
            <p className="text-sm opacity-80">Handmade jewelry</p>
          </Link>

        </div>

      </div>
    </div>
  );
}