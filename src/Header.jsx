import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/contex/AuthContext";
import IconIzaberu from "../src/icons/Izaberu-logo-90x90.gif";
import axiosInstance from "./api/axiosInstance";
import HeaderCartIcon from "../src/icons/HeaderCartIcon";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.get("/users/logout");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-80 backdrop-blur-md bg-[#2f3e46]/80 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

       
        <Link to="/" className="flex items-center gap-3">
           <img src={IconIzaberu} alt="logo" className="h-12 w-12 rounded-full" />
             <span className="text-white font-semibold tracking-wide">Izaberu Creations </span>
        </Link>

      
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">

          <Link className="hover:text-[#84a98c] transition" to="/">
            Boutique
          </Link>

          <Link className="hover:text-[#84a98c] transition" to="/gallery">
            Galerie
          </Link>
          <Link className="hover:text-[#84a98c] transition" to="/">
            L'Artiste
          </Link>

          <Link className="hover:text-[#84a98c] transition" to="/register">
            Inscription
          </Link>

          {isAuthenticated && (
            <Link className="hover:text-[#84a98c] transition" to="/add-product">
              Ajouter un produit
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-red-300 transition"
            >
              Déconnexion
            </button>
          ) : (
            <Link className="hover:text-[#84a98c] transition" to="/login">
              Connexion
            </Link>
          )}

        </nav>

       
        <div className="flex items-center gap-4">
          <HeaderCartIcon />
        </div>

      </div>
    </header>
  );
}