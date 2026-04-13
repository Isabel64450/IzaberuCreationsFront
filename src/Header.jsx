import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../src/contex/AuthContext";
import axiosInstance from "./api/axiosInstance";
import IconIzaberu from "../src/icons/Izaberu-logo-90x90.gif";
import HeaderCartIcon from "../src/icons/HeaderCartIcon";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, loading ,user} = useAuth();
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();
 

  const { logout } = useAuth();

  const handleLogout = async () => {
  await logout();
  navigate("/");
};
    
  

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#2f3e46]/80 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

       
        <Link to="/" className="flex items-center gap-3">
          <img src={IconIzaberu} alt="logo" className="h-12 w-12 rounded-full" />
          <span className="text-white font-semibold tracking-wide">
            Izaberu Creations
          </span>
        </Link>

        
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80 relative">

          <Link className="hover:text-[#84a98c] transition" to="/">
            Boutique
          </Link>

          <Link className="hover:text-[#84a98c] transition" to="/gallery">
            Galerie
          </Link>

          <Link className="hover:text-[#84a98c] transition" to="/artist">
            L'Artiste
          </Link>

         
          {user?.role ==="ADMIN" && (
            <div className="relative">

              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="hover:text-[#84a98c] transition"
              >
                Admin ▾
              </button>

              {adminOpen && (
                <div className="absolute right-0 top-8 bg-white text-black shadow-lg rounded-lg w-52 p-3 space-y-2 z-50">

                  <Link to="admin/products" className="block hover:text-green-600">
                     Produits
                  </Link>

                  <Link to="/admin/users" className="block hover:text-green-600">
                     Utilisateurs
                  </Link>

                  <Link to="/admin/orders" className="block hover:text-green-600">
                     Commandes
                  </Link>

                  <Link to="/admin/payments" className="block hover:text-green-600">
                     Paiements
                  </Link>

                  <Link to="/admin/shipping" className="block hover:text-green-600">
                     Livraison
                  </Link>

                  <Link to="/admin/analytics" className="block hover:text-green-600">
                     Analytics
                  </Link>

                </div>
              )}
            </div>
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