import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../contex/CartContex";

function Checkout() {
  const { fetchItemCount } = useContext(CartContext);

  const [cartItems, setCartItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);
  const [error, setError] = useState(null);

  const [shipping, setShipping] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    postal_code: "",
    country: "FR",
  });

  // ================= CART =================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cart_id");

        if (!cartId) {
          setCartItems([]);
          return;
        }

        const res = await axiosInstance.get(`/cart/${cartId}`);
        setCartItems(res.data);

        fetchItemCount();
      } catch (err) {
        console.error(err);
        setError("Erreur chargement panier");
      } finally {
        setLoadingPage(false);
      }
    };

    fetchCart();
  }, []);

  // ================= SHIPPING COST =================
  useEffect(() => {
    const fetchShippingCost = async () => {
      if (!shipping.city || !shipping.postal_code) return;

      try {
        const res = await axiosInstance.get("/shipping/cost", {
          params: {
            city: shipping.city,
            postal_code: shipping.postal_code,
          },
        });

        setShippingCost(Number(res.data.cost));
      } catch (err) {
        console.error(err);
        setShippingCost(8.9);
      }
    };

    fetchShippingCost();
  }, [shipping.city, shipping.postal_code]);

  // ================= PAY =================
  const handlePay = async (e) => {
    e.preventDefault();

    if (loadingPay) return;
    setLoadingPay(true);
    setError(null);

    try {
      const cartId = localStorage.getItem("cart_id");

      // ❌ CART CHECK
      if (!cartId || cartItems.length === 0) {
        setError("Panier vide");
        setLoadingPay(false);
        return;
      }

      // ❌ SHIPPING CHECK
      if (
        !shipping.name ||
        !shipping.line1 ||
        !shipping.city ||
        !shipping.postal_code
      ) {
        setError("Veuillez remplir toute l'adresse");
        setLoadingPay(false);
        return;
      }

      // ❌ SHIPPING COST CHECK
      if (shippingCost === null) {
        setError("Frais de livraison non calculés");
        setLoadingPay(false);
        return;
      }

      // ================= 1. CREATE ORDER =================
      const orderRes = await axiosInstance.post("/orders", {
        cart_id: cartId,
        shipping,
        shippingCost,
      });

      const orderId = orderRes.data.order.index_id;

      if (!orderId) {
        setError("Erreur création commande");
        setLoadingPay(false);
        return;
      }

      // ================= 2. CREATE STRIPE SESSION =================
      const stripeRes = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          order_id: orderId,
        }
      );

      const url = stripeRes.data?.url;

      if (!url) {
        setError("Erreur Stripe");
        setLoadingPay(false);
        return;
      }

      // ================= 3. REDIRECT STRIPE =================
      window.location.href = url;
    } catch (err) {
      console.log("BACKEND ERROR:", err.response?.data);
      setError("Erreur lors du paiement");
    } finally {
      setLoadingPay(false);
    }
  };

  // ================= CALC =================
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.unit_price) * item.quantity;
  }, 0);

  const total = subtotal + (shippingCost || 0);

  // ================= LOADING =================
  if (loadingPage) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handlePay} className="space-y-3">

          <input
            type="text"
            placeholder="Nom complet"
            value={shipping.name}
            onChange={(e) =>
              setShipping({ ...shipping, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Adresse"
            value={shipping.line1}
            onChange={(e) =>
              setShipping({ ...shipping, line1: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Ville"
            value={shipping.city}
            onChange={(e) =>
              setShipping({ ...shipping, city: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Code postal"
            value={shipping.postal_code}
            onChange={(e) =>
              setShipping({ ...shipping, postal_code: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          {/* CART */}
          <div className="mt-4 space-y-2">
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

          {/* TOTAL */}
          <div className="mt-4 text-right space-y-1">
            <div>Sous-total: {subtotal.toFixed(2)} €</div>

            <div>
              Livraison:{" "}
              {shippingCost === null
                ? "Calcul..."
                : `${shippingCost.toFixed(2)} €`}
            </div>

            <div className="font-bold text-lg">
              Total: {total.toFixed(2)} €
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingPay}
            className="w-full mt-4 bg-black text-white py-3 rounded-lg"
          >
            {loadingPay ? "Redirection..." : "Payer avec Stripe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;