import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/createdProducts.css'
function CreateProduct() {
  
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    weight: '',
    length: '',
    height: '',
    width: '',
    category: '',
    quatity:''
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState([]);

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
      
      const { data: product } = await axiosInstance.post('/products', form);

      const productId = product.productId;

      
      const formData = new FormData();
      images.forEach(img => formData.append('images', img));

      const resp = await axiosInstance.post(`/products/${productId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage("Produit créé avec succès !");
      setForm({
        name: '',
        price: '',
        description: '',
        weight: '',
        length: '',
        height: '',
        width: '',
        category: '',
        quatity:''
      });
      setImages([]);
      setImagePreview([]);
    } catch (err) {
      console.error("Erreur lors de la création du produit :", err.response?.data || err);
  setMessage("Erreur lors de la création du produit");
    }
  };

  return (
    <div className="create-product-container">
      <h2 className="create-product-title">Créer un Produit</h2>
      
      <div className="create-product-nav-buttons">
        <Link to="/" className="create-product-nav-link">Accueil</Link>
        <Link to="/gallery" className="create-product-nav-link">Galerie</Link>
      </div>

      <form className="create-product-form" onSubmit={handleSubmit}>
        <input
          className="create-product-input"
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="create-product-input"
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

         <input
         className="create-product-input"
         type="number"
         name="quantity"
         placeholder="Quantité disponible"
         value={form.quantity}
         onChange={handleChange}
         min="0"
         required
         />


        <textarea
          className="create-product-textarea"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="create-product-input"
          type="number"
          name="weight"
          placeholder="Poids (g)"
          value={form.weight}
          onChange={handleChange}
          min="0"
        />
        <input
          className="create-product-input"
          type="number"
          name="length"
          placeholder="Longueur (cm)"
          value={form.length}
          onChange={handleChange}
          min="0"
        />
        <input
          className="create-product-input"
          type="number"
          name="height"
          placeholder="Hauteur (cm)"
          value={form.height}
          onChange={handleChange}
          min="0"
        />
        <input
          className="create-product-input"
          type="number"
          name="width"
          placeholder="Largeur (cm)"
          value={form.width}
          onChange={handleChange}
          min="0"
        />

        <select
          className="create-product-input"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Choisir une catégorie --</option>
          <option value="Bijoux">Bijoux</option>
          <option value="Aquarelle">Aquarelle</option>
        </select>

        <input
          className="create-product-file"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="create-product-image-preview">
          {imagePreview.map((src, idx) => (
            <img key={idx} src={src} alt={`Preview ${idx}`} className="create-product-image" />
          ))}
        </div>

        <button type="submit" className="create-product-button submit-button">
          Créer le produit
        </button>
      </form>

      {message && <p className="create-product-message">{message}</p>}
    </div>
  );
}

export default CreateProduct;