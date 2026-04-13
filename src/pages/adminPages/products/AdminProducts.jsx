import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/products?all=true");
    
    setProducts(res.data.data);
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Supprimer ce produit ?");

  if (!confirmDelete) return;

  try {
    await axiosInstance.delete(`/products/${id}`);

    fetchProducts(); 
  } catch (err) {
    console.error("DELETE ERROR ", err);
    alert("Erreur suppression produit");
  }
};

  return (
    <div className="p-6">

     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>

        <Link
          to="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Ajouter produit
        </Link>
      </div>

   
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Format</th>
              <th>Prix</th>             
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.product_id} className="text-center border-t">

                <td>
                  <img
                    src={p.images?.[0]}
                    className="w-12 h-12 object-cover mx-auto"
                  />
                </td>

                <td>{p.product_category_name}</td>
                <td>{p.art_format}</td>
                <td>{p.price} €</td>
                

                <td className="space-x-2">
                  <Link
                    to={`/admin/products/${p.product_id}`}
                    className="text-blue-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    <div className="flex justify-between items-center mb-6">  

      <Link to="/gallery" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Voir la galerie
      </Link>

    </div>
    </div>
  );
}