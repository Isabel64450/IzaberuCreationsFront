import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

   const handleStatusChange = async (id, newStatus) => {
  try {
    await axiosInstance.patch(`/orders/${id}`, {
      order_status: newStatus,
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.index_id === id
          ? { ...order, order_status: newStatus }
          : order
      )
    );
  } catch (err) {
    console.error("Erreur update status:", err);
  }
};


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
              <th className="p-2 border">Statut Command</th>
              <th className="p-2 border">Paiement Stripe</th>
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
                   <select value={order.order_status}
                           onChange={(e) => handleStatusChange(order.index_id, e.target.value)}
                           className="border rounded px-2 py-1"
                    >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                   </select>
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
      <div className="mb-4">
      <Link
         to="/admin"
         className="text-blue-600 hover:underline"
       >
              ← Retour au dashboard admin
      </Link>
</div>
    </div>
  );
}

export default AdminOrders;