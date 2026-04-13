import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    weight: "",
    length: "",
    height: "",
    width: "",
    category: "",
    
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);


  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosInstance.get(`/products/${id}`);
      const p = res.data;

      setForm({
        name: p.product_category_name,
        price: p.price,
        description: p.description,
        weight: p.product_weight_g,
        length: p.product_lenght_cm,
        height: p.product_height_cm,
        width: p.product_width_cm,
        category: p.category,
       
      });

      setExistingImages(p.images || []);
    };

    fetchProduct();
  }, [id]);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleFileChange = (e) => {
    setNewImages([...e.target.files]);
  };

 const removeImage = async (index) => {
  const imageToDelete = existingImages[index];

  try {
    await axiosInstance.delete(`/products/${id}/images`, {
      data: { imageUrl: imageToDelete }
    });

    setExistingImages(existingImages.filter((_, i) => i !== index));

  } catch (err) {
    console.error("DELETE IMAGE ERROR ", err);
    alert("Erreur suppression image");
  }
};
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      await axiosInstance.put(`/products/${id}`, form);

     
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach(img => formData.append("images", img));

        await axiosInstance.post(`/products/${id}/images`, formData);
      }

      alert("Produit modifié !");
      navigate("/admin/products");

    } catch (err) {
      console.error("UPDATE ERROR ", err.response?.data || err);
      alert("Erreur update product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

         
          <div>
            <h3 className="font-semibold mb-2">Images actuelles</h3>

            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

        
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save changes
          </button>

        </form>

          <div className="mb-4">
              <Link to="/admin/products" className="text-blue-600 hover:underline" >
          ← Retour aux produits
              </Link>
         </div>

      </div>
    </div>
  );
}

export default EditProduct;