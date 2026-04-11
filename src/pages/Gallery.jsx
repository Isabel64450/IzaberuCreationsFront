import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-300">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#cad2c5] px-6 py-24 text-[#2f3e46]">
      
     
      <div className="w-full flex flex-col items-center text-center mb-12">
        <h2 className="text-4xl font-bold">Galerie</h2>
        <p className="text-[#2f3e46] mt-2">
          Découvrez les créations disponibles
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const id = product.id || product.product_id;
          if (!id) return null;

          return (
            <Link
              key={id}
              to={`/products/${id}`}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500 text-[#2f3e46]"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-[#2f3e46] transition">
                  {product.name}
                </h3>
                <p className="text-[#2f3e46]">{product.price} €</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;