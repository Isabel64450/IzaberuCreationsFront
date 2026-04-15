import { useState } from "react";
import { useNavigate } from "react-router-dom";
import abyssin from "../../images/Abyssin.png";
import axiosInstance from "../../api/axiosInstance";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    number: "",
    street: "",
    complement: "",
    city: "",
    postalCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Les mots de passe ne correspondent pas.");
    }

    try {
      await axiosInstance.post("/auth/register", form);
      alert("Compte créé verifier votre boit email pour activer votre compte !");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cad2c5] px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

       
        <div className="hidden md:flex flex-col justify-center items-center bg-[#2f3e46] p-6">
          <img
            src={abyssin}
            alt="illustration"
            className="rounded-xl object-cover w-full h-full"
          />
        </div>

       
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#2f3e46]">
            Compte client
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

           
            <div className="grid grid-cols-2 gap-3">
              <input
                name="userName"
                placeholder="Prénom"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
              <input
                name="userLastName"
                placeholder="Nom"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
            </div>

            <input
              name="userEmail"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirmation"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
            </div>

           
            <h2 className="font-semibold text-[#2f3e46] mt-4">
              Adresse
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="number"
                placeholder="Numéro"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
              <input
                name="street"
                placeholder="Rue"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
            </div>

            <input
              name="complement"
              placeholder="Complément"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="city"
                placeholder="Ville"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
              <input
                name="postalCode"
                placeholder="Code postal"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-[#2f3e46] focus:outline-none focus:ring-2 focus:ring-[#52796f] shadow-sm"
              />
            </div>

           
            <button
              type="submit"
              className="w-full bg-[#52796f] text-white py-3 rounded-lg hover:bg-[#354f52] transition"
            >
              Créer le compte
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full border border-[#52796f] text-[#52796f] py-3 rounded-lg hover:bg-[#52796f] hover:text-white transition"
            >
              Retour à l’accueil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;