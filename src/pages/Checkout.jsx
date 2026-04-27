import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from "../contex/AuthContext";



function Checkout() {
  const {fetchItemCount} = useContext(CartContext)
  
  const [cartItems, setCartItems]=useState([])
  const [shippingCost, setShippingCost]=useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shipping, setShipping] = useState({
  name: "",
  
  line1: "",
  line2:"",
  city: "",
  postal_code: "",
  country: "FR"
});
  
   
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
    

     useEffect(() => {
      
  const fetchShippingCost = async () => {
   
    if (!shipping.postal_code && !shipping.city) return;

    try {
      const res = await axiosInstance.get("/shipping/cost", {
        params: {
          city: shipping.city,
          postal_code: shipping.postal_code,
        },
      });
      const cost = Number(res.data.cost)

      setShippingCost(cost);
      
    } catch (err) {
      console.error(err);
      setShippingCost(8.9); 
    }
  };

  fetchShippingCost();
}, [shipping.city, shipping.postal_code]);

    const handlePay = async (e) => {
      e.preventDefault();
      
       if (payLoading) return;
       setPayLoading(true);
       setError(null);

    try {        
    
    const cartId = localStorage.getItem("cart_id");

      if (!cartId || cartItems.length === 0) {
        setError("Panier vide");
     
        return;
      }
      if (!shipping.name  || !shipping.line1) {
        setError("Veuillez remplir votre adresse");
        return;
      }
    const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          index_id: cartId,
          cartItems,
          shipping,
          shippingCost,
        
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


const subtotal = cartItems.reduce((sum, item) => {
  return sum + Number(item.unit_price) * item.quantity;
}, 0);

const total = subtotal + (shippingCost || 0);



    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout pour caluler le frais de livraisson
        </h2>

       
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form className="mt-6 space-y-3" onSubmit={handlePay}>
  
              <input
                 type="text"
                 placeholder="Nom complet"
                 value={shipping.name}
                 onChange={(e) => setShipping({...shipping, name: e.target.value})}
                 className="w-full border p-2 rounded"
                 required
              />

             
            <input
               type="text"
               placeholder="Adresse"
               value={shipping.line1}
               onChange={(e) => setShipping({...shipping, line1: e.target.value})}
               className="w-full border p-2 rounded"
               required
            />

           <input
              type="text"
              placeholder="Ville"
              value={shipping.city}
              onChange={(e) => setShipping({...shipping, city: e.target.value})}
              className="w-full border p-2 rounded"
              required
           />

           <input
             type="text"
             placeholder="Code postal"
             value={shipping.postal_code}
             onChange={(e) => setShipping({...shipping, postal_code: e.target.value})}
             className="w-full border p-2 rounded"
             required
           />

   
          <div className="space-y-2 mt-4">
            {cartItems.map((item) => (
              <div
                key={item.cart_item_id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product_name} x{item.quantity}
                </span>
                <span>
                  {(item.unit_price * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>

           <div className="mt-4 text-right space-y-1">
  <div>Sous-total : {subtotal.toFixed(2)} €</div>

  <div>
    Livraison :{" "}
    {shippingCost === null
      ? "Calcul..."
      : `${shippingCost.toFixed(2)} €`}
  </div>


          <div className="mt-4 text-right font-bold text-lg">
            Total : {total.toFixed(2)} €
          </div>
   </div>
          
          <button
            type="submit"
            disabled={payLoading}
            className="w-full mt-4 bg-black text-white py-3 rounded-lg"
          >
            {payLoading ? "Redirection..." : "Payer avec carte"}
          </button>

</form>
          

      </div>
    </div>
  );
      
     
}

export default Checkout;