import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useLocation, useNavigate} from "react-router-dom";

function Gallery() {
  const [products, setProducts] = useState([]);
 
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const category = new URLSearchParams(location.search).get("category");
  const format = new URLSearchParams(location.search).get("format");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axiosInstance.get( `/products?page=${page}&limit=${limit}&category=${category || ""}&format=${format || ""}`);
        setProducts(response.data.data);
        const total = response.data.total
        setTotalPages(Math.ceil(total/limit));
      } catch (err) {
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, format, category]);


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

        <div className="w-full flex flex-col items-center text-center mb-8">
        <h2 className="text-4xl font-bold">Creations</h2>
        <p className="text-[#2f3e46] mt-2">
          Découvrez les créations disponibles
        </p>
        </div>
          {category === "aquarelle" && (
           <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["", "A5", "A4", "A3"].map((f) => (
             <button key={f} onClick={() => {setPage(1);
            

        if (f) {
                 params.set("format", f);
                 } else {
                 params.delete("format");
                }

           navigate(`/products?${params.toString()}`);
        }}
        
        className={`px-4 py-1 rounded-full border text-sm transition
          ${format === f
            ? "bg-[#2f3e46] text-white"
            : "bg-white text-[#2f3e46] hover:bg-gray-100"
          }`}
      >
        {f === "" ? "Tous" : f}
      </button>
       ))}
        </div>
       )}
    
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const id = product.id || product.product_id;
          if (!id) return null;

          return (
            <Link
              key={id}
              to={`/products/${id}`}
              state={{category, format}}
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
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40">
          ←
        </button>
             {[...Array(totalPages)].map((_, i) => (
        <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1? "bg-[#2f3e46] text-white shadow-md" : "bg-gray-100 hover:bg-gray-200"}`}>
             {i + 1}
        </button>

             ))}
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40">
         →
        </button>


      </div>

    </div>
  );
}

export default Gallery;