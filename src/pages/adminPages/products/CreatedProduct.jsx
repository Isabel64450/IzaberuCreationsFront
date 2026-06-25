
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    weight: "",
    length: "",
    height: "",
    width: "",
    category: "",
    quantity: "",
    art_format:""
  });

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    setImages(files);
    setImagePreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setMessage("Veuillez uploader au moins une image.");
      return;
    }

    try {
      const payload = {
      ...form,
       art_format:
    form.category === "Aquarelle"
      ? form.art_format
      : null,
      price: parseFloat(form.price),
      weight: parseFloat(form.weight),
      length: parseFloat(form.length),
      height: parseFloat(form.height),
      width: parseFloat(form.width),
      quantity: parseInt(form.quantity),
    };
      const { data: product } = await axiosInstance.post("/products", payload);

      const formData = new FormData();
      images.forEach(img => formData.append("images", img));

      await axiosInstance.post(`/products/${product.productId}/images`, formData);

      setMessage("Produit créé avec succès");

      setForm({
        name: "",
        price: "",
        description: "",
        weight: "",
        length: "",
        height: "",
        width: "",
        category: "",
        quantity: "",
        art_format:""
        
      });

      setImages([]);
      setImagePreview([]);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la création du produit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">

      
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Créer un produit
        </h2>

       
        <div className="flex justify-center gap-4 mb-6">
          <Link className="text-blue-600 hover:underline" to="/admin/products">All Products</Link>
          <Link className="text-blue-600 hover:underline" to="/gallery">Galerie</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Prix"
              value={form.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantité"
              value={form.quantity}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 h-24"
          />

          <div className="grid grid-cols-2 gap-4">
            <input className="border px-3 py-2 rounded-lg" type="number" name="weight" placeholder="Poids" onChange={handleChange} />
            <input className="border px-3 py-2 rounded-lg" type="number" name="length" placeholder="Longueur" onChange={handleChange} />
            <input className="border px-3 py-2 rounded-lg" type="number" name="height" placeholder="Hauteur" onChange={handleChange} />
            <input className="border px-3 py-2 rounded-lg" type="number" name="width" placeholder="Largeur" onChange={handleChange} />
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
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
                 className="w-full border rounded-lg px-4 py-2"
                 required
                >
            <option value="">Choisir un format</option>
            <option value="A5">A5</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A2">A2</option>
            </select>
           )}
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          <div className="flex gap-3 flex-wrap mt-2">
            {imagePreview.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Créer le produit
          </button>

        </form>

     
        {message && (
          <p className="text-center mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateProduct;