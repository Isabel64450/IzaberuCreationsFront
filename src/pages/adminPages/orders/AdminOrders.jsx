import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders");
        setOrders(res.data);
       
      } catch (err) {
        console.error("Erreur fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"> Commandes Admin</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Paiement</th>
              <th className="p-2 border">Montant</th>
              <th className="p-2 border">Ville</th>
              <th className="p-2 border">Tracking</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.index_id} className="text-center">
                <td className="p-2 border">{order.index_id}</td>
                <td className="p-2 border">{order.email}</td>

                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-white ${
                    order.order_status === "paid" ? "bg-green-500" : "bg-orange-500"
                  }`}>
                    {order.order_status}
                  </span>
                </td>

                <td className="p-2 border">{order.payment_status}</td>

                <td className="p-2 border">
                  {order.payment_value} €
                </td>

                <td className="p-2 border">
                  {order.city}
                </td>

                <td className="p-2 border">
                  {order.trackingNumber || "—"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminOrders;