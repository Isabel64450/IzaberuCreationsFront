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
    art_format:""
    
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
        length: p.product_length_cm,
        height: p.product_height_cm,
        width: p.product_width_cm,
        category: p.category,
       art_format: p.art_format || ""
      });

      setExistingImages(p.images || []);
    };

    fetchProduct();
  }, [id]);

 
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "category" && value !== "Aquarelle"
      ? { art_format: "" }
      : {})
  }));
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
    
      await axiosInstance.put(`/products/${id}`, {
      ...form,
      art_format:
      form.category === "Aquarelle"
      ? form.art_format
      : null
      });

     
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
               <div className="grid grid-cols-2 gap-4">
  <input
    name="weight"
    value={form.weight}
    onChange={handleChange}
    placeholder="Poids"
    className="border p-2 rounded"
  />

  <input
    name="length"
    value={form.length}
    onChange={handleChange}
    placeholder="Longueur"
    className="border p-2 rounded"
  />

  <input
    name="height"
    value={form.height}
    onChange={handleChange}
    placeholder="Hauteur"
    className="border p-2 rounded"
  />

  <input
    name="width"
    value={form.width}
    onChange={handleChange}
    placeholder="Largeur"
    className="border p-2 rounded"
  />
   </div>
         
  <select
  name="category"
  value={form.category}
  onChange={handleChange}
  className="w-full border p-2 rounded"
  >
  <option value="">Choisir une catégorie</option>
  <option value="Bijoux">Bijoux</option>
  <option value="Aquarelle">Aquarelle</option>
  </select>



{form.category === "Aquarelle" && (
  <select
    name="art_format"
    value={form.art_format}
    onChange={handleChange}
    className="w-full border p-2 rounded"
  >
    <option value="">Format</option>
    <option value="A5">A5</option>
    <option value="A4">A4</option>
    <option value="A3">A3</option>
    <option value="A2">A2</option>
  </select>
)}




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