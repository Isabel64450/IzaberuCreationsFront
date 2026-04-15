import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      setMessage(
        res.data.message ||
          "Un lien de réinitialisation a été envoyé à votre adresse email"
      );
    } catch (error) {
      console.error(error);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cad2c5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center text-[#2f3e46] mb-6">
          Mot de passe oublié
        </h1>

        {message && (
          <p className="text-center text-sm text-[#52796f] mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#52796f]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#52796f] text-white py-3 rounded-lg hover:bg-[#354f52] transition"
          >
            Envoyer le lien
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
  );
}