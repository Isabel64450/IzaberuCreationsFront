import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/admin/orders"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
           Commandes
        </Link>

        <Link
          to="/admin/products"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
           Produits
        </Link>

         <Link
          to="/admin/users"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
           Users
        </Link>
        
        <Link
          to="/admin/events"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
           Events
        </Link>
      </div>

    </div>
  );
}

export default AdminDashboard;