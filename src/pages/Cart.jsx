import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contex/CartContex';
import { useAuth } from '../contex/AuthContext';
import "../styles/cart.css"
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { fetchItemCount } = useContext(CartContext);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const getCartId = () => {
    
    return localStorage.getItem('cart_id');
  };

const updateQuantity = async (itemId, newQty) => {
   console.log("Nouvelle quantité envoyée :", newQty);
  try {
    await axiosInstance.put(`/cart/${itemId}/quantity`, { quantity: newQty });
    if (newQty < 1) {
        
        setCartItems(prev => prev.filter(item => item.cart_item_id !== itemId));
      } 
      else {
        
        setCartItems(prev =>
          prev.map(item =>
            item.cart_item_id === itemId ? { ...item, quantity: newQty } : item
          )
        );
     
        
      } fetchItemCount();
  } catch (error) {
    console.error("Erreur mise à jour quantité :", error);
    alert("Impossible de mettre à jour la quantité");
  }
};


  useEffect(() => {
    console.log("cartItems updated:", cartItems);
    async function fetchCartItems() {
      setLoading(true);
      setError(null);
      try {
        const cartId = getCartId();
        if (!cartId) {

          setCartItems([]);
          setLoading(false);
          fetchItemCount();
          return;
        }
        const response = await axiosInstance.get(`/cart/${cartId}`);
        console.log("API response:", response.data);
        setCartItems(response.data);
        fetchItemCount();
      } catch (err) {
        console.error("Erreur récupération panier:", err);
        setError("Impossible de charger le panier");
      } finally {
        setLoading(false);
      }
    }
    fetchCartItems();
  }, [fetchItemCount]);

  if (loading || authLoading) return <p>Chargement...</p>;

  const handleCheckout = () => {
  navigate('/checkout');
};
  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.unit_price) * (item.quantity || 1);
  }, 0);

  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p>{error}</p>;
  const isEmpty = cartItems.length === 0;
console.log("cartItems =", cartItems);

cartItems.forEach(item => {
  console.log(
    "product =", item.product_name,
    "quantity =", item.quantity,
    "stock =", item.stock
  );
});
 return (
  <div className="min-h-screen flex flex-col bg-[#cad2c5] px-6 pt-32 pb-24 text-[#2f3e46]">

    <div className="flex-1 max-w-5xl mx-auto w-full">

      
      <h1 className="text-3xl font-bold mb-10 text-center">
        Mon Panier
      </h1>

      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Votre panier est vide 
          </h2>
         
        </div>
      ) : (
        <>
          
          <div className="space-y-6">

            {cartItems.map(item => (
              
              <div
                key={item.cart_item_id}
                className="flex items-center gap-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm"
              >

                
                <img
                  src={item.image || "/default-product.png"}
                  className="w-24 h-24 object-cover rounded-xl"
                  alt={item.product_name}
                />

                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.product_name}
                  </h3>

                  <p className="text-[#52796f]">
                    {item.unit_price} €
                  </p>

                  <p className="text-sm text-[#2f3e46]/70">
                    Total : {(parseFloat(item.unit_price) * (item.quantity || 1)).toFixed(2)} €
                  </p>
                </div>

                
                <div className="flex items-center gap-2 bg-[#2f3e46] text-white rounded-xl px-3 py-1">

                  <button
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                    className="px-2"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                    className="px-2"
                    disabled={item.quantity >= item.stock}
                    
                  >
                    +
                  </button>

                </div>

              </div>
            ))}

          </div>

          
          <div className="mt-10 text-right">

            <h2 className="text-2xl font-bold">
              Total : {total.toFixed(2)} €
            </h2>

            <button
              onClick={handleCheckout}
              className="mt-4 bg-[#52796f] text-white px-6 py-3 rounded-xl hover:bg-[#3d5f58] transition"
            >
              Commander
            </button>

          </div>
        </>
      )}

    </div>
  </div>
);
}

export default Cart;