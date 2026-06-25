import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contex/CartContex';
import { useParams, Link, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import '../styles/productDetail.css'
function ProductDetail() {
  const { productId } = useParams(); 
  const location = useLocation();
  
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  
  const { fetchItemCount } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  
  const params = new URLSearchParams(location.search);

const category = params.get("category");
const format = params.get("format");
  
const normalize = (str) =>
  str?.trim().toLowerCase();

const filteredProducts = category
  ?  (products || []).filter(
      (p) =>
        normalize(p.category) === normalize(category)
    )
  :  (products || []);

const stock = Number(product?.quantity ?? 0);

const qtyInCart =
  cartItems.find(
    item => Number(item.product_id) === Number(product?.product_id)
  )?.quantity || 0;

const availableStock = stock - Number(qtyInCart);

const disponible =
  product?.disponibility === 1 &&
  availableStock > 0;

  const getOrCreateCartId = (customerId) => {
    if (customerId) {
      return `cart-${customerId}`;
    } else {
      let guestCartId = localStorage.getItem('cart_id');
      if (!guestCartId) {
        guestCartId = 'guest-' + crypto.randomUUID();
        localStorage.setItem('cart_id', guestCartId);
      }
      return guestCartId;
    }
  };
  useEffect(() => {
  async function fetchProduct() {
    try {
      setLoading(true);

      const cartId = localStorage.getItem("cart_id");

      const [productsRes, productRes, cartRes] = await Promise.all([
        axiosInstance.get("/products", {
          params: {
            category,
            format,
            all: true
          }
        }),
        axiosInstance.get(`/products/${productId}`),
        cartId
          ? axiosInstance.get(`/cart/${cartId}`)
          : Promise.resolve({ data: [] })
      ]);
          
      setProducts(productsRes.data.data);
      setProduct(productRes.data);
      setCartItems(cartRes.data);

      if (productRes.data.images?.length > 0) {
        setSelectedImage(productRes.data.images[0]);
      }

    } catch (err) {
      console.error("Erreur lors du chargement du produit :", err);
      setError("Impossible de charger le produit.");
    } finally {
      setLoading(false);
    }
  }

  fetchProduct();
}, [productId, category, format]);
const handleAddToCart= async(product)=> {
   try {
    
    const cartId = getOrCreateCartId()
    const cartItem = {
      cart_id: cartId, 
      cart_item_ref: `ref-${product.product_id}`, 
      product_id: product.product_id,
      unit_price: product.price,
    
      added_at: new Date().toDateString().slice(0,19).replace('T','')
      
    };

     await axiosInstance.post('/cart', cartItem);
     const cartRes = await axiosInstance.get(`/cart/${cartId}`);
    setCartItems(cartRes.data);
     fetchItemCount();
    alert("Produit ajouté au panier !");
    
  } catch (error) {
    console.error("Erreur lors de l’ajout au panier :", error);
    alert("Erreur : impossible d’ajouter au panier voir disponibilité.");
  }
}
const currentIndex = products.findIndex(
  (p) => String(p.product_id) === String(product?.product_id)
);

const prevProduct =
  currentIndex > 0 ? products[currentIndex - 1] : null;

const nextProduct =
  currentIndex >= 0 && currentIndex < products.length - 1
    ? products[currentIndex + 1]
    : null;

if (loading) return <p>Chargement du produit...</p>;
if (error) return <p>{error}</p>;
if (!product) return <p>Produit introuvable.</p>;



  return (
  <div className="min-h-screen bg-[#cad2c5] px-6 py-24 text-[#2f3e46]">
    <div className="relative max-w-6xl mx-auto">
  
  {prevProduct && (
    <Link
      to={`/products/${prevProduct.product_id}`}
      state={{category,format}}
      className="absolute -left-20 top-1/2 -translate-y-1/2 text-[#2f3e46] text-6xl cursor-pointer hover:scale-125 hover:text-[#52796f] transition duration-300 z-30">
      <span>‹</span>
    </Link>
  )}

 
  {nextProduct && (
    <Link
      to={`/products/${nextProduct.product_id}`}
      state={{category,format}}
      className="absolute -right-20 top-1/2 -translate-y-1/2 text-[#2f3e46] text-6xl cursor-pointer hover:scale-125 hover:text-[#52796f] transition duration-300 z-30" >
      <span>›</span>
    </Link>
  )}

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-12">

      
      <div className="space-y-4">

       
        <div className="rounded-2xl overflow-hidden bg-[#cad2c5] shadow-lg flex items-center justify-center h-[500px] relative">

             {selectedImage ? ( <>     
             <img src={selectedImage} alt="Produit" onClick={()=> setIsZoomed(true)} className="max-h-full max-w-full object-contain relative z-10 cursor-zoom-in"/>
               </>
                 ) : (
               <div className="text-[#2f3e46]"> Aucune image</div>
              )}

        </div>

       
        <div className="flex gap-3 overflow-x-auto">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition
              ${selectedImage === img ? "border-[#52796f]" : "border-transparent opacity-70 hover:opacity-100"}`}
            />
          ))}
        </div>
      </div>

      
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            {product.product_category_name}
          </h1>

          <p className="text-[#52796f] mt-1">
            {product.category}
          </p>
        </div>

        <p className="text-[#354f52] leading-relaxed">
          {product.description}
        </p>

        
       <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl space-y-3 text-sm text-[#2f3e46] shadow-sm border border-white/30">
           <p className="flex justify-between">
            <span className="font-semibold">
               {product.category === "Bijoux"
                ? "Matériaux :"
                : "Format :"}
            </span>

            <span className="bg-[#52796f] text-white px-2 py-0.5 rounded-md text-xs">
               {product.category === "Bijoux"
               ? "Perles Miyuki"
               : product.art_format || "Non défini"}
            </span>
            </p>

  
           <p className="flex justify-between">
              <span className="font-semibold">Dimensions :</span>
              <span> {product.product_length_cm} × {product.product_width_cm} × {product.product_height_cm} cm
              </span>
          </p>

  
          <p className="flex justify-between">
             <span className="font-semibold">Poids :</span>
             <span>{product.product_weight_g} g</span>
          </p>

       </div>

        
        <div className="text-2xl font-bold text-[#2f3e46]">
          {product.price} €
        </div>
         
         <div className="mt-2">
            {disponible ? (
  <span className="text-green-600">
    En stock ({availableStock})
  </span>
) : (
  <span className="text-red-600">
    Rupture de stock
  </span>
)}
         </div>






       
        <div className="flex flex-col gap-3">

          <button
            onClick={() => handleAddToCart(product)}
             disabled={!disponible}
             className={`text-white py-3 rounded-xl transition ${
             disponible
              ? "bg-[#52796f] hover:bg-[#3d5f58]"
              : "bg-gray-400 cursor-not-allowed"
            }`}
>
           {disponible
           ? "Ajouter au panier"
           : "Produit indisponible"}
          </button>

          <Link
            to="/cart"
            className="text-center border border-[#52796f] py-3 rounded-xl hover:bg-[#52796f] hover:text-white transition"
          >
            Voir le panier
          </Link>

          <Link
            to={`/products?category=${category || ""}${format ? `&format=${format}` : ""}`}
            className="text-center text-[#52796f] hover:underline"
          >
            ← Retour 
          </Link>

        </div>
      </div>

    </div>
      {isZoomed && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"  onClick={() => setIsZoomed(false)} >
           <img src={selectedImage}  alt="Zoom" className="max-w-[90%] max-h-[90%] object-contain cursor-zoom-out"/>
      </div>
)}



  </div>
   </div>
  
    
);
   
}

export default ProductDetail;