
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../contex/CartContex";

function Success() {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();

    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); 


    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center px-4">
      
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Merci pour votre achat
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Vous recevrez un email de confirmation très bientôt.
      </p>

      <p className="text-sm text-gray-500">
        Redirection vers l’accueil...
      </p>

    </div>
  );
}

export default Success;