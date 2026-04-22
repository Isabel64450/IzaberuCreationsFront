import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from "../contex/AuthContext";



function Checkout() {
  const {fetchItemCount} = useContext(CartContext)
  
  const [cartItems, setCartItems]=useState([])
  
  const [pageLoading, setPageLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState(null);
  
   
  useEffect(() => {
    const fetchCart = async () =>{
      try{
        const cartId = localStorage.getItem("cart_id")
        if(!cartId){
            setCartItems([]);
            return;
        }
          
        const res = await axiosInstance.get(`/cart/${cartId}`)
        setCartItems(res.data)
        fetchItemCount();
      } catch(err){
        console.error(err)
        setError("Erreur récupération panier")
      }  finally {
      setPageLoading(false); 
    }
    }
      fetchCart();
      }, []);
    

    const handlePay = async () => {
    try {
      setPayLoading(true);
       setError(null);

    
    const cartId = localStorage.getItem("cart_id");

      if (!cartId || cartItems.length === 0) {
        setError("Panier vide");
        setPayLoading(false);
        return;
      }
      
    const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          index_id: cartId,
          cartItems,
        
        }
      );    
      
     if (!res.data?.url) {
      setError("Lien Stripe manquant");
      return;
    }
      
      window.location.href = res.data.url;
      
    } catch (err) {
      console.error(err);
      setError("Erreur lors du paiement");
    } finally {
      setPayLoading(false);
    }
    };
     if (pageLoading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.unit_price) * item.quantity;
  }, 0);
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
           Récapitulatif de votre commande
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
       
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.cart_item_id} className="flex justify-between">
              <span>{item.product_name} x{item.quantity}</span>
              <span>{(item.unit_price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right font-bold text-lg">
          Total : {total.toFixed(2)} €
        </div>

        <button
          onClick={handlePay}
          disabled={payLoading}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg"
        >
          {payLoading ? "Redirection..." : "Payer avec carte"}
        </button>
          
          

      </div>
    </div>
  );
      
     
}

export default Checkout;