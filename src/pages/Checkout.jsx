import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from "../contex/AuthContext";



function Checkout() {
  const {clearCart, fetchitemCount} = useContext(CartContext)
  const { isAuthenticated, user, loading: authLoading} = useAuth();
  const [cartItems, setCartItems]=useState([])

  const [pageLoading, setPageLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm]=useState({
    name:"",
    email:"",
    address:"",
    city:"",
    postal_code:"",
    country:"FR"
  })
  

  

  useEffect(() => {
    const fetchCart = async () =>{
      try{
        const cartId = localStorage.getItem("cart_id")
        if(!cartId) return 
        const res = await axiosInstance.get(`/cart/${cartId}`)
        setCartItems(res.data)
      } catch(err){
        console.error(err)
        setError("Erreur récupération panier")
      }  finally {
      setPageLoading(false); 
    }
    }
      fetchCart();
      }, []);
     useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated && user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        postal_code: user.postal_code || "",
      }));
    }
  }, [isAuthenticated, user, authLoading]);

 
  const handlePay = async () => {
    try {
      setPayLoading(true);
       setError(null);
      const cartId = localStorage.getItem("cart_id");

      if (!cartId || cartItems.length === 0) {
        setError("Panier vide");
        return;
      }

      
      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          index_id: cartId,
          cartItems,
          shipping: form,
        }
      );
      
      console.log("Stripe URL:", res.data.url);

     if (!res.data?.url) {
      setError("Lien Stripe manquant");
      return;
    }


      
      window.location.href = res.data.url;
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du paiement");
    } finally {
      setPayLoading(false);
    }
  };
    if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
    }
  
  return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

       
        <div className="space-y-4">
          
          <input
            type="text"
            placeholder="Nom"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Adresse"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Ville"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Code postal"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={form.postal_code}
            onChange={(e) =>
              setForm({ ...form, postal_code: e.target.value })
            }
          />

        </div>

       
        <button
          onClick={handlePay}
          disabled={payLoading}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {payLoading ? "Redirection..." : "Payer"}
        </button>

      </div>
    </div>
  );
      
     
}

export default Checkout;